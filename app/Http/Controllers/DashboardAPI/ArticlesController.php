<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Filters\ArticlesFilters;
use App\Http\Controllers\Controller;
use App\Rules\Base64Rule;
use Illuminate\Validation\ValidationException;

class ArticlesController extends Controller
{
    public function index(Request $request, ArticlesFilters $filters)
    {
        return Article::filter($filters)
            ->paginate($request->input('page_size') ?? 5)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        $article = Article::where('id', $id)->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        return $article;
    }

    public function destroy(Request $request, $id)
    {
        $article = Article::where('id', $id)->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        else {
            $article->delete();
            return response()->json(['success' => 'article ' . $article->id . ' is deleted']);
        }
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'sometimes|string',
            'thumbnail' => ['sometimes', new Base64Rule(200000)],
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
        else {
            $article->update($data);
            return response()->json(['success' => 'article ' . $article->id . ' is created']);
        }
    }
}
