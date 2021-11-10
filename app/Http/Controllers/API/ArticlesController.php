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
        return Article::filter($filters)->get();
    }

    public function show(Request $request, $id)
    {
        $article = Article::where('id', $id)->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        return $article;
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'page_id' => 'required|exists:pages,id',
            'category_id' => 'required|exists:categories,id',
            'activated' => 'required|boolean'
        ]);

        $article = Article::create($data);

        return response()->json(['success' => 'article ' . $article->id . ' is created']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'page_id' => 'sometimes|exists:pages,id',
            'category_id' => 'sometimes|exists:categories,id',
            'activated' => 'sometimes|boolean'
        ]);

        $article = Article::where('id', $request->id)->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        else{
            $article->update($data);
            return response()->json(['success' => 'article ' . $article->id . ' is created']);
        }
    }
}
