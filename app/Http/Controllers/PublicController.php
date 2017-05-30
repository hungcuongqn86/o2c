<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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
}
