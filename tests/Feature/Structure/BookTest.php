<?php

namespace Tests\Feature\Structure;

use App\Models\Book;
use Tests\TestCase;
use App\Models\Page;
use App\Models\BookChapter;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_book_chapters_can_have_many_pages()
    {
        $chapter = BookChapter::factory()->create();
        $pages = Page::factory(5)->forChapter($chapter)->create();
        $this->assertEquals($chapter->pages()->count(), $pages->count());
    }

    public function test_book_chapters_can_have_many_chapters()
    {
        $book = Book::factory()->create();
        $chapters = BookChapter::factory(5)->forBook($book)->create();
        $this->assertEquals($book->bookChapters()->count(), $chapters->count());
    }

    public function test_book_content_table_consists_of_pages_and_chapters()
    {
        $book = Book::factory()->create();
        
        // two pages
        Page::factory(2)->forBook($book)->create();

        // one chapter
        $chapter = BookChapter::factory()->forBook($book)->create();
        Page::factory(5)->forChapter($chapter)->create();

        $this->assertEquals($book->contentTable()->count(), 3);
    }
    
}
