<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('location');
            $table->string('zip_code');
            $table->string('origin');
            $table->string('destination');
            $table->string('cargo_type');
            $table->text('cargo_description');
            $table->string('weight');
            $table->string('dimensions');
            $table->date('ready_date');
            $table->text('special_requirements')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quotes');
    }
};
