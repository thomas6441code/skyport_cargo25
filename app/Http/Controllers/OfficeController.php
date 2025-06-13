<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Office;
use App\Models\Department;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/offices/Index', [
            'offices' => Office::all(),
            'departments' => Department::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/offices/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'hours' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'coordinates' => 'required|array|size:2',
            'coordinates.0' => 'required|numeric|between:-90,90',
            'coordinates.1' => 'required|numeric|between:-180,180',
        ]);


        try {
            
            $office = Office::create($validated);
    
            return redirect()->route('admin.offices.Index')->with('success', 'Office submited successfully!');

        } catch (\Exception $e) {
        
            return redirect()->route('admin.offices.Index')->with('success', 'Office creation failed!');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Office $office)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Office $office)
    {
        return Inertia::render('admin/offices/Edit', [
            'office' => $office
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Office $office)
    {


        $validated = $request->validate([
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'hours' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'coordinates' => 'required|array|size:2',
            'coordinates.0' => 'required|numeric|between:-90,90',
            'coordinates.1' => 'required|numeric|between:-180,180',
        ]);

        $office->update($validated);

        return redirect()->route('admin.offices.Index')->with('success', 'Office updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Office $office)
    {
        $office->delete();
        return redirect()->route('admin.offices.Index')->with('success', 'Office deleted successfully!');
    }
}
