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
        'category_id',
        'with',
        'latest',
        'title',
        'activated',
        'source_url'
    ];

    // public function search($search)
    // {
    //     return $this->builder->whereHas('page', function ($query) use ($search) {
    //         $query->where('title', 'LIKE', "%{$search}%");
    //     });
    // }
    public function category_id($category_id)
    {
        return $this->builder->where('category_id', $category_id);
    }
    public function with($withs)
    {
        return $this->builder->with($withs);
    }
    public function latest()
    {
        return $this->builder->latest();
    }
    protected function title($title)
    {
        return $this->builder->where('title', 'LIKE', "%{$title}%");
    }
    public function activated($activated)
    {
        return $this->builder->where('activated', $activated == 'true');
    }
    protected function source_url($source_url)
    {
        return $this->builder->where('source_url', 'LIKE', "%{$source_url}%");
    }
}
