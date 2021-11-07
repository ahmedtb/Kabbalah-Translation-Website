<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
