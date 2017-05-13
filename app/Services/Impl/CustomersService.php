<?php
namespace App\Services\Impl;

use App\Entities\Customers;
use App\Services\Intf\ICustomerService;
use Illuminate\Support\Facades\DB;

class CustomersService extends CommonService implements ICustomerService {
	protected function getDefaultModel() {
		return Customers::getTableName();
	}

	protected function getDefaultClass() {
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
	public function CustomersGetAll($filter) {
		$query = Customers::whereRaw("1 = 1");
        $rResult = $query->get()->toArray();
		return $rResult;
	}
}
