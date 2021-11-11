<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('index');
            $table->string('title');
            $table->text('description')->nullable();
            $table->morphs('sectionable');
            $table->foreignId('page_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_sections');
    }
}
