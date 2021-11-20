<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class HeaderComponent extends PageComponent
{

    private string $original;
    private ?string $translated = null;
    private int $size;
    private array $style = [];

    public static function fromArray(array $array)
    {
        if ($array['class'] != HeaderComponent::class)
            throw new PageComponentsException('the array class is not HeaderComponent class, it is: ' . $array['class']);
        $style = array_key_exists('style', $array) ? ($array['style']) : [];
        $size = array_key_exists('size', $array) ? $array['size'] : 1;

        return new self($array['original'], $array['translated'], $size, $style);
    }
    public function __construct(string $original, ?string $translated = null, int $size = 1, array $style = [])
    {
        $this->setoriginal($original);
        $this->setTranslated($translated);
        $this->size = $size;
        $this->style = $style;
    }

    public function jsonSerialize()
    {
        return [
            'class' => HeaderComponent::class,
            'original' => $this->original,
            'translated' => $this->translated,
            'size' => $this->size,
            'style' => $this->style,
        ];
    }


    public function setoriginal(string $value)
    {
        $this->original = $value;
    }
    public function getoriginal()
    {
        return $this->original;
    }
    public function setTranslated(?string $value = null)
    {
        $this->translated = $value;
    }
    public function getTranslated()
    {
        return $this->translated;
    }
    public function generateMockedValues()
    {
        $faker = Container::getInstance()->make(Generator::class);
        $this->setoriginal($faker->sentence());
        $this->setTranslated($faker->sentence());
    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof HeaderComponent
            && $this->original == $component->getoriginal()
            && $this->translated == $component->getTranslated()
        ) {
            return true;
        } else {
            return false;
        }
    }

    public function isTranslated()
    {
        return $this->translated != null || strlen($this->translated);
    }
}
