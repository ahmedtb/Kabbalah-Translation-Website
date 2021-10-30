<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class LinkComponent extends PageComponent
{

    private string $orignal;
    private ?string $translated = null;

    public static function fromArray(array $array)
    {
        if($array['class'] != LinkComponent::class)
            throw new PageComponentsException('the array class is not LinkComponent class, it is: ' . $array['class']);
        return new self($array['orignal'], $array['translated']);
    }
    public function __construct(string $orignal, ?string $translated = null)
    {
        $this->setOrignal($orignal);
        $this->setTranslated($translated);
    }
    public function setOrignal(string $value)
    {
        $this->orignal = $value;
    }
    public function getOrignal()
    {
        return $this->orignal;
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
        $this->setOrignal($faker->url());
        $this->setTranslated($faker->url());

    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof LinkComponent
            && $this->orignal == $component->getOrignal()
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
            'class' => LinkComponent::class,
            'original' => $this->orignal,
            'translated' => $this->translated,

        ];
    }
}
