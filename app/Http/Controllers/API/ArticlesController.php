<?php

namespace App\Http\Controllers\API;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Filters\ArticlesFilters;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ArticlesController extends Controller
{
    public function index(Request $request, ArticlesFilters $filters)
    {
        return Article::activated()
            ->filter($filters)
            ->paginate($request->input('page_size') ?? 5)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        $article = Article::where('id', $id)->with('page', 'category')->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        else {
            $article->page->makeVisible('page_content');
            return $article;
        }
    }
}
