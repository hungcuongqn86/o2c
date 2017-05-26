<?php

namespace App\Services\Impl;

use App\Entities\Contracts;
use App\Services\Intf\IContractsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ContractService extends CommonService implements IContractsService
{
    protected function getDefaultModel()
    {
        return Contracts::getTableName();
    }

    protected function getDefaultClass()
    {
        return Contracts::class;
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
    public function ContractsGetAll($filter)
    {
        $query = Contracts::with('Customers')->whereRaw("1 = 1");
        $sSearchInput = isset($filter['searchInput']) ? trim($filter['searchInput']) : '';
        $sSortCol = isset($filter['sSortCol']) ? $filter['sSortCol'] : 'code';
        $sSortDir = isset($filter['sSortDir']) ? $filter['sSortDir'] : 'desc';

        $limit = isset($filter['limit']) ? $filter['limit'] : config('const.LIMIT_PER_PAGE');
        if ($sSearchInput != '') {
            $query->where('content', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('code', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('value', 'LIKE', '%' . $sSearchInput . '%');
        }

        if ($sSortCol) {
            $query->orderBy($sSortCol, $sSortDir);
        }

        $rResult = $query->paginate($limit)->toArray();
        $arrData = $rResult['data'];
        foreach ($arrData as $key => $value) {
            $signdate = date('d/m/Y', strtotime($value['signdate']));
            $arrData[$key]['signdate'] = $signdate;
        }
        $rResult['data'] = $arrData;
        return $rResult;
    }

    public function getSingle($input)
    {
        $id = $input['id'];
        $query = Contracts::where('id', '=', $id);
        $return = $query->first()->toArray();
        if (isset($return['signdate']) && ($return['signdate'] != '')) {
            $return['signdate'] = _YYyymmddToddmmyyyy($return['signdate']);
        }
        if (isset($return['durationdate']) && ($return['durationdate'] != '')) {
            $return['durationdate'] = _YYyymmddToddmmyyyy($return['durationdate']);
        }
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

    public function saveRecord($input)
    {
        if (isset($input['signdate']) && ($input['signdate'] != '')) {
            $input['signdate'] = _ddmmyyyyToYYyymmdd($input['signdate']);
        } else {
            unset($input['signdate']);
        }

        if (isset($input['durationdate']) && ($input['durationdate'] != '')) {
            $input['durationdate'] = _ddmmyyyyToYYyymmdd($input['durationdate']);
        } else {
            unset($input['durationdate']);
        }

        if ($input['upload']) {
            if ($input['image']) {
                if (Storage::disk('local')->has(config('const.UPLOAD_DIR') . $input['image'])) {
                    if (Storage::disk('local')->copy(config('const.UPLOAD_DIR') . $input['image'], config('const.CONTRACT_DIR') . $input['image'])) {
                        $input['image'] = config('const.CONTRACT_DIR') . $input['image'];
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
                $record = Contracts::find($id);
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
            $record = new Contracts($input);
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
            Contracts::destroy($arrId);
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
