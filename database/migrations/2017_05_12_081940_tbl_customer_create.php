<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblCustomerCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('tbl_customers', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            $table->bigIncrements('id')->unsigned();
            $table->string('code', 20)->nullable();
            $table->string('type', 20)->nullable();
            $table->string('title', 20)->nullable();
            $table->string('name', 300)->nullable();
            $table->string('gender', 10)->nullable();
            $table->timestamp('birthday')->nullable();
            $table->string('phone_number1', 20)->nullable();
            $table->string('phone_number2', 20)->nullable();
            $table->string('email', 50)->nullable();
            $table->string('address', 300)->nullable();
            $table->string('note', 500)->nullable();
            $table->string('company_type', 20)->nullable();
            $table->string('company_fields', 20)->nullable();
            $table->string('company_code', 30)->nullable();
            $table->string('company_phone_number', 30)->nullable();
            $table->string('company_name', 300)->nullable();
            $table->string('company_email', 100)->nullable();
            $table->string('company_website', 100)->nullable();
            $table->string('group', 20)->nullable();
            $table->string('source', 20)->nullable();
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
        Schema::dropIfExists('tbl_customers');
    }
}
