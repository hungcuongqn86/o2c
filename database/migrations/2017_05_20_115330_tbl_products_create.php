<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblProductsCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('tbl_products', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            $table->bigIncrements('id')->unsigned();
            $table->string('producttype_code', 20)->nullable();
            $table->bigInteger('count')->unsigned()->nullable();
            $table->string('long', 20)->nullable();
            $table->string('large', 20)->nullable();
            $table->string('high', 20)->nullable();
            $table->string('cover_color', 20)->nullable();
            $table->string('inside_color', 20)->nullable();
            $table->string('cover_paper_type', 20)->nullable();
            $table->string('inside_paper_type', 20)->nullable();
            $table->string('standard', 20)->nullable();
            $table->bigInteger('number_page')->unsigned()->nullable();
            $table->tinyInteger('hardcover')->unsigned()->nullable()->default(0);
            $table->string('number_page_annex', 20)->nullable();
            $table->string('inside_color_annex', 20)->nullable();
            $table->string('inside_paper_type_annex', 20)->nullable();
            $table->string('sheet_hung', 20)->nullable();
            $table->string('outsource_type', 200)->nullable();
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
        //
        Schema::dropIfExists('tbl_products');
    }
}
