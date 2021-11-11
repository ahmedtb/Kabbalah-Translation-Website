<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{

    public function definition()
    {
        return [
            'activated' => $this->faker->boolean(),
            'page_id' => Page::factory()->create(),
            'category_id' => random_int(1, 3) == 1 ? (Category::inRandomOrder()->first() ?? Category::factory()->create()) : Category::factory()->create(),
            'description' => $this->faker->text(),
            'thumbnail' => getBase64DefaultImage()
        ];
    }
}
