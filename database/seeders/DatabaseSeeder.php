<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Page;
use App\Models\Admin;
use App\Models\Article;
use App\Models\BookChapter;
use App\Models\BookSection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Admin::factory()->create(['username' => 'ahmed', 'password' => Hash::make('password')]);
        // Page::factory(20)->create();
        // $books = Book::factory(10)->create();
        
        // $articles = Article::factory(30)->create();

    }
}
