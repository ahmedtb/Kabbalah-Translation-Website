<?php

namespace App\Http\Controllers\API;

use App\Models\Page;
use Illuminate\Http\Request;
use App\Rules\PageContentRule;
use App\Http\Controllers\Controller;

class PagesController extends Controller
{

    public function createPage(Request $request)
    {
        $data = $request->validate([
            'page_content' => ['required', new PageContentRule()],
            'activated' => ['required', 'boolean']
        ]);
        Page::create($data);
        return response()->json(['success', 'page content successfully created'], 201);
    }

    public function index(Request $request)
    {
        return Page::all();
    }
}
