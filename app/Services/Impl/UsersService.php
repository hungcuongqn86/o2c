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

    public function getSingle($input){
        $id = $input['id'];
        $query = Users::where('id', '=', $id);
        $user = $query->first();
        $user['password'] = '';
        return $user;
    }

    public function saveRecord($input){
        //Hash code pass
        if(isset($input['password'])&&($input['password']!='')){
            $input['password'] = bcrypt($input['password']);
        }else{
            unset($input['password']);
        }

        if(isset($input['id'])&&$input['id']>0){
            $id = $input['id'];
            DB::beginTransaction();
            try {
                $User = Users::find($id);
                $User->update($input);
                DB::commit();
                return $User;
            } catch (QueryException $e) {
                DB::rollBack();
                throw $e;
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }else{
            $User = new Users($input);
            DB::beginTransaction();
            try {
                $User->save();
                DB::commit();
                return $User;
            } catch (QueryException $e) {
                DB::rollBack();
                throw $e;
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
    }

    public function delete($id) {
        DB::beginTransaction();
        try {
            $user = Users::find($id);
            $user->delete();
            DB::commit();
            return array($id);
        } catch (QueryException $e) {
            DB::rollBack();
            throw $e;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
