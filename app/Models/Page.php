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

    protected $appends  = ['books'];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function getBooksAttribute(){
        return $this->books()->select(['id','title'])->get();
    }

    public function books()
    {
        return Book::whereJsonContains('content_table', ['page_id' => (string)$this->id])
        ->orWhereJsonContains('content_table', ['sections' => ['page_id' => (string)$this->id]]);
    }

    public function scopeFilter($query, PageFilters $filters)
    {
        return $filters->apply($query);
    }


    public function scopeExcludeContent($query)
    {
        return $query->select(['id', 'title', 'meta_description', 'source_url', 'created_at', 'updated_at']);
    }
}
