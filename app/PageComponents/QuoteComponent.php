<?php

namespace App\PageComponents;

use Faker\Generator;
use Illuminate\Container\Container;

class QuoteComponent extends PageComponent
{

    private string $originalQuote;
    private ?string $originalLabel = null;
    private ?string $translatedQuote = null;
    private ?string $translatedLabel = null;

    private array $style = [];

    public static function fromArray(array $array)
    {
        if ($array['class'] != QuoteComponent::class)
            throw new PageComponentsException('the array class is not QuoteComponent class, it is: ' . $array['class']);
        $style = array_key_exists('style', $array) ? $array['style'] : [];

        return new self($array['originalQuote'], $array['originalLabel'], $array['translatedQuote'], $array['translatedLabel'], $style);
    }
    public function __construct(string $originalQuote, ?string $originalLabel = null, ?string $translatedQuote = null, ?string $translatedLabel = null, array $style = [])
    {
        // $this->setOriginal($original);
        // $this->setTranslated($translated);
        // $this->setStyle($style);
        $this->originalQuote = $originalQuote;
        $this->originalLabel = $originalLabel;
        $this->translatedQuote = $translatedQuote;
        $this->translatedLabel = $translatedLabel;
        $this->style = $style;

    }

    public function jsonSerialize()
    {
        return [
            'class' => QuoteComponent::class,
            'originalQuote' => $this->originalQuote,
            'originalLabel' => $this->originalLabel,
            'translatedQuote' => $this->translatedQuote,
            'translatedLabel' => $this->translatedLabel,
            'style' => $this->style,

        ];
    }
    public function getOriginal()
    {
        return [
            'originalQuote' => $this->originalQuote,
            'originalLabel' => $this->originalLabel,
        ];
    }

    public function getTranslated()
    {
        return [
            'translatedQuote' => $this->translatedQuote,
            'translatedLabel' => $this->translatedLabel,
        ];
    }


    public function generateMockedValues()
    {
        $faker = Container::getInstance()->make(Generator::class);
        $this->originalQuote = $faker->text();
        $this->originalLabel = $faker->sentence();
        $this->translatedQuote = $faker->text();
        $this->translatedLabel = $faker->sentence();
    }
    public function isEqualTo(PageComponent $component)
    {
        if (
            $component instanceof QuoteComponent
            && $this->getOriginal() == $component->getOriginal()
            && $this->getTranslated() == $component->getTranslated()
        ) {
            return true;
        } else {
            return false;
        }
    }

    public function isTranslated()
    {
        return $this->translatedQuote != null || strlen($this->translatedQuote);
    }
}
