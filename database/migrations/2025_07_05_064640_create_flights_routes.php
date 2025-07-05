<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('flight_routes', function (Blueprint $table) {
            $table->id();
            $table->string('origin_city');
            $table->string('origin_code', 3);
            $table->string('destination_city');
            $table->string('destination_code', 3);
            $table->string('duration');
            $table->boolean('active')->default(true);
            $table->string('departure_time');
            $table->string('arrival_time');
            $table->timestamps();
        });

        Schema::create('route_stops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained('flight_routes')->cascadeOnDelete();
            $table->string('location');
            $table->string('code', 3);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('route_stops');
        Schema::dropIfExists('flight_routes');
    }
};
