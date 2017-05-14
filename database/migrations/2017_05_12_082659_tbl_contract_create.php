<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblContractCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('tbl_contracts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            $table->bigIncrements('id')->unsigned();
            $table->string('code', 20)->nullable();
            $table->timestamp('signdate')->nullable();
            $table->bigInteger('customer_id')->nullable()->unsigned();
            $table->string('content', 500)->nullable();
            $table->string('value', 15)->nullable();
            $table->timestamp('durationdate')->nullable();

            $table->string('product_name', 500)->nullable();
            $table->integer('number')->nullable();
            $table->string('unit', 20)->nullable();
            $table->string('standard', 20)->nullable();
            $table->string('outsourcing', 20)->nullable();
            $table->string('packing', 20)->nullable();
            $table->timestamp('success_date')->nullable();
            $table->string('note', 500)->nullable();
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
        Schema::dropIfExists('tbl_contracts');
    }
}
