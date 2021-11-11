<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(7),
            'description' => $this->faker->text(500),
            'activated' => $this->faker->boolean(),
            'thumbnail' => getBase64DefaultImage(),
            'author' => $this->faker->sentence(3),
        ];
    }
}
