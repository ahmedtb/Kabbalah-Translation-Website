<?php

namespace Tests\Feature\API;

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

    public function test_page_paragraph_translated_text_could_be_edited_by_admin()
    {
    }
}
