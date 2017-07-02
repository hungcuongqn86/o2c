<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Excel;

class PublicController extends Controller
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

    public function getMenu()
    {
        try {
            return response()->success(config('const.ARRAY_MENU'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getRoles()
    {
        try {
            return response()->success(config('const.ROLE'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getListType()
    {
        try {
            return response()->success(config('bases.ARRAY_LISTTYPE'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getDepreciationR()
    {
        try {
            return response()->success(config('data.dm_bu_hao'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getDepreciationC()
    {
        try {
            return response()->success(config('data.dm_bu_hao_in_cuon'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getDepreciationB()
    {
        try {
            return response()->success(config('data.dm_bu_hao_bia'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getConstTime()
    {
        try {
            return response()->success(config('data.hs_thoi_gian_in'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function upload(Request $request)
    {
        try {
            $file = $request->file('file');
            $filename = $file->getClientOriginalName();
            $arrFilename = explode(' ', $filename);
            $filename = date('YmdHis');
            $filenameview = '';
            foreach ($arrFilename as $name) {
                $filenameview .= trim($name);
            }
            if ($filenameview) {
                $filename .= '-' . $filenameview;
            }

            $isUpload = Storage::disk('local')->put(config('const.UPLOAD_DIR') . $filename, File::get($file));
            if ($isUpload) {
                return response()->success([
                    'PATH' => $filename,
                    'FILE_VIEW' => $filenameview,
                    'FILE_ENCODE' => base64_encode(urlencode(config('const.UPLOAD_DIR') . $filename)),
                ]);
            }
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function download($file)
    {
        $filename = urldecode(base64_decode($file));
        if (file_exists(storage_path('app/' . $filename))) {
            return response()->download(storage_path('app/' . $filename));
        } else {
            return response()->error(['ERRORS_MS.MSG_DOWNLOAD_FILE_ERROR'], 200);
        }
    }

    public function excel()
    {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        $data = array(
            array('data1', 'data2'),
            array('data3', 'data4')
        );
        Excel::load('file.xlsx', function ($reader) {
        })->download('xlsx');
        /*Excel::create('New file', function ($excel) use ($data) {
            $excel->sheet('New sheet', function ($sheet) use ($data) {
//                dd($data);
                $sheet->rows(array(
                    array('test1', 'test2'),
                    array('test3', 'test4')
                ));
                $sheet->cell('A1', function($cell) {

                    // manipulate the cell
                    $cell->setValue('data1');

                });
                // $sheet->loadView('excel.test');

            });

        })->download('xlsx');*/
    }
}
