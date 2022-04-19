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

    protected $casts = [
        'content_table' => Json::class
    ];

    public function pages()
    {
        // return $this->content_table;
        $pages_ids = [];
        foreach ($this->content_table as $element) {
            if ($element['type'] == 'section')
                array_push($pages_ids, $element['page_id']);
            else if ($element['type'] == 'chapter')
                foreach ($element['sections'] as $section)
                    array_push($pages_ids, $section['page_id']);
        }
        return Page::whereIn('id',$pages_ids)->excludeContent();
        // return $pages_ids;
    }

    public function scopeActivated($query, $bool = true)
    {
        return $query->where('activated', $bool);
    }
    public function scopeFilter($query, BookFilters $filters)
    {
        return $filters->apply($query);
    }

    public function getContentTableSection($indexes)
    {
        $pageIndexes =  explode("-", $indexes);
        // return  $this->content_table[2]['sections'][1];

        $section = null;
        foreach($pageIndexes as $index){
            $section = $section ? $section['sections'][$index] : $this->content_table[$index];
        }
        return $section ?? [];
    }

    
    public function getContentTableChapter($indexes)
    {
        $pageIndexes =  explode("-", $indexes);
        // return  $this->content_table[2]['sections'][1];

        $section = null;
        foreach($pageIndexes as $index){
            $section = $section ? $section['sections'][$index] : $this->content_table[$index];
        }
        return $section ?? [];
    }
}
