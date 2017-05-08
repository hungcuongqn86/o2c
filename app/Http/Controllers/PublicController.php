<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
