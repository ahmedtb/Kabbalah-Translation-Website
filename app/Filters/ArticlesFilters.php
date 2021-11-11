<?php

namespace App\Filters;

class ArticlesFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'search',
        'category_id'
    ];

    public function search($search)
    {
        return $this->builder->whereHas('page', function ($query) use ($search) {
            $query->where('title', 'LIKE', "%{$search}%");
        });
    }
    public function category_id($category_id)
    {
        return $this->builder->where('category_id', $category_id);
    }
}
