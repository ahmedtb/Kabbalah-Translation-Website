<?php

namespace Database\Factories;

use App\PageComponents\PageContent;
use App\PageComponents\LinkComponent;
use App\PageComponents\ImageComponent;
use App\PageComponents\TitleComponent;
use App\PageComponents\HeaderComponent;
use App\PageComponents\ParagraphComponent;
use Illuminate\Database\Eloquent\Factories\Factory;

class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected function generateRandomPageComponents()
    {
        $rand_size = random_int(1, 10);
        $pageComponents = [];
        while ($rand_size--) {
            $type = random_int(1, 5);
            if ($type == 1) {
                array_push($pageComponents, new ParagraphComponent($this->faker->text()));
            } else if ($type == 2) {
                array_push($pageComponents, new HeaderComponent($this->faker->sentence()));
            } else if ($type == 3) {
                array_push($pageComponents, new LinkComponent($this->faker->url()));
            } else if ($type == 4) {
                array_push($pageComponents, new TitleComponent($this->faker->sentence()));
            } else if ($type == 5) {
                array_push($pageComponents, new ImageComponent(getBase64DefaultImage()));
            }
        }
        return $pageComponents;
    }

    public function definition()
    {

        return [
            'page_content' => new PageContent($this->generateRandomPageComponents()),
            'activated' => $this->faker->boolean()
        ];
    }

    public function activated(bool $bool = true)
    {
        return $this->state(function (array $attributes) use ($bool) {
            return [
                'activated' => $bool
            ];
        });
    }
}
