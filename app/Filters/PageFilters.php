<?php

namespace App\Filters;

class PageFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'pageable_id',
    ];

    protected function pageable_id($pageable_id)
    {
        return $this->builder->where('pageable_id', $pageable_id);
    }
}
