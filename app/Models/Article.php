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

    protected $hidden = ['page_content', 'thumbnail'];

    protected $casts = [
        'page_content' => CastJsonToPageContent::class
    ];
    protected $appends  = [
        'isTranslated', 'hasThumbnail'

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


    public function thumbnail()
    {

        if ($this->thumbnail) {
            $extension = explode('/', explode(";", $this->thumbnail)[0])[1];

            $raw_image_string = base64_decode(explode("base64,", $this->thumbnail)[1]);
            return response($raw_image_string)->header('Content-Type', 'thumbnail/' . $extension);
        }
        return null;
    }

    public function getHasThumbnailAttribute()
    {
        return $this->thumbnail ? true : false;
    }
}
