<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Models\Book;
use App\Models\Page;
use GuzzleHttp\Client;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
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

    public function uploadDatabaseSeedFile(Request $request)
    {
        return $request->file('sqlFile');
        $path = $request->file('sqlFile')->storeAs('sql','sqlFile.sql');

        return $path;
    }

    public function fetchBase64DataFromUrl(Request $request)
    {
        // return $request;
        $client = new Client([
            'verify' => false,
            'http_errors' => false
        ]);
        $res = $client->request('GET', $request->url);
        $body = $res->getBody()->getContents();
        return ('data:' . $res->getHeader('content-type')[0] . ';base64,' . base64_encode($body));
        
    }
}
