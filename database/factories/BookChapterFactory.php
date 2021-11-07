<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookChapterFactory extends Factory
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
            'book_id' => Book::inRandomOrder()->first()->id ?? Book::factory()->create()->id
        ];
    }

    public function forBook(Book $book)
    {
        return $this->state(function (array $attributes) use ($book) {
            return [
                'book_id' => $book->id
            ];
        });
    }
}
