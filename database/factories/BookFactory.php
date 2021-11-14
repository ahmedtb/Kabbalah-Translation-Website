<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{

    public function definition()
    {
        $table = [
            [
                'type' => 'section',
                'title' => 'aaaaa',
                'page_id' => Page::factory()->create()->id
            ],
            [
                'type' => 'chapter',
                'title' => 'bbbbb',
                'sections' => [
                    [
                        'type' => 'section',
                        'title' => 'cccc',
                        'page_id' => Page::factory()->create()->id
                    ],
                    [
                        'type' => 'section',
                        'title' => 'eeee',
                        'page_id' => Page::factory()->create()->id
                    ]
                ]
            ]
        ];
        return [
            'title' => $this->faker->sentence(7),
            'description' => $this->faker->text(500),
            'activated' => $this->faker->boolean(),
            'thumbnail' => getBase64DefaultImage(),
            'author' => $this->faker->sentence(3),
            'table' => $table
        ];
    }
}
