<?php

namespace Database\Factories;

use App\Models\BookChapter;
use App\Models\Page;
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
            'sectionable_id' => BookChapter::inRandomOrder()->first ?? BookChapter::factory()->create(),
            'sectionable_type' => BookChapter::class,
            'page_id' => Page::inRandomOrder()->first ?? Page::factory()->create(),
        ];
    }
}
