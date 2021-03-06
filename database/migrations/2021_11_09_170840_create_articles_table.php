<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->boolean('activated')->default(false);
            // $table->foreignId('page_id');
            $table->foreignId('category_id');
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->text('about')->nullable();
            $table->string('source_url')->nullable()->unique();
            $table->mediumText('thumbnail')->nullable();
            $table->longText('page_content');
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
        Schema::dropIfExists('articles');
    }
}
