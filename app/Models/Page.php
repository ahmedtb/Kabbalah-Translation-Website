<?php

namespace App\Models;

use App\Casts\Json;
use App\Filters\PageFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use HasFactory;

    protected $casts = [
        'page_content' => Json::class
    ];

    protected $guarded = [];


    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function books()
    {
        return Book::whereJsonContains('table', ['page_id' => $this->id])->orWhereJsonContains('table', ['sections' => ['page_id' => $this->id]])->get();
    }

    public function scopeFilter($query, PageFilters $filters)
    {
        return $filters->apply($query);
    }


    public function scopeExcludeContent($query)
    {
        return $query->select(['id', 'title', 'created_at', 'updated_at']);
    }
}
