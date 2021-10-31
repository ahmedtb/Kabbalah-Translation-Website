<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class LinkComponent extends PageComponent
{

    private string $orignal;
    private ?string $translated = null;
    private ?string $label = null;

    public static function fromArray(array $array)
    {
        if($array['class'] != LinkComponent::class)
            throw new PageComponentsException('the array class is not LinkComponent class, it is: ' . $array['class']);
        return new self($array['orignal'], $array['translated'], $array['translated'], $array['label']);
    }
    public function __construct(string $orignal, ?string $translated = null,  ?string $label = null)
    {
        $this->setOrignal($orignal);
        $this->setTranslated($translated);
        $this->setLabel($label);

    }

    public function jsonSerialize()
    {
        return [
            'class' => LinkComponent::class,
            'original' => $this->orignal,
            'translated' => $this->translated,
            'label' => $this->label,

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
    public function setLabel(?string $value = null)
    {
        $this->label = $value;
    }
    public function getLabel()
    {
        return $this->label;
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
}
