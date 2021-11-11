<?php

namespace App\Filters;

class CategoryFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'with'
    ];

    public function with($withs)
    {
        return $this->builder->with($withs);
    }

}
