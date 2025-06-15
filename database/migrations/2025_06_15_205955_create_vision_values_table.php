<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.s
     */
    public function up(): void
    {
        Schema::create('company_values', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['mission', 'vision', 'value']);
            $table->string('title')->nullable();
            $table->text('content');
            $table->string('icon')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_values');
    }
};
