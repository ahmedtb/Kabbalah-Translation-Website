<?php

namespace App\Http\Controllers\API;

use App\Models\Page;
use Illuminate\Http\Request;
use App\Rules\PageContentRule;
use App\Http\Controllers\Controller;
use Dotenv\Exception\ValidationException;

class PagesController extends Controller
{

    public function create(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'page_content' => ['required', new PageContentRule()],
            'activated' => ['required', 'boolean']
        ]);
        // return $data;
        Page::create([
            'title' => $request->title,
            'page_content' => $request->page_content,
            'activated' => $request->activated
        ]);
        return response()->json(['success' => 'page content successfully created'], 201);
    }

    public function index(Request $request)
    {
        return Page::all();
    }

    public function show($id)
    {
        return Page::where('id', $id)->first();
    }

    public function update(Request $request, $id)
    {
        $page = Page::where('id', $id)->first();
        if (!$page)
            throw new ValidationException('there is no such page with id = ' . $id);
        $data = $request->validate([
            'title' => ['required', 'string'],
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
            throw new ValidationException('there is no such page with id = ' . $id);
        $page->delete();
        return response()->json(['success' => 'page with id = ' . $id . ' is deleted']);
    }
}
