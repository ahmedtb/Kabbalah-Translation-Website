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
    private Collection $originalRows; // collection of arrays

    public array $translatedColumnsTitles;
    private Collection $translatedRows; // collection of arrays

    public static function fromArray(array $arrayForm)
    {
        $instance = new self( $arrayForm['originalColumnsTitles'], count($arrayForm['value']));
        $instance->setValue($arrayForm['value']);
        return $instance;
    }

    public function __construct( array $originalColumnsTitles, int $numberOfRows)
    {
        
        $this->setTitles($originalColumnsTitles);

        if ($numberOfRows <= 0)
            throw new Exception('invalid number of originalRows');
        $this->numberOfRows = $numberOfRows;

        $numberOfCols = count($originalColumnsTitles);

        $this->initiateEmptyRows($numberOfCols, $numberOfRows);
    }
    
    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'originalColumnsTitles' => $this->originalColumnsTitles,
            'originalRows' => $this->originalRows->all(),
            'translatedColumnsTitles' => $this->translatedColumnsTitles,
            'translatedRows' => $this->translatedRows->all(),
            'numberOfRows' =>  $this->numberOfRows,
        );
    }

    public function setTitles(array $titles)
    {
        foreach ($titles as $title) {
            if (gettype($title) != 'string') {
                throw new Exception('titles should be string type');
            }
        }
        $this->originalColumnsTitles = $titles;
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

    public function setElement(string $value, int $col, int $row)
    {
        if ($col >= count($this->originalColumnsTitles) || $row >= $this->numberOfRows) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        $rowValue = $this->originalRows->get($row);
        $rowValue[$col] = $value;
        // dd($this->originalRows);
        $this->setRow($rowValue, $row);
    }

    public function getElement(int $col, int $row)
    {
        if ($col >= count($this->originalColumnsTitles) || $row >= $this->numberOfRows) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        $rowValue = $this->originalRows->get($row);
        return $rowValue[$col];
    }

    public function getRow($index)
    {
        return $this->originalRows->get($index);
    }

    public function setRow(array $value, $index)
    {
        if ($index >= $this->numberOfRows || $index < 0) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        if (count($value) != count($this->originalColumnsTitles))
            throw new Exception(count($value) . ' is incorrect row size...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);

        $this->originalRows = $this->originalRows->replace([$index => $value]);
    }

    public function setColumn(array $value, $colIndex)
    {
        if ($colIndex >= count($this->originalColumnsTitles) || $colIndex < 0) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        if (count($value) !=  $this->numberOfRows) {
            throw new Exception('array size does not match titles size...size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
        foreach ($this->originalRows as $rowIndex => $row) {
            $this->setElement($value[$rowIndex], $colIndex, $rowIndex);
        }
    }

    public function getColumn($colIndex)
    {
        $column = [];
        foreach ($this->originalRows as $rowIndex => $row) {
            $colElement = $this->getElement($colIndex, $rowIndex);
            array_push($column, $colElement);
        }
        return $column;
    }


    public function setValue($value)
    {
        if (gettype($value) == 'array') {
            foreach ($value as $rowIndex => $row) {
                $this->setRow($row, $rowIndex);
            }
        } else {
            throw new Exception('the value should be a 2 d array...with size = ' . count($this->originalColumnsTitles) . 'X' . $this->numberOfRows);
        }
    }

    public function getValue()
    {
        return $this->originalRows->all();
    }


    public function generateMockedValues()
    {
        $testRowData = [];
        for ($i = 0; $i < count($this->originalColumnsTitles); $i++)
            array_push($testRowData, Str::random(5));

        for ($i = 0; $i < $this->numberOfRows; $i++)
            $this->setRow($testRowData,$i);
    }

}