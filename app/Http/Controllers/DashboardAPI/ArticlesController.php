<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Models\Article;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Rules\PageContentRule;
use App\Filters\ArticlesFilters;
use App\Http\Controllers\Controller;
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
        $article->makeVisible('page_content');
        // $article->makeVisible('thumbnail');

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
            'description' => 'sometimes|nullable|string',
            'about' => 'sometimes|nullable|string',
            'thumbnail' => ['sometimes', 'nullable', new Base64Rule(200000)],
            'category_id' => 'required|exists:categories,id',
            'activated' => 'required|boolean',
            'page_content' => ['required', new PageContentRule()],
            'source_url' => 'sometimes|nullable|string|unique:articles,source_url'
        ]);

        $article = Article::create($data);

        return response()->json(['success' => 'article ' . $article->id . ' is created']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|nullable|string',
            'about' => 'sometimes|nullable|string',
            'thumbnail' => ['sometimes', 'nullable', new Base64Rule(200000)],
            'category_id' => 'sometimes|exists:categories,id',
            'activated' => 'sometimes|boolean',
            'page_content' => ['sometimes', new PageContentRule()],
            'source_url' => 'sometimes|nullable|string|exists:articles,source_url'
        ]);

        $article = Article::where('id', $request->id)->first();
        if (!$article)
            throw ValidationException::withMessages(['id' => 'there is no article with this id: ' . $id]);
        else {
            $article->update($data);
            return response()->json(['success' => 'article ' . $article->id . ' is updated']);
        }
    }


    public function thumbnail($id)
    {
        $article =  Article::find($id);
        if (!$article)
            throw ValidationException::withMessages(['id' => 'no such article ' . $id . ' exists']);
        return $article->thumbnail();
    }
}
