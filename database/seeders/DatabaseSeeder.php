<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Page;
use App\Models\Article;
use App\Models\BookChapter;
use App\Models\BookSection;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Page::factory(20)->create();
        $books = Book::factory(10)->create();
        
        $articles = Article::factory(30)->create();

    }
}
