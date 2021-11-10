<?php

namespace App\Http\Controllers\API;

use App\Filters\BookFilters;
use App\Models\Book;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Rules\ContentTableRule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\BookChapter;
use App\Models\BookSection;
use Illuminate\Validation\ValidationException;

class BooksController extends Controller
{


    public function index(Request $request, BookFilters $filters)
    {
        return Book::filter($filters)->where('activated',true)->get();
    }
    public function show(Request $request, $id)
    {
        $book =  Book::where('id', $id)->with($request->with ?? [])->first();
        $book->content_table = $book->contentTable();
        if (!$book)
            throw ValidationException::withMessages(['id' => 'no such book ' . $id . ' exists']);
        return $book;
    }
}
