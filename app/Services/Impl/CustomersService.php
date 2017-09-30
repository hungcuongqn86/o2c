<?php

namespace App\Services\Impl;

use App\Entities\Customers;
use App\Services\Intf\ICustomerService;
use Illuminate\Support\Facades\DB;

class CustomersService extends CommonService implements ICustomerService
{
    protected function getDefaultModel()
    {
        return Customers::getTableName();
    }

    protected function getDefaultClass()
    {
        return Customers::class;
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
    public function CustomersGetAll($filter)
    {
        $query = Customers::whereRaw("1 = 1");
        $sSearchInput = isset($filter['searchInput']) ? trim($filter['searchInput']) : '';
        $sSortCol = isset($filter['sSortCol']) ? $filter['sSortCol'] : 'code';
        $sSortDir = isset($filter['sSortDir']) ? $filter['sSortDir'] : 'desc';
        $limit = isset($filter['limit']) ? $filter['limit'] : config('const.LIMIT_PER_PAGE');
        if ($sSearchInput != '') {
            $query->where('code', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('name', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('phone_number1', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('phone_number2', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('email', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('address', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('note', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('company_code', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('company_phone_number', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('company_name', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('company_email', 'LIKE', '%' . $sSearchInput . '%');
            $query->orWhere('company_website', 'LIKE', '%' . $sSearchInput . '%');
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
        $query = Customers::where('id', '=', $id);
        $return = $query->first()->toArray();
        if (isset($return['birthday']) && ($return['birthday'] != '')) {
            $return['birthday'] = _YYyymmddToddmmyyyy($return['birthday']);
        }
        return $return;
    }

    public function saveRecord($input)
    {
        if (isset($input['birthday']) && ($input['birthday'] != '')) {
            $input['birthday'] = _ddmmyyyyToYYyymmdd($input['birthday']);
        } else {
            unset($input['birthday']);
        }

        if (isset($input['id']) && $input['id'] > 0) {
            $id = $input['id'];
            DB::beginTransaction();
            try {
                $record = Customers::find($id);
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
            $record = new Customers($input);
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
            Customers::destroy($arrId);
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
