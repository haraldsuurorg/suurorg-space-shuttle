<?php

use App\Http\Controllers\TravelPricesController;

Route::get('/travel-prices', [TravelPricesController::class, 'index']);
Route::get('/travel-routes', function () {
    return config('travel_routes');
});