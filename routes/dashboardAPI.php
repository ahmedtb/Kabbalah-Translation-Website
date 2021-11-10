<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardAPI\BooksController;
use App\Http\Controllers\DashboardAPI\PagesController;
use App\Http\Controllers\DashboardAPI\CategoriesController;
use App\Http\Controllers\DashboardAPI\ArticlesController;

Route::post('/pages', [PagesController::class, 'create']);
Route::get('/pages', [PagesController::class, 'index']);
Route::get('/pages/{id}', [PagesController::class, 'show']);
Route::put('/pages/{id}', [PagesController::class, 'update']);
Route::delete('/pages/{id}', [PagesController::class, 'delete']);

Route::post('/books/create', [BooksController::class, 'create']);
Route::get('/books/', [BooksController::class, 'index']);
Route::get('/books/{id}', [BooksController::class, 'show']);

Route::post('/categories', [CategoriesController::class, 'create']);
Route::get('/categories/', [CategoriesController::class, 'index']);
Route::get('/categories/{id}', [CategoriesController::class, 'show']);
Route::put('/categories/{id}', [CategoriesController::class, 'update']);
Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);

Route::post('/articles', [ArticlesController::class, 'create']);
Route::get('/articles/', [ArticlesController::class, 'index']);
Route::get('/articles/{id}', [ArticlesController::class, 'show']);
Route::put('/articles/{id}', [ArticlesController::class, 'update']);
Route::delete('/articles/{id}', [ArticlesController::class, 'destroy']);
