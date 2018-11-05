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

Route::get('/home', 'HomeController@index')->name('home');
Route::resource('/vehicles', 'VehicleController')->middleware('auth');
Route::resource('/clients', 'ClientController')->middleware('auth');
Route::resource('/rentals', 'RentalController')->middleware('auth');
Route::resource('/models', 'ModellController')->middleware('auth');
Route::resource('/brands', 'BrandController')->middleware('auth');
Route::resource('/statues', 'RentalStatusController')->middleware('auth');
Route::resource('/contacts', 'ContactController')->middleware('auth');
Route::resource('/contact_types', 'ContactTypeController')->middleware('auth');


Route::get('//rentals/create/{id}', 'RentalController@createWithAuto')->middleware('auth');
Route::get('//rentals/deliver/{id}', 'RentalController@deliver')->middleware('auth');
Route::get('//rentals/cancel/{id}', 'RentalController@cancel')->middleware('auth');
Route::get('//rentals/history/', 'RentalController@history')->middleware('auth');