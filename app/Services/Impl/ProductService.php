<?php
namespace App\Services\Impl;

use App\Entities\Products;
use App\Services\Intf\IProductService;
use Illuminate\Support\Facades\DB;

class ProductService extends CommonService implements IProductService {
	protected function getDefaultModel() {
		return Products::getTableName();
	}

	protected function getDefaultClass() {
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
	public function ProductGetAll($filter) {
		$query = Products::whereRaw("1 = 1");
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
        $query = Products::where('id', '=', $id);
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
        if(isset($input['id'])&&$input['id']>0){
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
        }else{
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

    public function delete($ids) {
        DB::beginTransaction();
        $arrId = explode(',',$ids);
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
