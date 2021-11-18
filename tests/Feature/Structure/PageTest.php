<?php

namespace Tests\Feature\Structure;

use Tests\TestCase;
use App\Models\Book;
use App\Models\Page;
use App\Models\User;
use App\Models\BookSection;
use App\PageComponents\PageContent;
use App\PageComponents\LinkComponent;
use App\PageComponents\ImageComponent;
use App\PageComponents\TitleComponent;
use App\PageComponents\HeaderComponent;
use App\PageComponents\ParagraphComponent;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PageTest extends TestCase
{
    use RefreshDatabase;


    public function test_page_have_paragraphs_images_titles_headers_links_and_could_be_activated_or_deactivated_for_vistor_view()
    {
        $pageContent = new PageContent([
            new ParagraphComponent('aaaaaaa'),
            new HeaderComponent('bbbbbb'),
            new LinkComponent('http://www.google.com'),
            new TitleComponent('eeeeee'),
            new ImageComponent(getBase64DefaultImage()),
        ], 'ltr', 'rtl');
        $this->assertArrayHasKey('pageComponents', $pageContent->jsonSerialize());
        foreach ($pageContent->jsonSerialize()['pageComponents'] as $component) {
            if ($component['class'] != LinkComponent::class) {
                $this->assertArrayHasKey('original', $component);
                $this->assertArrayHasKey('translated', $component);
            }
        }
        $page = Page::factory()->activated()->create();
        $this->assertTrue($page->activated);
        $page = Page::factory()->activated(false)->create();
        $this->assertFalse($page->activated);
    }

    public function test_page_can_have_many_book_through_book_sections()
    {

        $page = Page::factory()->create();
        $book = Book::factory()->create(
            [
                'content_table' => [
                    [
                        'type' => 'chapter',
                        'sections' => [
                            [
                                'page_id' => $page->id
                            ]
                        ]
                    ]
                ]
            ]
        );

        $this->assertEquals($page->books()->count(), 1);

        $page = Page::factory()->create();
        $book = Book::factory()->create(
            [
                'content_table' => [
                    [
                        'type' => 'section',

                        'page_id' => $page->id

                    ]
                ]
            ]
        );
        dd($book);
        $this->assertEquals($page->books->count(), 1);

    }
}
