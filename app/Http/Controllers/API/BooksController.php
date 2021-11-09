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


    public function createContentTable($contentTable, $book_id)
    {
        foreach ($contentTable as $index => $element) {
            // dd($index);
            if ($element['type'] == 'section') {
                BookSection::create([
                    'title' => $element['title'],
                    'index' => $index,
                    'sectionable_type' => Book::class,
                    'sectionable_id' => $book_id,
                    'page_id' => $element['page_id'],
                ]);
            } else if ($element['type'] == 'chapter') {
                $bookChapter = BookChapter::create([
                    'index' => $index,
                    'title' => $element['title'],
                    'book_id' => $book_id,
                ]);
                foreach ($element['sections'] as $sectionIndex => $section) {
                    BookSection::create([
                        'title' => $section['title'],
                        'index' => $sectionIndex,
                        'sectionable_type' => BookChapter::class,
                        'sectionable_id' => $bookChapter->id,
                        'page_id' => $section['page_id'],
                    ]);
                }
            }
        }
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'contentTable' => ['required', new ContentTableRule]
        ]);

        DB::transaction(function () use ($request) {
            $book = Book::create([
                'title' => $request->title,
                'description' => $request->description,
            ]);
            $this->createContentTable($request->contentTable, $book->id);
        });

        return ['success' => 'book is successfully created'];
    }

    public function index(Request $request, BookFilters $filters)
    {
        return Book::filter($filters)->get();
    }
    public function show(Request $request, $id)
    {
        $book =  Book::where('id', $id)->with($request->with ?? [])->first();
        $book->content_table = $book->contentTable();
        if (!$book)
            throw ValidationException::withMessages(['id' => 'no such book id exists']);
        return $book;
    }
}
