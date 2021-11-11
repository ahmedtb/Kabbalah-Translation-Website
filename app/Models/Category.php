<?php

namespace App\Models;

use App\Filters\CategoryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function scopeFilter($query, CategoryFilters $filters)
    {
        return $filters->apply($query);
    }
}
