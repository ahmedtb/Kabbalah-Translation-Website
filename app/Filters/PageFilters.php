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
        'withoutContent',
        'title',
        'with'
    ];
    protected function withoutContent()
    {
        return $this->builder->excludeContent();
    }
    protected function title($title)
    {
        return $this->builder->where('title', 'LIKE', "%{$title}%");
    }
    protected function with($with)
    {
        return $this->builder->with($with);
    }
}
