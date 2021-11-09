<?php

namespace App\Models;

use App\Filters\BookFilters;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function sections()
    {
        return $this->morphMany(BookSection::class, 'sectionable');
    }

    public function bookChapters()
    {
        return $this->hasMany(BookChapter::class);
    }

    public function contentTable()
    {
        // $pages = $this->pages;
        // $bookChapters = $this->bookChapters;
        // $contentTable = $pages->merge($bookChapters);

        $merged = collect($this->bookChapters->all());
        $this->pages->each(function ($page) use ($merged) {
            $merged->push($page);
        });
        return $merged;
        // dd($contentTable);
        // return $contentTable;
    }
    public function scopeFilter($query, BookFilters $filters)
    {
        return $filters->apply($query);
    }
}
