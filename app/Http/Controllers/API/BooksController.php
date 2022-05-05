<?php

namespace App\Http\Controllers\API;

use App\Filters\BookFilters;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class BooksController extends Controller
{


    public function index(BookFilters $filters)
    {
        return Book::filter($filters)->where('activated', true)->get();
    }
    public function show(Request $request, $id)
    {
        $book =  Book::where('id', $id)->with($request->with ?? [])->first();
        if (!$book)
            throw ValidationException::withMessages(['id' => 'no such book ' . $id . ' exists']);
        return $book;
    }

    public function thumbnail($id)
    {
        $book =  Book::find($id);
        if (!$book)
            throw ValidationException::withMessages(['id' => 'no such book ' . $id . ' exists']);
        if ($book->thumbnail){
            $extension = explode('/', explode(";", $book->thumbnail)[0])[1];
            
            $raw_image_string = base64_decode(explode("base64,", $book->thumbnail)[1]);
            return response($raw_image_string)->header('Content-Type', 'image/' . $extension);
        }
    }
}
