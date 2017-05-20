<?php
namespace App\Services\Impl;

use App\Entities\Producttypes;
use App\Services\Intf\IProducttypeService;
use Illuminate\Support\Facades\DB;

class ProducttypeService extends CommonService implements IProducttypeService {
	protected function getDefaultModel() {
		return Producttypes::getTableName();
	}

	protected function getDefaultClass() {
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
	public function ProducttypeGetAll($filter) {
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

    public function getSingle($input){
        $id = $input['id'];
        $query = Producttypes::where('id', '=', $id);
        $return = $query->first()->toArray();
        if(isset($return['signdate'])&&($return['signdate']!='')){
            $return['signdate'] = _YYyymmddToddmmyyyy($return['signdate']);
        }
        if(isset($return['durationdate'])&&($return['durationdate']!='')){
            $return['durationdate'] = _YYyymmddToddmmyyyy($return['durationdate']);
        }
        return $return;
    }

    public function saveRecord($input){
        if(isset($input['signdate'])&&($input['signdate']!='')){
            $input['signdate'] = _ddmmyyyyToYYyymmdd($input['signdate']);
        }else{
            unset($input['signdate']);
        }

        if(isset($input['durationdate'])&&($input['durationdate']!='')){
            $input['durationdate'] = _ddmmyyyyToYYyymmdd($input['durationdate']);
        }else{
            unset($input['durationdate']);
        }

        if(isset($input['id'])&&$input['id']>0){
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
        }else{
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

    public function delete($ids) {
        DB::beginTransaction();
        $arrId = explode(',',$ids);
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
