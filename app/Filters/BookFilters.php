<?php

namespace App\Filters;

class BookFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'title'
    ];
    protected function title($title)
    {
        return $this->builder->where('title', 'LIKE', "%{$title}%");
    }

}
