<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FlightRoute;
use Illuminate\Http\Request;
use Inertia\Inertia;


class FlightRouteController extends Controller
{
   public function index()
    {
        $routes = FlightRoute::with('stops')->get();

        return Inertia::render('admin/FlightRoutes/Index', [
            'routes' => $routes,
            'status' => session('status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/FlightRoutes/Create');
    } 


    public function store(Request $request)
    {
        $validated = $request->validate([
            'origin_city' => 'required|string',
            'origin_code' => 'required|string|size:3',
            'destination_city' => 'required|string',
            'destination_code' => 'required|string|size:3',
            'duration' => 'required|string',
            'active' => 'boolean',
            'departure_time' => 'nullable|string',
            'arrival_time' => 'nullable|string',
            'stops' => 'sometimes|array',
            'stops.*.location' => 'required|string',
            'stops.*.code' => 'required|string|size:3',
        ]);

        $route = FlightRoute::create($validated);

        if (isset($validated['stops'])) {
            foreach ($validated['stops'] as $index => $stop) {
                $route->stops()->create([
                    'location' => $stop['location'],
                    'code' => $stop['code'],
                    'order' => $index
                ]);
            }
        }

        return redirect()->route('admin.flight-routes.index')->with('success', 'Route created successfully');

    }


    public function edit(FlightRoute $flightRoute)
    {
        return Inertia::render('admin/FlightRoutes/Edit', [
            'route' => $flightRoute->load('stops'),
        ]);
    }

    public function show(FlightRoute $flightRoute)
    {
        return response()->json($flightRoute->load('stops'));
    }

    public function update(Request $request, FlightRoute $flightRoute)
    {
        $validated = $request->validate([
            'origin_city' => 'sometimes|string',
            'origin_code' => 'sometimes|string|size:3',
            'destination_city' => 'sometimes|string',
            'destination_code' => 'sometimes|string|size:3',
            'duration' => 'sometimes|string',
            'active' => 'sometimes|boolean',
            'departure_time' => 'nullable|sometimes|string',
            'arrival_time' => 'nullable|sometimes|string',
            'stops' => 'sometimes|array',
            'stops.*.id' => 'sometimes|integer',
            'stops.*.location' => 'required_with:stops|string',
            'stops.*.code' => 'required_with:stops|string|size:3',
        ]);

        $flightRoute->update($validated);

        if (isset($validated['stops'])) {
            $existingStopIds = $flightRoute->stops->pluck('id')->toArray();
            $updatedStopIds = [];

            foreach ($validated['stops'] as $index => $stop) {
                $stopData = [
                    'location' => $stop['location'],
                    'code' => $stop['code'],
                    'order' => $index
                ];

                if (isset($stop['id'])) {
                    $flightRoute->stops()->where('id', $stop['id'])->update($stopData);
                    $updatedStopIds[] = $stop['id'];
                } else {
                    $newStop = $flightRoute->stops()->create($stopData);
                    $updatedStopIds[] = $newStop->id;
                }
            }

            // Delete stops that weren't included in the update
            $stopsToDelete = array_diff($existingStopIds, $updatedStopIds);
            if (!empty($stopsToDelete)) {
                $flightRoute->stops()->whereIn('id', $stopsToDelete)->delete();
            }
        }

         return redirect()->route('admin.flight-routes.index')->with('success', 'Route Updated successfully');
    }

    public function destroy(FlightRoute $flightRoute)
    {
        $flightRoute->delete();
        return redirect()->route('admin.flight-routes.index')->with('success', 'Route deleted successfully');
    }
}
