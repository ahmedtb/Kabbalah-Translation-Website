<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{

    public function definition()
    {
        $content_table = [
            [
                'type' => 'section',
                'title' => $this->faker->sentence(),
                'page_id' => Page::inRandomOrder()->first()->id ?? Page::factory()->create()->id
            ],
            [
                'type' => 'chapter',
                'title' => $this->faker->sentence(),
                'sections' => [
                    [
                        'type' => 'section',
                        'title' => $this->faker->sentence(),
                        'page_id' => Page::inRandomOrder()->first()->id ?? Page::factory()->create()->id
                    ],
                    [
                        'type' => 'section',
                        'title' => $this->faker->sentence(),
                        'page_id' => Page::inRandomOrder()->first()->id ?? Page::factory()->create()->id
                    ]
                ]
            ],
            [
                'type' => 'section',
                'title' => $this->faker->sentence(),
                'page_id' => Page::inRandomOrder()->first()->id ?? Page::factory()->create()->id
            ],
        ];
        return [
            'title' => $this->faker->sentence(7),
            'description' => $this->faker->text(500),
            'activated' => $this->faker->boolean(),
            'thumbnail' => getBase64DefaultImage(),
            'author' => $this->faker->sentence(3),
            'content_table' => $content_table
        ];
    }
}
