<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BooksController;
use App\Http\Controllers\API\PagesController;
use App\Http\Controllers\API\ArticlesController;
use App\Http\Controllers\API\CategoriesController;

Route::get('/books/', [BooksController::class, 'index']);
Route::get('/books/suggestion', [BooksController::class, 'booksSuggestion']);
Route::get('/books/{id}', [BooksController::class, 'show']);
Route::get('/books/{id}/thumbnail', [BooksController::class, 'thumbnail'])->name('book_thumbnail');

Route::get('/books/section/{id}', [BooksController::class, 'getSection']);

Route::get('/pages/{id}', [PagesController::class, 'show']);


Route::get('/articles/', [ArticlesController::class, 'index']);
Route::get('/articles/suggestion', [ArticlesController::class, 'articlesSuggestion']);
Route::get('/articles/{id}', [ArticlesController::class, 'show']);
Route::get('/articles/{id}/thumbnail', [ArticlesController::class, 'thumbnail'])->name('article_thumbnail');

Route::get('/categories/', [CategoriesController::class, 'index']);
Route::get('/categories/{id}', [CategoriesController::class, 'show']);