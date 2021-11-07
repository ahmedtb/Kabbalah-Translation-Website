<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChapterSection extends Model
{
    use HasFactory;
    protected $casts = [
        'page_content' => Json::class
    ];

    protected $guarded = [];
}
