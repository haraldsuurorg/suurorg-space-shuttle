<?php

use App\Http\Controllers\TravelPricesController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;

Route::get('/travel-prices', [TravelPricesController::class, 'index']);

Route::get('/travel-routes', function () {
    return config('travel_routes');
});

Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations', [ReservationController::class, 'index']);