<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BooksController;
use App\Http\Controllers\API\PagesController;

Route::get('/books/', [BooksController::class, 'index']);
Route::get('/books/{id}', [BooksController::class, 'show']);

Route::get('/books/section/{id}', [BooksController::class, 'getSection']);

Route::get('/pages/{id}', [PagesController::class, 'show']);

