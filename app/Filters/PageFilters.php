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
        'book_title'
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
        return $this->builder->whereHas('bookSections', function ($query) use ($title) {
            return $query->whereHas('sectionable', function ($query) use ($title) {
                return $query->where('title', 'LIKE', "%{$title}%");
            });
        });
        // return $this->builder->whereHas('bookSections', function ($query) use ($id) {
        //     return $query->where('sectionable_type', Book::class, function ($query) use ($id) {
        //         $query->where('sectionable_id', $id);
        //     });
        // });
    }
}
