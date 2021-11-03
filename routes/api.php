<?php

use App\Http\Controllers\API\PagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/dashboard/pages', [PagesController::class, 'create']);
Route::get('/dashboard/pages', [PagesController::class, 'index']);
Route::get('/dashboard/pages/{id}', [PagesController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
