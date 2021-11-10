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
        $category = Category::where('id', $id)->first();
        if (!$category)
            throw ValidationException::withMessages(['id' => 'there is no category with this id: ' . $id]);
        return $category;
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string'
        ]);

        $category = Category::create($data);

        return response()->json(['success' => 'category ' . $category->id . ' is created']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);

        $category = Category::where('id', $request->id)->first();
        if (!$category)
            throw ValidationException::withMessages(['id' => 'there is no category with this id: ' . $id]);
        else {
            $category->update($data);
            return response()->json(['success' => 'category ' . $category->id . ' is created']);
        }
    }
}
