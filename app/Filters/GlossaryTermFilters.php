<?php

namespace App\Filters;

class GlossaryTermFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'with',
        'term'
    ];

    public function with($withs)
    {
        return $this->builder->with($withs);
    }
    public function term($term)
    {
        return $this->builder->where('term', 'LIKE', "%{$term}%");
    }
}
