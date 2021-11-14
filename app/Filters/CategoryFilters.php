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
        'with',
        'name'
    ];

    public function with($withs)
    {
        return $this->builder->with($withs);
    }
    public function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }
}
