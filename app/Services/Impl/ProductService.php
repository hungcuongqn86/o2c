<?php

namespace App\Services\Impl;

use App\Entities\Products;
use App\Services\Intf\IProductService;
use Illuminate\Support\Facades\DB;

class ProductService extends CommonService implements IProductService
{
    protected function getDefaultModel()
    {
        return Products::getTableName();
    }

    protected function getDefaultClass()
    {
        return Products::class;
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
    public function ProductGetAll($filter)
    {
        $query = Products::with('Producttypes')->whereRaw("1 = 1");
        $iContract_id = isset($filter['contract_id']) ? $filter['contract_id'] : 0;
        $sSortCol = isset($filter['sSortCol']) ? $filter['sSortCol'] : 'id';
        $sSortDir = isset($filter['sSortDir']) ? $filter['sSortDir'] : 'asc';
        if ($iContract_id) {
            $query->where('contract_id', '=', $iContract_id);
        }
        if ($sSortCol) {
            $query->orderBy($sSortCol, $sSortDir);
        }

        $rResult = $query->get()->toArray();
        return $rResult;
    }

    public function getSingle($input)
    {
        $id = $input['id'];
        $query = Products::where('id', '=', $id);
        $return = $query->first()->toArray();
        if (isset($return['signdate']) && ($return['signdate'] != '')) {
            $return['signdate'] = _YYyymmddToddmmyyyy($return['signdate']);
        }
        if (isset($return['durationdate']) && ($return['durationdate'] != '')) {
            $return['durationdate'] = _YYyymmddToddmmyyyy($return['durationdate']);
        }
        return $return;
    }

    public function saveRecord($input)
    {
        if (isset($input['elements']) && sizeof($input['elements'])) {
            $input['elements'] = json_encode($input['elements']);
        }
        if (isset($input['id']) && $input['id'] > 0) {
            $id = $input['id'];
            DB::beginTransaction();
            try {
                $record = Products::find($id);
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
            $record = new Products($input);
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
            Products::destroy($arrId);
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
