<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;
use App\PageComponents\PageComponent;
use App\PageComponents\PageComponentsException;


class ParagraphComponent extends PageComponent
{

    private string $original;
    private ?string $translated = null;

    public static function fromArray(array $array)
    {
        if($array['class'] != ParagraphComponent::class)
            throw new PageComponentsException('the array class is not ParagraphComponent class, it is: ' . $array['class']);
        return new self($array['original'], $array['translated']);
    }
    public function __construct(string $original, ?string $translated = null)
    {
        $this->setoriginal($original);
        $this->setTranslated($translated);
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
            $component instanceof ParagraphComponent
            && $this->original == $component->getoriginal()
            && $this->translated == $component->getTranslated()
        ) {
            return true;
        } else {
            return false;
        }
    }

    public function jsonSerialize()
    {
        return [
            'class' => ParagraphComponent::class,
            'original' => $this->original,
            'translated' => $this->translated,

        ];
    }
}
