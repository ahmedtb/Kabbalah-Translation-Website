<?php

namespace App\PageComponents;


class SeperatorComponent extends PageComponent
{

    private array $style = [];

    public static function fromArray(array $array)
    {
        if ($array['class'] != SeperatorComponent::class)
            throw new PageComponentsException('the array class is not SeperatorComponent class, it is: ' . $array['class']);
        return new self($array['style']);
    }
    public function __construct(array $style = [])
    {
        $this->setstyle($style);
    }
    public function jsonSerialize()
    {
        return [
            'class' => SeperatorComponent::class,
            'style' => $this->style,
        ];
    }

    public function setstyle(array $value)
    {
        $this->style = $value;
    }
    public function getstyle()
    {
        return $this->style;
    }

    public function setOriginal(array $style)
    {
        $this->setstyle($style);
    }
    public function getOriginal()
    {
        return $this->style;
    }

    public function setTranslated(array $style)
    {
        $this->setstyle($style);
    }
    public function getTranslated()
    {
        return $this->style;
    }

    public function generateMockedValues()
    {

        $this->setstyle([]);
    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof SeperatorComponent
            && $this->style == $component->getstyle()
        ) {
            return true;
        } else {
            return false;
        }
    }
    public function isTranslated()
    {
        return true;
    }
}
