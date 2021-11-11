<?php

namespace App\Http\Controllers\API;

use App\Filters\CategoryFilters;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CategoriesController extends Controller
{
    public function index(Request $request, CategoryFilters $filters)
    {
        return Category::filter($filters)->get();
    }

    public function show(Request $request, $id)
    {
        $category = Category::where('id', $id)->with('articles.page')->first();
        if (!$category)
            throw ValidationException::withMessages(['id' => 'there is no category with this id: ' . $id]);
        return $category;
    }
}
