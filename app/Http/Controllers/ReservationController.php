<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class ReservationController extends Controller
{
    /**
     * Display a listing of the reservations for the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $userId = $request->header('X-user-ID');
        $userId = intval($userId);

        $reservations = Reservation::where('user_id', $userId)->get();

        return response()->json($reservations);
    }

    /**
    * Store a newly created reservation in the database.
    *
    * @param Request $request
    * @return JsonResponse
    */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'            => 'required',
            'origin_planet'      => 'required',
            'destination_planet' => 'required',
            'price'              => 'required',
            'travel_duration'    => 'required',
            'flight_start_time'   => 'required',
            'flight_arrival_time' => 'required',
            'company_name'       => 'required',
            'pricelist_id'       => 'required',
        ]);

        $reservation = Reservation::create([
            'user_id'            => $validated['user_id'],
            'origin_planet'      => $validated['origin_planet'],
            'destination_planet' => $validated['destination_planet'],
            'price'              => $validated['price'],
            'travel_duration'    => $validated['travel_duration'],
            'flight_start_time'   => $validated['flight_start_time'],
            'flight_arrival_time' => $validated['flight_arrival_time'],
            'company_name'       => $validated['company_name'],
            'pricelist_id'       => $validated['pricelist_id'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reservation created successfully!',
            'reservation' => $reservation,
        ], 201);
    }
}
