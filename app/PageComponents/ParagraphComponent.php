<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;
use App\PageComponents\PageComponent;
use App\PageComponents\PageComponentsException;


class ParagraphComponent extends PageComponent
{

    private string $original;
    private string $translated = '';
    private array $style = [];

    public static function fromArray(array $array)
    {
        if ($array['class'] != ParagraphComponent::class)
            throw new PageComponentsException('the array class is not ParagraphComponent class, it is: ' . $array['class']);
        $style = array_key_exists('style', $array) ? $array['style'] : [];

        return new self($array['original'], $array['translated'], $style);
    }
    public function __construct(string $original, string $translated = '', array $style = [])
    {
        $this->setOriginal($original);
        $this->setTranslated($translated);
        $this->setStyle($style);
    }

    public function jsonSerialize()
    {
        return [
            'class' => ParagraphComponent::class,
            'original' => $this->original,
            'translated' => $this->translated,
            'style' => $this->style,
        ];
    }

    public function setOriginal(string $value)
    {
        $this->original = $value;
    }
    public function getOriginal()
    {
        return $this->original;
    }
    public function setTranslated(string $value = '')
    {
        $this->translated = $value;
    }
    public function getTranslated()
    {
        return $this->translated;
    }
    public function setStyle(array $style = [])
    {
        $this->style = $style;
    }
    public function getStyle()
    {
        return $this->style;
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
}
