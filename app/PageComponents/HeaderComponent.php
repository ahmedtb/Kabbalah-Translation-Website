<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class HeaderComponent extends PageComponent
{

    private string $orignal;
    private ?string $translated = null;
    private int $size = 1;

    public static function fromArray(array $array)
    {
        if($array['class'] != HeaderComponent::class)
            throw new PageComponentsException('the array class is not HeaderComponent class, it is: ' . $array['class']);
        return new self($array['orignal'], $array['translated'], $array['size']);
    }
    public function __construct(string $orignal, ?string $translated = null, int $size = 1)
    {
        $this->setOrignal($orignal);
        $this->setTranslated($translated);
        $this->size = $size;
    }
    
    public function jsonSerialize()
    {
        return [
            'class' => HeaderComponent::class,
            'original' => $this->orignal,
            'translated' => $this->translated,
            'size' => $this->size,
        ];
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
        $this->setOrignal($faker->sentence());
        $this->setTranslated($faker->sentence());

    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof HeaderComponent
            && $this->orignal == $component->getOrignal()
            && $this->translated == $component->getTranslated()
        ) {
            return true;
        } else {
            return false;
        }
    }

}