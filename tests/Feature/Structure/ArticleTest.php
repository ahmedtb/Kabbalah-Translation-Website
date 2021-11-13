<?php

namespace Tests\Feature\Structure;

use App\Models\Article;
use App\Models\Book;
use Tests\TestCase;
use App\Models\Page;
use App\Models\BookChapter;
use App\Models\BookSection;
use App\Rules\ContentTableRule;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    public function test_article_model_can_fetch_page_with_out_content()
    {
        $article = Article::factory()->create();
        $this->assertNotNull($article->pageWithoutContent);
    }
}
