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


    public function index(Request $request, PageFilters $filters)
    {
        return Page::filter($filters)->get();
    }

    public function show($id)
    {
        return Page::where('id', $id)->first()->makeVisible('page_content');
    }

}
