<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('origin_planet');
            $table->string('destination_planet');
            $table->decimal('price', 10, 2);
            $table->integer('travel_duration');
            $table->timestamp('flight_start_time');
            $table->timestamp('flight_arrival_time');
            $table->string('company_name');
            $table->string('pricelist_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
