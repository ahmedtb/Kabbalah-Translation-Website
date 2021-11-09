<?php

namespace Tests\Feature\API;

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

    public function test_book_create_endpoint()
    {
        $title = 'aaaa';
        $description = 'bbbbb';
        $pages = Page::factory(4)->create();
        $contentTable = [
            [
                'type' => 'section',
                'title' => 'aaaaa',
                'page_id' => $pages[0]->id
            ],
            [
                'type' => 'chapter',
                'title' => 'bbbbb',
                'sections' => [
                    [
                        'type' => 'section',
                        'title' => 'ccccc',
                        'page_id' => $pages[1]->id
                    ],
                    [
                        'type' => 'section',
                        'title' => 'ddddd',
                        'page_id' => $pages[2]->id
                    ],
                ]
            ],
            [
                'type' => 'section',
                'title' => 'aaaaa',
                'page_id' => $pages[3]->id
            ],
        ];
        $response = $this->post('/dashboardAPI/books/create', [
            'title' => $title,
            'description' => $description,
            'contentTable' => $contentTable
        ]);
        $response->assertOk();

        $this->assertEquals(BookChapter::all()->count(), 1);
        $this->assertEquals(BookSection::all()->count(), 4);

    }
}
