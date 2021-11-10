<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BooksController;


Route::get('/books/', [BooksController::class, 'index']);
