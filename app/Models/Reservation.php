<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'origin_planet',
        'destination_planet',
        'price',
        'travel_duration',
        'flight_start_time',
        'flight_arrival_time',
        'company_name',
        'pricelist_id',
    ];
}
