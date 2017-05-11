<?php
namespace App\Services\Impl;

use App\Entities\Users;
use App\Services\Intf\IUsersService;
use Illuminate\Support\Facades\DB;

class UsersService extends CommonService implements IUsersService {
	protected function getDefaultModel() {
		return Users::getTableName();
	}

	protected function getDefaultClass() {
		return Users::class;
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
	public function UsersGetAll($filter) {
		$query = Users::whereRaw("1 = 1");
        $sDepartmentCode = isset($filter['department_s']) ? trim($filter['department_s']) : '';
        $limit = isset($filter['limit']) ? $filter['limit'] : config('const.LIMIT_PER_PAGE');
        if ($sDepartmentCode != '') {
            $query->where('department_code', '=', $sDepartmentCode);
        }
        $rResult = $query->paginate($limit)->toArray();
		return $rResult;
	}
}
