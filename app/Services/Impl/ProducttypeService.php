<?php

namespace App\Services\Impl;

use App\Entities\Producttypes;
use App\Entities\ElementProperties;
use App\Services\Intf\IProducttypeService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ProducttypeService extends CommonService implements IProducttypeService
{
    protected function getDefaultModel()
    {
        return Producttypes::getTableName();
    }

    protected function getDefaultClass()
    {
        return Producttypes::class;
    }

    /**
     * Description get all local
     *
     * @author cuongnh
     *
     * @param array $request get all value from request
     *
     * @return array local
     *
     * @throw
     */
    public function ProducttypeGetAll($filter)
    {
        $query = Producttypes::whereRaw("1 = 1");
        $sSearchInput = isset($filter['searchInput']) ? trim($filter['searchInput']) : '';
        $sSortCol = isset($filter['sSortCol']) ? $filter['sSortCol'] : 'id';
        $sSortDir = isset($filter['sSortDir']) ? $filter['sSortDir'] : 'asc';

        $limit = isset($filter['limit']) ? $filter['limit'] : config('const.LIMIT_PER_PAGE');
        if ($sSearchInput != '') {
            $query->where('name', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('code', 'LIKE', '%' . $sSearchInput . '%');
        }

        if ($sSortCol) {
            $query->orderBy($sSortCol, $sSortDir);
        }

        $rResult = $query->paginate($limit)->toArray();
        return $rResult;
    }

    public function getSingle($input)
    {
        $id = $input['id'];
        $query = Producttypes::where('id', '=', $id);
        $return = $query->first()->toArray();
        if ($return['image']) {
            $arrFileName = explode('-', $return['image']);
            if (sizeof($arrFileName) > 1) {
                array_shift($arrFileName);
            }
            $return['FILE_VIEW'] = implode('-', $arrFileName);
            $return['FILE_ENCODE'] = base64_encode(urlencode($return['image']));
            $return['upload'] = 0;
            $return['image'] = '';
        } else {
            $return['FILE_VIEW'] = '';
            $return['FILE_ENCODE'] = '';
            $return['upload'] = 0;
            $return['image'] = '';
        }
        return $return;
    }

    public function getSingleByCode($input)
    {
        $code = $input['code'];
        $query = Producttypes::where('code', '=', $code);
        $return = $query->first()->toArray();
        $arrElementData = [];
        if ($return['element_config'] != '') {
            $arrElement = explode(',', $return['element_config']);
            foreach ($arrElement as $elementid) {
                $arrElementData[] = self::getSingleElement($elementid);
            }
            $return['element_config'] = $arrElementData;
        }
        return $return;
    }

    public function getSingleElement($id)
    {
        foreach (config('bases.element') as $element) {
            if ($element['id'] === $id) {
                if ($element['properties'] != '') {
                    $arrProperties = explode(',', $element['properties']);
                    $arrPropertiesData = [];
                    foreach ($arrProperties as $propertiesid) {
                        $arrPropertiesData[] = self::getSingleProperties($propertiesid, $id);
                    }
                    $element['properties'] = $arrPropertiesData;
                }
                return $element;
            }
        }
        return [];
    }

    private function getSingleProperties($tag, $element)
    {
        $arrProperties = config('bases.properties.' . $tag);
        if (($arrProperties['type'] == 'select') || ($arrProperties['type'] == 'mcheck')) {
            if ($arrProperties['datatype'] === 'list') {
                $arrProperties['data'] = ElementProperties::where('element_code', '=', $element)->where('properties_code', '=', $tag)->get()->toArray();
            }
            if ($arrProperties['datatype'] === 'function') {
                $arrProperties['data'] = ElementProperties::where('element_code', '=', $element)->where('properties_code', '=', $tag)->get()->toArray();
                $arrDetail = config('data.' . $tag);
                foreach ($arrProperties['data'] as $key => $item) {
                    foreach ($arrDetail as $detail) {
                        if ($item['list_code'] === $detail['code']) {
                            $arrProperties['data'][$key]['detail'] = $detail;
                            break;
                        }
                    }
                }
            }
        }
        return $arrProperties;
    }

    public function saveRecord($input)
    {
        if ($input['upload']) {
            if ($input['image']) {
                if (Storage::disk('local')->has(config('const.UPLOAD_DIR') . $input['image'])) {
                    if (Storage::disk('local')->copy(config('const.UPLOAD_DIR') . $input['image'], config('const.PRODUCT_PIC_DIR') . $input['image'])) {
                        $input['image'] = config('const.PRODUCT_PIC_DIR') . $input['image'];
                        Storage::disk('local')->delete(config('const.UPLOAD_DIR') . $input['image']);
                    } else {
                        return response()->error(trans('messages.MSG_FILE_UPLOAD'), 200);
                    }
                }
            }
        } else {
            unset($input['image']);
        }

        if (isset($input['id']) && $input['id'] > 0) {
            $id = $input['id'];
            DB::beginTransaction();
            try {
                $record = Producttypes::find($id);
                $record->update($input);
                DB::commit();
                return $record;
            } catch (QueryException $e) {
                DB::rollBack();
                throw $e;
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } else {
            $record = new Producttypes($input);
            DB::beginTransaction();
            try {
                $record->save();
                DB::commit();
                return $record;
            } catch (QueryException $e) {
                DB::rollBack();
                throw $e;
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
    }

    public function delete($ids)
    {
        DB::beginTransaction();
        $arrId = explode(',', $ids);
        try {
            Producttypes::destroy($arrId);
            DB::commit();
            return array($ids);
        } catch (QueryException $e) {
            DB::rollBack();
            throw $e;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
