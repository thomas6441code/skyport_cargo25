<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('flight_routes', function (Blueprint $table) {
            $table->time('departure_time')->nullable()->change();
            $table->time('arrival_time')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('flight_routes', function (Blueprint $table) {
            $table->time('departure_time')->nullable(false)->change();
            $table->time('arrival_time')->nullable(false)->change();
        });
    }
};
