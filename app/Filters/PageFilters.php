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
        'exclude'
    ];
    protected function exclude($exclude)
    {
        return $this->builder->exclude( $exclude);
    }
}
