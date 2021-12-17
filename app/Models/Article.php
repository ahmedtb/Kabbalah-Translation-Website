<?php

namespace App\Models;

use App\Casts\Json;
use App\Filters\ArticlesFilters;
use App\Casts\CastJsonToPageContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = ['page_content'];

    protected $casts = [
        'page_content' => CastJsonToPageContent::class
    ];
    protected $appends  = [
        'isTranslated'
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
    public function getIsTranslatedAttribute()
    {
        return $this->isTranslated();
    }

    public function isTranslated()
    {
        return $this->page_content->isFullyTranslated();
    }
}
