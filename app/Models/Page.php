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

    // protected $hidden = ['page_content'];

    public function scopeFilter($query, PageFilters $filters)
    {
        return $filters->apply($query);
    }


    public function scopeExcludeContent($query)
    {
        return $query->select(['id', 'title', 'created_at', 'updated_at']);
    }
}
