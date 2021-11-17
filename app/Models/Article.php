<?php

namespace App\Models;

use App\Casts\Json;
use App\Filters\ArticlesFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'page_content' => Json::class
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeFilter($query, ArticlesFilters $filters)
    {
        return $filters->apply($query);
    }

    public function scopeActivated($query)
    {
        return $query->where('activated', true);
    }
}
