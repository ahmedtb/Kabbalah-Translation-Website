<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\BookFilters;
use App\Models\Book;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Rules\ContentTableRule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\BookChapter;
use App\Models\BookSection;
use App\Rules\Base64Rule;
use Illuminate\Validation\ValidationException;

class BooksController extends Controller
{


    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'thumbnail' => ['required', new Base64Rule(200000)],
            'author' => 'required|string',
            'activated' => 'required|boolean',
            'content_table' => ['required', new ContentTableRule],
            // 'contentTable' => ['required', new ContentTableRule]
        ]);

        $book = Book::create([
            'title' => $request->title,
            'description' => $request->description,
            'thumbnail' => $request->thumbnail,
            'author' => $request->author,
            'content_table' => $request->content_table,
        ]);
        // $this->createContentTable($request->contentTable, $book->id);

        return ['success' => 'book is successfully created'];
    }

    public function update(Request $request, $id)
    {
        // return $request->all();
        $data = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'thumbnail' => ['sometimes', new Base64Rule(200000)],
            'author' => 'sometimes|string',
            'activated' => 'sometimes|boolean',
            'content_table' => ['sometimes', new ContentTableRule],
        ]);
        $book =  Book::where('id', $id)->first();
        if (!$book)
            throw ValidationException::withMessages(['id' => 'no such book id exists']);

        $book->update($data);
        // $this->createContentTable($request->contentTable, $book->id);

        return ['success' => "book {$id} is successfully updated"];
    }

    public function index(Request $request, BookFilters $filters)
    {
        return Book::filter($filters)
            ->paginate($request->input('page_size') ?? 5)
            ->appends(request()->except('page'));
    }
    public function show(BookFilters $filters, $id)
    {
        $book =  Book::where('id', $id)->filter($filters)->first();
        if (!$book)
            throw ValidationException::withMessages(['id' => 'no such book id exists']);
        return $book;
    }
}
