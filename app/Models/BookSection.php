<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookSection extends Model
{
    use HasFactory;

    protected $fillable = [
       'index', 'title','sectionable_type','sectionable_id','page_id'
    ];
    
    public function sectionable()
    {
        return $this->morphTo();
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
