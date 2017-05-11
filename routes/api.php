<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/menu', 'PublicController@getMenu');
Route::get('/roles', 'PublicController@getRoles');
Route::get('/listtype', 'PublicController@getListType');

Route::group(['prefix' => 'list'], function () {
    Route::get('/getAll', 'ListController@getAll');
    Route::get('/getSingle', 'ListController@getSingle');
    Route::post('/saveList', 'ListController@saveList');
    Route::delete('/delete/{id}', 'ListController@delete');
});
