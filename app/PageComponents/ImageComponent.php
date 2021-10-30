<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class ImageComponent extends PageComponent
{

    private string $orignal;
    private ?string $translated = null;

    public static function fromArray(array $array)
    {
        if($array['class'] != ImageComponent::class)
            throw new PageComponentsException('the array class is not ImageComponent class, it is: ' . $array['class']);
        return new self($array['orignal'], $array['translated']);
    }
    public function __construct(string $orignal, ?string $translated = null)
    {
        $this->setOrignal($orignal);
        $this->setTranslated($translated);
    }
    public function setOrignal(string $value)
    {
        if (base64_encode(base64_decode($value)) != $value)
            throw new PageComponentsException('not valid value base64 string..');
        $this->orignal = $value;
    }
    public function getOrignal()
    {
        return $this->orignal;
    }
    public function setTranslated(?string $value = null)
    {
        if (base64_encode(base64_decode($value)) != $value && $value != null)
            throw new PageComponentsException('not valid value base64 string..');
        $this->translated = $value;
    }
    public function getTranslated()
    {
        return $this->translated;
    }
    public function generateMockedValues()
    {
        $faker = Container::getInstance()->make(Generator::class);
        $this->setOrignal(getBase64DefaultImage());
        $this->setTranslated(getBase64DefaultImage());

    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof ImageComponent
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
            'class' => ImageComponent::class,
            'original' => $this->orignal,
            'translated' => $this->translated,

        ];
    }
}
