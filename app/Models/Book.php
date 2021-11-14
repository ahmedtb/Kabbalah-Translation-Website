<?php

namespace App\Models;

use App\Casts\Json;
use App\Filters\BookFilters;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $casts =[
        'table' => Json::class
    ];


    public function scopeActivated($query, $bool = true)
    {
        return $query->where('activated',$bool);
    }
    public function scopeFilter($query, BookFilters $filters)
    {
        return $filters->apply($query);
    }
}
