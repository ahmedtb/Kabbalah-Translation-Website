<?php
namespace App\PageComponents;

use JsonSerializable;

abstract class PageComponent  implements JsonSerializable
{

    public function getName()
    {
        return array_pop(explode('\\', get_class($this)));
    }

    abstract public static function fromArray(array $array);
    // abstract public function setOrignal($value);
    abstract public function getOrignal();
    // abstract public function setTranslated($value);
    abstract public function getTranslated();
    abstract public function generateMockedValues();
    abstract public function isEqualTo(PageComponent $component);
}