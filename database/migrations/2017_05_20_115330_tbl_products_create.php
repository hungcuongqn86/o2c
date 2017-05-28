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
            $table->bigInteger('contract_id')->nullable()->unsigned();
            $table->string('producttype_code', 20)->nullable();
            $table->string('name', 400)->nullable();
            $table->string('description', 500)->nullable();
            $table->bigInteger('count')->unsigned()->nullable();
            $table->string('dai', 20)->nullable();
            $table->string('rong', 20)->nullable();
            $table->string('cao', 20)->nullable();
            $table->longText('elements')->nullable();
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
