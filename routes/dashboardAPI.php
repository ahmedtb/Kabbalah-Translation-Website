<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PagesController;

Route::post('/pages', [PagesController::class, 'create']);
Route::get('/pages', [PagesController::class, 'index']);
Route::get('/pages/{id}', [PagesController::class, 'show']);
Route::put('/pages/{id}', [PagesController::class, 'update']);
Route::delete('/pages/{id}', [PagesController::class, 'delete']);
