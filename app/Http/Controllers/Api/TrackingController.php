<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tracking;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function show($trackingNumber)
    {
        $tracking = Tracking::with('statuses')
            ->where('tracking_number', $trackingNumber)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'tracking_number' => $tracking->tracking_number,
                'origin' => $tracking->origin,
                'destination' => $tracking->destination,
                'current_status' => $tracking->current_status,
                'estimated_arrival' => $tracking->estimated_arrival,
                'history' => $tracking->statuses->map(function ($status) {
                    return [
                        'status' => $status->status,
                        'location' => $status->location,
                        'timestamp' => $status->created_at->toDateTimeString(),
                        'description' => $status->description
                    ];
                })
            ]
        ]);
    }

    public function trackMultiple(Request $request)
    {
        $request->validate([
            'tracking_numbers' => 'required|array',
            'tracking_numbers.*' => 'string|max:20'
        ]);

        $trackings = Tracking::whereIn('tracking_number', $request->tracking_numbers)
            ->get(['tracking_number', 'current_status', 'estimated_arrival']);

        return response()->json(['data' => $trackings]);
    }
}
