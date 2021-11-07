<?php

namespace Tests\Feature\Structure;

use App\Models\Page;
use Tests\TestCase;
use App\Models\User;
use App\PageComponents\HeaderComponent;
use App\PageComponents\ImageComponent;
use App\PageComponents\LinkComponent;
use App\PageComponents\PageContent;
use App\PageComponents\ParagraphComponent;
use App\PageComponents\TitleComponent;
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
            $this->assertArrayHasKey('original', $component);
            $this->assertArrayHasKey('translated', $component);
        }
        $page = Page::factory()->activated()->create();
        $this->assertTrue($page->activated);
        $page = Page::factory()->activated(false)->create();
        $this->assertFalse($page->activated);
    }
}
