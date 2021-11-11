<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Page;
use App\Models\BookChapter;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookSectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->text(),
            'index' => $this->faker->numberBetween(1, 100),
            'sectionable_id' => BookChapter::inRandomOrder()->first() ?? BookChapter::factory()->create(),
            'sectionable_type' => BookChapter::class,
            'page_id' => Page::inRandomOrder()->first() ?? Page::factory()->create(),
        ];
    }


    public function forChapter(?BookChapter $chapter = null)
    {
        return $this->state(function (array $attributes) use ($chapter) {
            if ($chapter)
                return [
                    'sectionable_id' => $chapter->id,
                    'sectionable_type' => BookChapter::class,
                ];
            else
                return [
                    'sectionable_id' => BookChapter::inRandomOrder()->first() ?? BookChapter::factory()->create(),
                    'sectionable_type' => BookChapter::class,
                ];
        });
    }


    public function forBook(?Book $book = null)
    {
        return $this->state(function (array $attributes) use ($book) {
            if ($book)
                return [
                    'sectionable_id' => $book->id,
                    'sectionable_type' => Book::class,
                ];
            else
                return [
                    'sectionable_id' => Book::inRandomOrder()->first() ?? Book::factory()->create(),
                    'sectionable_type' => Book::class,
                ];
        });
    }
}
