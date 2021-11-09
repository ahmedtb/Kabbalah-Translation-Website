<?php

namespace Tests\Feature\Structure;

use App\Models\Book;
use Tests\TestCase;
use App\Models\Page;
use App\Models\BookChapter;
use App\Models\BookSection;
use App\Rules\ContentTableRule;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_book_chapters_can_have_many_sections()
    {
        $chapter = BookChapter::factory()->create();
        $sections = BookSection::factory(5)->forChapter($chapter)->create();
        $this->assertEquals($chapter->sections()->count(), $sections->count());
    }

    public function test_book_can_have_many_chapters_and_sections()
    {
        $book = Book::factory()->create();

        $chapters = BookChapter::factory(5)->forBook($book)->create();
        $this->assertEquals($book->bookChapters()->count(), $chapters->count());

        $sections = BookSection::factory(2)->forBook($book)->create();
        $this->assertEquals($book->sections()->count(), $sections->count());
    }

    public function test_book_content_table_consists_of_pages_and_chapters()
    {
        $book = Book::factory()->create();

        // two chapters
        BookChapter::factory(2)->create();

        // five section inside two chapters
        BookSection::factory(5)->create();

        // dd($book->contentTable());

        $this->assertEquals($book->contentTable()->count(), 2);
    }

    public function test_content_table_rule_validates_contentTables()
    {
        $validator = new ContentTableRule;

        $page = Page::factory()->create();
        $contentTable = [
            [
                'type' => 'section',
                'title' => 'bbbbb',
                'page_id' => $page->id
            ],
            [
                'type' => 'chapter',
                'title' => 'bbbbb',
                'sections' => [
                    [
                        'type' => 'section',
                        'title' => 'bbbbb',
                        'page_id' => $page->id
                    ],
                    [
                        'type' => 'section',
                        'title' => 'bbbbb',
                        'page_id' => $page->id
                    ],
                ]
            ],
            [
                'type' => 'section',
                'title' => 'bbbbb',
                'page_id' => $page->id
            ],
        ];
        $this->assertTrue($validator->passes('', $contentTable));
    }
}
