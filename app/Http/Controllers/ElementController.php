<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AppServiceFactory;

class ElementController extends Controller
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

    public function getElementConfig()
    {
        try {
            return response()->success(config('bases.element'));
        } catch (\Exception $e) {
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function getSingle(Request $req)
    {
        try {
            $input = $req->all();
            $id = $input['id'];
            $arrElement = config('bases.element');
            $arrReturn = [];
            foreach ($arrElement as $item) {
                if ($item['id'] == $id) {
                    $arrReturn = $item;
                }
            }
            // properties
            if ($arrReturn) {
                $properties = explode(',', $arrReturn['properties']);
                $arrProperties = config('bases.properties');
                $arrP = [];
                foreach ($properties as $item) {
                    $arrP[$item] = $arrProperties[$item];
                    if (($arrProperties[$item]['type'] == 'select') || ($arrProperties[$item]['type'] == 'mcheck')) {
                        $arrP[$item]['data'] = AppServiceFactory::mListsService()->ListGet($item);
                    } else {
                        $arrP[$item]['data'] = [];
                    }

                }
                $arrReturn['properties'] = $arrP;
            }
            return response()->success($arrReturn);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }
}
