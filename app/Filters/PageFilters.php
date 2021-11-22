<?php

namespace App\Filters;

use App\Models\Book;

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
        'with',
        'book_title',
        'book_id'
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
    protected function book_title($title)
    {
        return $this->builder->whereHas('book', function ($query) use ($title) {
            return $query->where('title', 'LIKE', "%{$title}%");
        });
    }
    protected function book_id($book_id)
    {
        return $this->builder->where('book_id', $book_id);
    }
}
