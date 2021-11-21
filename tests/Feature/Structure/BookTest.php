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
                    ]
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

    public function test_book_can_return_it_is_pages()
    {
        Page::factory(4)->create();
        $book = Book::factory()->create();
        // dd($book->content_table);

        dd($book->pages());
    }
}
