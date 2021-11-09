<?php

namespace App\Http\Controllers\API;

use App\Models\Page;
use App\Filters\PageFilters;
use Illuminate\Http\Request;
use App\Rules\PageContentRule;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class PagesController extends Controller
{

    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'title' => ['required', 'string'],
            'description' => 'nullable|string',
            'page_content' => ['required', new PageContentRule()],
        ]);
        // return $data;
        Page::create($data);
        return response()->json(['success' => 'page content successfully created'], 201);
    }

    public function index(Request $request, PageFilters $filters)
    {
        return Page::filter($filters)->get();
    }

    public function show($id)
    {
        return Page::where('id', $id)->first()->makeVisible('page_content');
    }

    public function update(Request $request, $id)
    {
        $page = Page::where('id', $id)->first();
        if (!$page)
            throw  ValidationException::withMessages(['id' => 'there is no such page with id = ' . $id]);
        $data = $request->validate([
            'title' => ['required', 'string'],
            'description' => 'nullable|string',
            'page_content' => ['required', new PageContentRule()],
            'activated' => ['required', 'boolean']
        ]);
        $page->update($data);
        return response()->json(['success' => 'page with id = ' . $id . ' is updated']);
    }

    public function delete(Request $request, $id)
    {
        $page = Page::where('id', $id)->first();
        if (!$page)
            throw ValidationException::withMessages(['id' => 'there is no such page with id = ' . $id]);
        $page->delete();
        return response()->json(['success' => 'page with id = ' . $id . ' is deleted']);
    }
}
