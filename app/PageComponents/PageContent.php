<?php
namespace App\PageComponents;

use Countable;
use JsonSerializable;


class PageContent  implements JsonSerializable, Countable
{
    private ?array $pageComponents = [];
    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['pageComponent']);
        return $instance;
    }

    public function __construct(?array $pageComponents = null)
    {
        if ($pageComponents)
            $this->setPageComponents($pageComponents);
    }

    public function setPageComponents($pageComponents)
    {
        foreach ($pageComponents as $PageComponent) {
            $this->setPageComponent($PageComponent);
        }
        // $this->pageComponent = $pageComponents;
        return $this;
    }

    public function removePageComponent($index)
    {
        unset($this->pageComponent[$index]);
    }

    public function getPageComponents()
    {
        return $this->pageComponent;
    }

    public function setPageComponent($PageComponent, $index = null)
    {
        if ($index == null || count($this->pageComponent)  == 0) {
            if (gettype($PageComponent) == 'array') {
                $instance = $PageComponent['class']::fromArray($PageComponent);
                array_push($this->pageComponent, $instance);
            } elseif ($PageComponent instanceof PageComponent)
                array_push($this->pageComponent, $PageComponent);
            return $this;
        }

        if ($index >= count($this->pageComponent)) {
            throw new PageComponentsException('index is larger than the max index...pageComponent size is = ' . count($this->pageComponent));
        } else {
            $this->pageComponent[$index] = $PageComponent;
            return $this;
        }
    }

    public function getPageComponent($index)
    {
        return $this->pageComponents[$index];
    }

    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'pageComponent' => array_map(function ($PageComponent) {
                return $PageComponent->jsonSerialize();
            }, $this->getPageComponents()),
        );
    }

    public function count()
    {
        return count($this->pageComponent);
    }

    public function generateMockedValues()
    {
        foreach ($this->pageComponent as $PageComponent) {
            $PageComponent->generateMockedValue();
        }
    }

    public function isEqual(PageContent $PageContent)
    {
        // dd($this);
        foreach ($this->getPageComponents() as $index => $PageComponent) {
            $PageComponent->isEqualTo($PageContent->getPageComponents()[$index]);
        }
    }
}