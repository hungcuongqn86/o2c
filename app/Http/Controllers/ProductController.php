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
        $data = json_decode($input['data']);
        $id = $input['product'];
        $product = AppServiceFactory::mProductService()->getSingle(['id' => $id]);
        // dd($product);
        $count = $product['count'];
        $tempPath = storage_path('app/template/command.xlsx');
        Excel::load($tempPath, function ($reader) use ($data, $count) {
            $reader->sheet('Lenhsx', function ($sheet) use ($data, $count) {
                $baserow = 6;
                foreach ($data as $key => $row) {
                    $item = [$key + 1, $row->name, $row->so_trang, $row->kho_tp, $row->so_bat, $row->so_tay, $row->cach_in, $row->kho_in, $row->mau_in, '', $row->may_in, $row->sl_kem];
                    $sheet->prependRow($baserow, $item);
                }
                $strmerg = 'M' . $baserow . ':M' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);

                $baserow = $baserow + sizeof($data) + 2;
                foreach ($data as $key => $row) {
                    $item = [$key + 1, $row->name, $row->so_trang, $row->loai_giay, '', $row->sl_giay_xuat, $row->sl_giay_xuat_kg, $row->cach_cat, $row->kho_in, $row->bu_hao, $row->tong_to_chua_bu_hao, $row->tong_to_da_bu_hao];
                    $sheet->prependRow($baserow, $item);
                }
                $strmerg = 'M' . $baserow . ':M' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);

                $baserow = $baserow + sizeof($data) + 2;
                foreach ($data as $key => $row) {
                    $item = [$key + 1, $row->name, $row->so_trang, $row->loai_giay, $row->kho_in, $row->sl_giay_xuat_kg, $row->so_bat, $row->so_tay, $row->mau_in, $row->may_in, $row->sl_kem, $row->so_luot_in];
                    $sheet->prependRow($baserow, $item);
                }
                $strmerg = 'M' . $baserow . ':M' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);

                $baserow = $baserow + sizeof($data) + 2;
                foreach ($data as $key => $row) {
                    $item = [$key + 1, $row->name, $row->so_trang, $row->so_tay, $row->so_vach];
                    $sheet->prependRow($baserow, $item);
                }
                // dd($baserow);
                $strmerg = 'F' . $baserow . ':G' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);
                $strmerg = 'H' . $baserow . ':I' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);
                $strmerg = 'J' . $baserow . ':J' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);
                $strmerg = 'K' . $baserow . ':K' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);
                $sheet->cell('K' . $baserow, function ($cell) use ($count) {
                    // manipulate the cell
                    $cell->setValue($count);
                });

                $strmerg = 'L' . $baserow . ':L' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);
                $strmerg = 'M' . $baserow . ':M' . ($baserow + sizeof($data) - 1);
                $sheet->mergeCells($strmerg);
            });
        })->download('xlsx');
    }
}
