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
}
