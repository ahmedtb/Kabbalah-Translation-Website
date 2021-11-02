<?php

use App\Http\Controllers\API\PagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/dashboard/pages', [PagesController::class, 'createPage']);
Route::get('/dashboard/pages', [PagesController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
