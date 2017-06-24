<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AppServiceFactory;
use App\Entities\ElementProperties;

//use Illuminate\Support\Facades\DB;

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
                    if (($arrProperties[$item]['type'] == 'select') || ($arrProperties[$item]['type'] == 'mcheck')) {
                        $arrProperties[$item]['id'] = $item;
                        if ($arrProperties[$item]['datatype'] === 'list') {
                            $arrProperties[$item]['data'] = AppServiceFactory::mListsService()->ListGet($item);
                        }
                        if ($arrProperties[$item]['datatype'] === 'function') {
                            $arrProperties[$item]['data'] = config('data.' . $item);
                        }
                        $arrP[] = $arrProperties[$item];
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

    public function getSingleElement(Request $req)
    {
        $input = $req->all();
        try {
            return response()->success(AppServiceFactory::mProducttypeService()->getSingleElement($input['id']));
        } catch (\PDOException $e) {
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }

    public function saveRecord(Request $request)
    {
        $input = $request->all();
        $id = $input['id'];
        $data = json_decode($input['data'], true);
        try {
            //Delete exit
            ElementProperties::where('element_code', '=', $id)->delete();
            foreach ($data as $datum) {
                $arrinput = explode('#', $datum);
                $arrinsert = array(
                    'element_code' => $id,
                    'properties_code' => $arrinput[0],
                    'list_code' => $arrinput[1]
                );
                $db = new ElementProperties($arrinsert);
                $db->save();
            }
            return response()->success([1]);
        } catch (\PDOException $e) {
            throw $e;
            return response()->error(trans('messages.MSG_PDO_Error'), 400);
        } catch (\Exception $e) {
            throw $e;
            return response()->error(trans('messages.MSG_Error'), 400);
        }
    }
}
