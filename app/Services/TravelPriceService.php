<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TravelPriceService
{
    /**
     * Fetches travel prices from the external API.
     *
     * @return array|null Returns the JSON decoded response as an array on success, null on failure.
     */
    public function fetchTravelPrices()
    {
        $apiUrl = 'https://cosmosodyssey.azurewebsites.net/api/v1.0/TravelPrices';

        try {
            $response = Http::get($apiUrl);

            if ($response->successful()) {
                return $response->json();
            } else {
                Log::error('Failed to fetch travel prices from API. Status code: ' . $response->status());
                Log::error('API Response body: ' . $response->body());
                return null;
            }
        } catch (\Exception $e) {
            Log::error('Error fetching travel prices from API:' . $e->getMessage());
            return null;
        }
    }
}