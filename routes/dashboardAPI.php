<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardAPI\HomeController;
use App\Http\Controllers\DashboardAPI\BooksController;
use App\Http\Controllers\DashboardAPI\PagesController;
use App\Http\Controllers\DashboardAPI\ArticlesController;
use App\Http\Controllers\DashboardAPI\Auth\LoginController;
use App\Http\Controllers\DashboardAPI\CategoriesController;

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:admin')->group(
    function () {

        Route::delete('/logout', [LoginController::class, 'logout'])->middleware('auth:admin');
        Route::get('/admin', [LoginController::class, 'user'])->middleware('auth:admin');

        Route::get('/home', [HomeController::class, 'home']);
        Route::get('/fetchBase64DataFromUrl', [HomeController::class, 'fetchBase64DataFromUrl']);

        Route::post('/pages', [PagesController::class, 'create']);
        Route::get('/pages', [PagesController::class, 'index']);
        Route::get('/pages/{id}', [PagesController::class, 'show']);
        Route::put('/pages/{id}', [PagesController::class, 'update']);
        Route::delete('/pages/{id}', [PagesController::class, 'delete']);

        Route::post('/books/create', [BooksController::class, 'create']);
        Route::put('/books/{id}', [BooksController::class, 'update']);
        Route::get('/books/', [BooksController::class, 'index']);
        Route::get('/books/{id}', [BooksController::class, 'show']);
        Route::get('/books/{id}/thumbnail', [BooksController::class, 'thumbnail']);
        
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
        Route::get('/articles/{id}/thumbnail', [ArticlesController::class, 'thumbnail']);

        Route::post('/glossaryTerms', [GlossaryTermsController::class, 'create']);
        Route::get('/glossaryTerms/', [GlossaryTermsController::class, 'index']);
        Route::get('/glossaryTerms/{id}', [GlossaryTermsController::class, 'show']);
        Route::put('/glossaryTerms/{id}', [GlossaryTermsController::class, 'update']);
        Route::delete('/glossaryTerms/{id}', [GlossaryTermsController::class, 'destroy']);
    }
);
