<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pages()
    {
        return $this->morphMany(Page::class, 'pageable');
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
}
