<?php
namespace App\Services\Impl;

use App\Entities\Lists;
use App\Services\Intf\IListService;
use Illuminate\Support\Facades\DB;

class ListsService extends CommonService implements IListService {
	protected function getDefaultModel() {
		return Lists::getTableName();
	}

	protected function getDefaultClass() {
		return Lists::class;
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
	public function getAll() {
		$query = Lists::whereRaw("1 = 1");
		$rResult = $query->get()->toArray();
		//dd($rResult);
		return $rResult;
	}
}
