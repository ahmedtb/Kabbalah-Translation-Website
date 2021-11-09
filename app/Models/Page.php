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


    public function scopeFilter($query, PageFilters $filters)
    {
        return $filters->apply($query);
    }

    protected $columns = ['id', 'title', 'description', 'page_content', 'activated', 'created_at', 'updated_at'];

    public function scopeExclude($query, $value = [])
    {
        return $query->select(array_diff($this->columns, (array) $value));
    }
}
