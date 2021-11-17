<?php

namespace Tests\Feature\Structure;

use App\PageComponents\TableComponent;
use Tests\TestCase;

use Illuminate\Foundation\Testing\RefreshDatabase;

class PageComponentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_table_component()
    {
        $tableComponent = new TableComponent(['ahmed', 'tabella'], [['qqq', 'eee'], ['aaa', 'ccc']]);
        dd($tableComponent);
    }
}
