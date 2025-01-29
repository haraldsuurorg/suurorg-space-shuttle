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
        $latestPriceList = $service->getLatestPricelistFromDatabase();

        if (!$latestPriceList) {
            return response()->json(['error' => 'No pricelists found in the database'], 404);
        }

        $routeData = json_decode($latestPriceList->data, true);

        if (!is_array($routeData)) {
            return response()->json(['error' => 'Failed to decode pricelist data from database'], 500);
        }

        return response()->json($routeData);
    }
}