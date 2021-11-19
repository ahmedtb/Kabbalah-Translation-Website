<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class ImageComponent extends PageComponent
{

    private string $original;
    private ?string $originalLabel = null;

    private ?string $translated = null;
    private ?string $translatedLabel = null;

    public static function fromArray(array $array)
    {
        if($array['class'] != ImageComponent::class)
            throw new PageComponentsException('the array class is not ImageComponent class, it is: ' . $array['class']);
        return new self($array['original'], $array['translated']);
    }
    public function __construct(string $original, ?string $translated = null)
    {
        $this->setoriginal($original);
        $this->setTranslated($translated);
    }
    
    public function jsonSerialize()
    {
        return [
            'class' => ImageComponent::class,
            'original' => $this->original,
            'translated' => $this->translated,

        ];
    }
    
    public function setoriginal(string $value)
    {
        if (!isValidBase64($value))
            throw new PageComponentsException('not valid value base64 string..');
        $this->original = $value;
    }
    public function getoriginal()
    {
        return $this->original;
    }
    public function setTranslated(?string $value = null)
    {
        if (!isValidBase64($value) && $value != null)
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
        $this->setoriginal(getBase64DefaultImage());
        $this->setTranslated(getBase64DefaultImage());

    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof ImageComponent
            && $this->original == $component->getoriginal()
            && $this->translated == $component->getTranslated()
        ) {
            return true;
        } else {
            return false;
        }
    }

}
