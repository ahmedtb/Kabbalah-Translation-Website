<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Models\Page;
use App\Filters\PageFilters;
use Illuminate\Http\Request;
use App\Rules\PageContentRule;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class PagesController extends Controller
{

    public function create(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'unique:pages,title'],
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
            'title' => ['required', 'string', Rule::unique('pages')->ignore($page->id)],
            'page_content' => ['required', new PageContentRule()],
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
