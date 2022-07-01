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
            ->latest()
            ->paginate($request->input('page_size') ?? 5)->onEachSide($request->input('onEachSide') ?? 0)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        $article = Article::where('id', $id)->with('category')->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        else {
            $article->makeVisible('page_content');
            return $article;
        }
    }

    public function articlesSuggestion(Request $request)
    {
        return Article::activated()->inRandomOrder()->limit(5)->get();
    }


    public function thumbnail($id)
    {
        $article =  Article::find($id);
        if (!$article)
            throw ValidationException::withMessages(['id' => 'no such article ' . $id . ' exists']);
        return $article->thumbnail();
    }
}
