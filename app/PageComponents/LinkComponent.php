<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class LinkComponent extends PageComponent
{

    private string $originalLink;
    private ?string $translatedLink = null;
    private ?string $originalLabel = null;
    private ?string $translatedLabel = null;

    public static function fromArray(array $array)
    {
        if($array['class'] != LinkComponent::class)
            throw new PageComponentsException('the array class is not LinkComponent class, it is: ' . $array['class']);

        return new self($array['originalLink'], $array['originalLabel'], $array['translatedLink'], $array['translatedLabel']);
    }
    public function __construct(string $originalLink,  ?string $originalLabel = null, ?string $translatedLink = null,  ?string $translatedLabel = null)
    {
        $this->originalLink = $originalLink;
        $this->originalLabel = $originalLabel;
        $this->translatedLink = $translatedLink;
        $this->translatedLabel = $translatedLabel;
    }

    public function getoriginal()
    {
        return [
            'link' => $this->originalLink,
            'label' => $this->originalLabel, 
        ];
    }

    public function getTranslated()
    {
        return [
            'link' => $this->translatedLink,
            'label' => $this->translatedLabel, 
        ];
    }

    public function jsonSerialize()
    {
        return [
            'class' => LinkComponent::class,
            'originalLink' => $this->originalLink,
            'originalLabel' => $this->originalLabel,
            'translatedLink' => $this->translatedLink,
            'translatedLabel' => $this->translatedLabel,

        ];
    }

   
    public function generateMockedValues()
    {
        $faker = Container::getInstance()->make(Generator::class);
        
        $this->originalLink = $faker->url();
        $this->originalLabel = $faker->text();
        $this->translatedLink = $faker->url();
        $this->translatedLabel = $faker->text();

    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof LinkComponent
            && $this->originalLink == $component->getoriginal()['link']
            && $this->originalLabel == $component->getoriginal()['label']
            && $this->translatedLink == $component->getTranslated()['link']
            && $this->translatedLabel == $component->getTranslated()['label']

        ) {
            return true;
        } else {
            return false;
        }
    }

    
    public function isTranslated()
    {
        return $this->translatedLabel != null || strlen($this->translatedLabel);
    }
}
