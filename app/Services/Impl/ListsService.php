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
	public function ListGetAll($filter) {
		$query = Lists::whereRaw("1 = 1");
        $sListtypeCode = isset($filter['listtype_s']) ? trim($filter['listtype_s']) : '';
        $limit = isset($filter['limit']) ? $filter['limit'] : config('const.LIMIT_PER_PAGE');
        if ($sListtypeCode != '') {
            $query->where('listtype_code', '=', $sListtypeCode);
        }
        $rResult = $query->paginate($limit)->toArray();
		return $rResult;
	}

	public function getSingle($input){
        $id = $input['id'];
        $query = Lists::where('id', '=', $id);
        return $query->first();
    }

	public function savelist($input){
	    if(isset($input['id'])&&$input['id']>0){
            $id = $input['id'];
            DB::beginTransaction();
            try {
                $list = Lists::find($id);
                $list->update($input);
                DB::commit();
                return $list;
            } catch (QueryException $e) {
                DB::rollBack();
                throw $e;
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }else{
            $list = new Lists($input);
            DB::beginTransaction();
            try {
                $list->save();
                DB::commit();
                return $list;
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
            $list = Lists::find($id);
            $list->delete();
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
