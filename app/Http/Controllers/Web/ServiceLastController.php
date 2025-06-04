<?php

namespace App\Http\Controllers;


error_reporting(E_ALL);
ini_set('display_errors', 1);

use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ServiceLastController extends Controller
{
    // Display all services (for admin)
    public function index()
    {
        return Inertia::render('admin/services/Index', [
            'services' => Service::latest()->get()
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('admin/services/Create');
    }

    // Store new service
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url',
            'description' => 'required|string|max:500',
            'long_description' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'string|max:255',
            'benefits' => 'required|array',
            'benefits.*' => 'string|max:255',
            'process_steps' => 'required|array',
            'process_steps.*' => 'string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service created successfully!');
    }

    // Show edit form
    public function edit(Service $service)
    {
        return Inertia::render('admin/services/Edit', [
            'service' => $service
        ]);
    }

    // Update service
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url',
            'description' => 'required|string|max:500',
            'long_description' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'string|max:255',
            'benefits' => 'required|array',
            'benefits.*' => 'string|max:255',
            'process_steps' => 'required|array',
            'process_steps.*' => 'string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully!');
    }

    // Delete service
    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully!');
    }
}