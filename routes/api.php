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
Route::get('/depreciationr', 'PublicController@getDepreciationR');
Route::get('/depreciationc', 'PublicController@getDepreciationC');
Route::post('/upload', 'PublicController@upload');

Route::group(['prefix' => 'list'], function () {
    Route::get('/getAll', 'ListController@getAll');
    Route::get('/getSingle', 'ListController@getSingle');
    Route::post('/saveList', 'ListController@saveList');
    Route::delete('/delete/{id}', 'ListController@delete');
});

Route::group(['prefix' => 'user'], function () {
    Route::get('/getAll', 'UserController@getAll');
    Route::get('/getSingle', 'UserController@getSingle');
    Route::post('/saveRecord', 'UserController@saveRecord');
    Route::delete('/delete/{id}', 'UserController@delete');
});

Route::group(['prefix' => 'producttype'], function () {
    Route::get('/getElement', 'ProducttypeController@getElement');
    Route::get('/getAll', 'ProducttypeController@getAll');
    Route::get('/getSingle', 'ProducttypeController@getSingle');
    Route::get('/getSingleByCode', 'ProducttypeController@getSingleByCode');
    Route::post('/saveRecord', 'ProducttypeController@saveRecord');
    Route::delete('/delete/{ids}', 'ProducttypeController@delete');
});

Route::group(['prefix' => 'element'], function () {
    Route::get('/config', 'ElementController@getElementConfig');
    Route::get('/getSingle', 'ElementController@getSingle');
    Route::get('/getSingleElement', 'ElementController@getSingleElement');
    Route::post('/saveRecord', 'ElementController@saveRecord');
});

Route::group(['prefix' => 'contract'], function () {
    Route::get('/getAll', 'ContractController@getAll');
    Route::get('/getSingle', 'ContractController@getSingle');
    Route::post('/saveRecord', 'ContractController@saveRecord');
    Route::delete('/delete/{ids}', 'ContractController@delete');
});

Route::group(['prefix' => 'product'], function () {
    Route::get('/getAll', 'ProductController@getAll');
    Route::get('/getSingle', 'ProductController@getSingle');
    Route::post('/saveRecord', 'ProductController@saveRecord');
    Route::delete('/delete/{ids}', 'ProductController@delete');
});

Route::group(['prefix' => 'customer'], function () {
    Route::get('/getAll', 'CustomerController@getAll');
    Route::get('/getSingle', 'CustomerController@getSingle');
    Route::post('/saveRecord', 'CustomerController@saveRecord');
    Route::delete('/delete/{ids}', 'CustomerController@delete');
});