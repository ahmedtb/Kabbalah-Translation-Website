<?php

use App\Http\Controllers\API\BooksController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PagesController;

Route::post('/pages', [PagesController::class, 'create']);
Route::get('/pages', [PagesController::class, 'index']);
Route::get('/pages/{id}', [PagesController::class, 'show']);
Route::put('/pages/{id}', [PagesController::class, 'update']);
Route::delete('/pages/{id}', [PagesController::class, 'delete']);

Route::post('/books/create', [BooksController::class, 'create']);
Route::get('/books/', [BooksController::class, 'index']);
Route::get('/books/{id}', [BooksController::class, 'show']);

