<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/home', 'HomeController@index');
Route::get('/download/{file}', 'PublicController@download')->middleware('auth');
Route::get('/command/excel', 'ProductController@exportExcel')->middleware('auth');
Route::get('/', function () {
    return view('index');
})->middleware('auth');
Route::match(['get', 'post'], '/{any}', function ($any) {
    return view('index');
})->where('any', '.*')->middleware('auth');