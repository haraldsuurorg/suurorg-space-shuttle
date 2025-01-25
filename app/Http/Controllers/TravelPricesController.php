<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Services\TravelPriceService;
use Illuminate\Http\JsonResponse;

class TravelPricesController extends Controller
{
    /**
     * Display a listing of travel prices
     *
     * @param TravelPriceService $service
     * @return JsonResponse
     */
    public function index(TravelPriceService $service): JsonResponse
    {
        $data = $service->fetchTravelPrices();

        if ($data === null) {
            return response()->json(['error' => 'Failed to fetch travel prices from external API.'], 500);
        }

        return response()->json($data);
    }
}