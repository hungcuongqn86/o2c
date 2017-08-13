<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AppServiceFactory;
use Excel;

class ProductController extends Controller
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
            return response()->success(AppServiceFactory::mProductService()->ProductGetAll($input));
        } catch (\PDOException $e) {
            //throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            //throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getSingle(Request $req)
    {
        $input = $req->all();
        try {
            return response()->success(AppServiceFactory::mProductService()->getSingle($input));
        } catch (\PDOException $e) {
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function boxGetAll()
    {
        try {
            return response()->success(config('data.thung_hop'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function saveRecord(Request $request)
    {
        $input = $request->all();
        try {
            return response()->success(AppServiceFactory::mProductService()->saveRecord($input));
        } catch (\PDOException $e) {
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function delete($ids)
    {
        try {
            return response()->success(AppServiceFactory::mProductService()->delete($ids));
        } catch (\PDOException $e) {
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function exportExcel(Request $request)
    {
        $input = $request->all();
        $data = $input['data'];
        dd(json_decode($data));
        $tempPath = storage_path('app/template/command.xlsx');
        Excel::load($tempPath, function ($reader) {

        })->download('xlsx');
    }
}
