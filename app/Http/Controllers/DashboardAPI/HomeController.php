<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Models\Book;
use App\Models\Page;
use App\Models\Article;
use App\Models\Category;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function home()
    {
        return [
            'pagesCount' => Page::count(),
            'articlesCount' => Article::count(),
            'activatedArticlesCount' => Article::activated()->count(),
            'booksCount' => Book::count(),
            'activatedBooksCount' => Book::activated()->count(),
            'categoriesCount' => Category::count(),

        ];
    }
}
