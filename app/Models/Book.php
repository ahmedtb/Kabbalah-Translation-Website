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
        $merged = collect($this->bookChapters()->with('sections.page')->get());
        $this->sections()->with('page')->get()->each(function ($section) use ($merged) {
            $merged->push($section);
        });
        
        return $merged;
    }
    public function scopeFilter($query, BookFilters $filters)
    {
        return $filters->apply($query);
    }
}
