<?php

namespace App\PageComponents;

use Exception;
use Faker\Generator;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Container\Container;
use App\PageComponents\PageComponent;

class TableComponent extends PageComponent
{

    public array $originalColumnsTitles;
    public Collection $originalRows; // collection of arrays

    public ?array $translatedColumnsTitles;
    public ?Collection $translatedRows; // collection of arrays

    public static function fromArray(array $arrayForm)
    {
        return new self(
            $arrayForm['originalColumnsTitles'],
            $arrayForm['originalRows'],
            $arrayForm['translatedColumnsTitles'],
            $arrayForm['translatedRows']
        );
    }

    public function __construct(array $originalColumnsTitles, array $originalRows, ?array $translatedColumnsTitles = null, ?array $translatedRows = null)
    {

        $this->setOriginalTitles($originalColumnsTitles);

        $numberOfCols = count($originalColumnsTitles);

        $this->originalRows = collect($originalRows);
        
        $this->translatedColumnsTitles = $translatedColumnsTitles;
        $this->translatedRows = collect($translatedRows);


        // $this->initiateEmptyRows($numberOfCols, $numberOfRows);
        // $this->setOriginalRows($originalRows);
    }

    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'originalColumnsTitles' => $this->originalColumnsTitles,
            'originalRows' => $this->originalRows->all(),
            'translatedColumnsTitles' => $this->translatedColumnsTitles,
            'translatedRows' => $this->translatedRows->all(),
        );
    }
    public function initiateEmptyRows(int $numberOfCols, int $numberOfRows)
    {
        $emptyRow = [];
        for ($i = 0; $i < $numberOfCols; $i++)
            array_push($emptyRow, '');

        $this->originalRows = collect([]);


        for ($i = 0; $i < $numberOfRows; $i++)
            $this->originalRows->push($emptyRow);
    }

    public function setOriginalTitles(array $titles)
    {
        $this->originalColumnsTitles = $titles;
    }

    public function getOriginal()
    {
        return [
            'titles' => $this->originalColumnsTitles,
            'rows' => $this->getOriginalRows()
        ];
    }

    public function getTranslated()
    {
        return [
            'titles' => $this->translatedColumnsTitles,
            'rows' => $this->getTranslatedRows()
        ];
    }
    public function setOriginalElement(string $value, int $col, int $row)
    {
        if ($col >= count($this->originalColumnsTitles) || $row >= count($this->originalRows->all())) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . count($this->originalRows->all()) );
        }
        $rowValue = $this->originalRows->get($row);
        $rowValue[$col] = $value;
        // dd($this->originalRows);
        $this->setOriginalRow($rowValue, $row);
    }

    public function getOriginalElement(int $col, int $row)
    {
        if ($col >= count($this->originalColumnsTitles) || $row >= $this->numberOfRows) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        $rowValue = $this->originalRows->get($row);
        return $rowValue[$col];
    }

    public function getOriginalRow($index)
    {
        return $this->originalRows->get($index);
    }

    public function setOriginalRow(array $value, $index)
    {
        if ($index >= count($this->originalRows->all()) || $index < 0) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . count($this->originalRows->all()));
        }
        if (count($value) != count($this->originalColumnsTitles))
            throw new Exception(count($value) . ' is incorrect row width...width = ' . count($this->originalColumnsTitles) . 'X' . count($this->originalRows->all()));

        $this->originalRows = $this->originalRows->replace([$index => $value]);
    }

    public function setOriginalColumn(array $value, $colIndex)
    {
        if ($colIndex >= count($this->originalColumnsTitles) || $colIndex < 0) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        if (count($value) !=  $this->numberOfRows) {
            throw new Exception('array size does not match titles size...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        foreach ($this->originalRows as $rowIndex => $row) {
            $this->setOriginalElement($value[$rowIndex], $colIndex, $rowIndex);
        }
    }

    public function getOriginalColumn($colIndex)
    {
        $column = [];
        foreach ($this->originalRows as $rowIndex => $row) {
            $colElement = $this->getOriginalElement($colIndex, $rowIndex);
            array_push($column, $colElement);
        }
        return $column;
    }


    public function setOriginalRows($value)
    {
        if (gettype($value) == 'array') {
            foreach ($value as $rowIndex => $row) {
                $this->setOriginalRow($row, $rowIndex);
            }
        } else {
            throw new Exception('the value should be a 2 d array...with number of titles = ' . count($this->originalColumnsTitles));
        }
    }

    public function getOriginalRows()
    {
        return $this->originalRows->all();
    }

    public function getTranslatedRows()
    {
        return $this->translatedRows->all();
    }

    public function isEqualTo(PageComponent $component)
    {
        if (!$component instanceof TableComponent)
            return false;
        else if ($component->getOriginal() != $this->getOriginal())
            return false;
        else
            return true;
    }

    public function generateMockedValues()
    {
        $testRowData = [];
        for ($i = 0; $i < count($this->originalColumnsTitles); $i++)
            array_push($testRowData, Str::random(5));

        for ($i = 0; $i < $this->numberOfRows; $i++)
            $this->setOriginalRow($testRowData, $i);
    }
}
