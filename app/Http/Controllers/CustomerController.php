<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AppServiceFactory;

class CustomerController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function getAll(Request $req)
    {
        $input = $req->all();
        try {
            return response()->success(AppServiceFactory::mCustomerService()->CustomersGetAll($input));
        } catch (\PDOException $e) {
            //throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            //throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getSingle(Request $req){
        $input = $req->all();
        try {
            return response()->success(AppServiceFactory::mCustomerService()->getSingle($input));
        } catch (\PDOException $e) {
            //throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            //throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function saveRecord(Request $request) {
        $input = $request->all();
        try {
            return response()->success(AppServiceFactory::mCustomerService()->saveRecord($input));
        } catch (\PDOException $e) {
            DB::rollBack();
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function delete($ids) {
        try {
            return response()->success(AppServiceFactory::mCustomerService()->delete($ids));
        } catch (\PDOException $e) {
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }
}
