<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class YoutubeEmbedComponent extends PageComponent
{

    private $original;
    private $translated;

    public static function fromArray(array $array)
    {
        if ($array['class'] != YoutubeEmbedComponent::class)
            throw new PageComponentsException('the array class is not YoutubeEmbedComponent class, it is: ' . $array['class']);
        return new self($array['original'], $array['translated']);
    }
    public function __construct($original, $translated)
    {
        $this->setoriginal($original);
        $this->setTranslated($translated);
    }
    public function jsonSerialize()
    {
        return [
            'class' => YoutubeEmbedComponent::class,
            'original' => $this->original,
            'translated' => $this->translated,
        ];
    }
    public function setoriginal($value)
    {
        if ($value != null && strlen($value) != 11)
            throw new PageComponentsException('youtube embed is 11 length');
        $this->original = $value;
    }
    public function getoriginal()
    {
        return $this->original;
    }
    public function setTranslated($value)
    {
        if ($value != null && strlen($value) != 11)
            throw new PageComponentsException('youtube embed is 11 length');
        $this->translated = $value;
    }
    public function getTranslated()
    {
        return $this->translated;
    }
    public function generateMockedValues()
    {
        $faker = Container::getInstance()->make(Generator::class);
        $this->setoriginal('rokGy0huYEA');
        $this->setTranslated('AVqpsvBe9sg');
    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof YoutubeEmbedComponent
            && $this->original == $component->getoriginal()
            && $this->translated == $component->getTranslated()
        ) {
            return true;
        } else {
            return false;
        }
    }
}
