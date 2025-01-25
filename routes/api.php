<?php

use App\Http\Controllers\TravelPricesController;

Route::get('/travel-prices', [TravelPricesController::class, 'index']);