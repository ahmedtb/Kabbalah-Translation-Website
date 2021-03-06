<?php

namespace App\PageComponents;

use Countable;
use JsonSerializable;


class PageContent  implements JsonSerializable, Countable
{
    private ?array $pageComponents = [];
    private string $originalDir = 'ltr';
    private string $translatedDir = 'rtl';

    public static function fromArray(array $arrayForm)
    {
        return new self($arrayForm['pageComponents'], $arrayForm['originalDir'], $arrayForm['translatedDir']);
    }

    public function __construct(?array $pageComponents = null, string $originalDir, string $translatedDir)
    {
        if ($pageComponents)
            $this->setPageComponents($pageComponents);
        $this->setOriginalDir($originalDir);
        $this->setTranslatedDir($translatedDir);
    }
    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'pageComponents' => array_map(function ($pageComponent) {
                return $pageComponent->jsonSerialize();
            }, $this->getPageComponents()),
            'originalDir' => $this->originalDir,
            'translatedDir' => $this->translatedDir,

        );
    }

    public function setPageComponents($pageComponents)
    {
        foreach ($pageComponents as $pageComponent) {
            $this->setPageComponent($pageComponent);
        }
    }
    public function setOriginalDir(string $dir)
    {
        if ($dir != 'rtl' && $dir != 'ltr')
            throw new PageComponentsException('the text direction can be either rtl or ltr');
        $this->originalDir = $dir;
    }
    public function setTranslatedDir(string $dir)
    {
        if ($dir != 'rtl' && $dir != 'ltr')
            throw new PageComponentsException('the text direction can be either rtl or ltr');
        $this->translatedDir = $dir;
    }
    public function removePageComponent($index)
    {
        unset($this->pageComponent[$index]);
    }

    public function getPageComponents()
    {
        return $this->pageComponents;
    }

    public function setPageComponent($pageComponent, $index = null)
    {
        if ($index == null || count($this->pageComponents)  == 0) {
            if (gettype($pageComponent) == 'array') {
                $instance = $pageComponent['class']::fromArray($pageComponent);
                array_push($this->pageComponents, $instance);
            } elseif ($pageComponent instanceof PageComponent)
                array_push($this->pageComponents, $pageComponent);
            return $this;
        }

        if ($index >= count($this->pageComponents)) {
            throw new PageComponentsException('index is larger than the max index...pageComponents size is = ' . count($this->pageComponents));
        } else {
            $this->pageComponents[$index] = $pageComponent;
            return $this;
        }
    }

    public function getPageComponent($index)
    {
        return $this->pageComponents[$index];
    }


    public function count()
    {
        return count($this->pageComponents);
    }

    public function generateMockedValues()
    {
        foreach ($this->pageComponents as $pageComponent) {
            $pageComponent->generateMockedValues();
        }
    }

    public function isEqual(PageContent $PageContent)
    {
        foreach ($this->getPageComponents() as $index => $pageComponent) {
            if (!$pageComponent->isEqualTo($PageContent->getPageComponent($index)))
                return false;
        }
        return true;
    }

    public function isFullyTranslated()
    {
        foreach ($this->getPageComponents() as $index => $pageComponent) {
            if (!$pageComponent->isTranslated())
                return false;
        }
        return true;
    }
}
