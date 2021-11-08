<?php

namespace App\Http\Controllers\API;

use App\Models\Page;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BooksController extends Controller
{
    public function listOfPages()
    {
        return Page::where('pageable_id', null)->get()->makeHidden('page_content');
    }

    public function createBook(Request $request)
    {
    }
}
