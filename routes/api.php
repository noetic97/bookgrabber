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

Route::get('books', 'BookGrabberController@index')->name('books');
Route::post('books', 'BookGrabberController@store')->name('books.store');
Route::get('books/{id}', 'BookGrabberController@show')->name('books.show');
Route::put('books/{book}', 'BookGrabberController@markAsRead')->name('books.put');
Route::delete('books/{id}', 'BookGrabberController@destroy')->name('books.delete');
