<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblProducttypeCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('tbl_producttypes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            $table->bigIncrements('id')->unsigned();
            $table->string('code', 20)->nullable();
            $table->string('name', 200)->nullable();
            $table->string('size_config', 50)->nullable();
            $table->string('color_config', 50)->nullable();
            $table->string('paper_type_config', 50)->nullable();
            $table->tinyInteger('number_page')->unsigned()->nullable()->default(0);
            $table->tinyInteger('hardcover')->unsigned()->nullable()->default(0);
            $table->tinyInteger('annex')->unsigned()->nullable()->default(0);
            $table->tinyInteger('sheet_hung')->unsigned()->nullable()->default(0);
            $table->string('outsource_type_config', 200)->nullable();
            $table->tinyInteger('enabled')->unsigned()->nullable()->default(0);
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
        Schema::dropIfExists('tbl_producttypes');
    }
}
