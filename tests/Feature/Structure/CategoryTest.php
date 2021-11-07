<?php

namespace Tests\Feature\Structure;

use Tests\TestCase;
use App\Models\Page;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_can_have_many_pages()
    {
        $category = Category::factory()->create();
        $pages = Page::factory(5)->forCategory($category)->create();
        $this->assertEquals($category->pages()->count(), $pages->count());
    }
}
