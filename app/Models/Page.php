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

    public function pageable()
    {
        return $this->morphTo();
    }

    public function scopeFilter($query, PageFilters $filters)
    {
        return $filters->apply($query);
    }
}
