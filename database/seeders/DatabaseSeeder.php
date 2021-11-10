<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Page;
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
        Book::factory(5)->create();
        Page::factory(20)->create();
        BookChapter::factory(10)->create();
        BookSection::factory(20)->create();
        BookSection::factory(10)->forBook()->create();

    }
}
