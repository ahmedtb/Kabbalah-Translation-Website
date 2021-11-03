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
        $this->setOriginal($original);
        $this->setTranslated($translated);
    }
    public function setOriginal(string $value)
    {
        $this->original = $value;
    }
    public function getOriginal()
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
        $this->setOriginal($faker->text());
        $this->setTranslated($faker->text());

    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof ParagraphComponent
            && $this->original == $component->getOriginal()
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
