<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\CargoType;
use Illuminate\Http\Request;

class CargoTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/cargotypes/Index', [
            'cargotypes' => CargoType::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/cargotypes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:254',
            'description' => 'required|string|max:255',
        ]);


        try {

            $cargoType = CargoType::create($validated);

            return redirect()->route('admin.cargotypes.index')->with('success', 'CargoType submited successfully!');

        } catch (\Exception $e) {

            return redirect()->route('admin.cargotypes.create')->with('success', 'CargoType creation failed!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CargoType $cargoType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CargoType $cargoType)
    {
        return Inertia::render('admin/cargotypes/Edit', [
            'cargoType' => $cargoType
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CargoType $cargoType)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $cargoType->update($validated);

        return redirect()->route('admin.cargotypes.index')->with('success', 'CargoType updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CargoType $cargoType)
    {
        $cargoType->delete();
        return redirect()->route('admin.cargotypes.index')->with('success', 'CargoType deleted successfully!');
    }
}
