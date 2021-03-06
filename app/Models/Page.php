<?php

namespace App\Models;

use App\Filters\PageFilters;
use App\Casts\CastJsonToPageContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use HasFactory;

    protected $casts = [
        'page_content' => CastJsonToPageContent::class
    ];

    protected $guarded = [];
    protected $hidden = ['page_content'];

    protected $appends  = [
        // 'books',
        'isTranslated'
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    // public function getBooksAttribute()
    // {
    //     return $this->books()->select(['id', 'title'])->get();
    // }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    // public function books()
    // {
    //     return Book::whereJsonContains('content_table', ['page_id' => (string)$this->id])
    //         ->orWhereJsonContains('content_table', ['sections' => ['page_id' => (string)$this->id]]);
    // }

    public function scopeFilter($query, PageFilters $filters)
    {
        return $filters->apply($query);
    }


    public function scopeExcludeContent($query)
    {
        return $query->select(['id', 'title', 'about', 'source_url', 'created_at', 'updated_at']);
    }

    public function getIsTranslatedAttribute()
    {
        return $this->isTranslated();
    }

    public function isTranslated()
    {
        return $this->page_content->isFullyTranslated();
    }
}
