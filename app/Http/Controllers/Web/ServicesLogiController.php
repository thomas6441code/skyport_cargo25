<?php

namespace App\Http\Controllers\web;

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Inertia\Inertia;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\QuoteConfirmation;
use App\Mail\NewQuoteNotification;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class ServicesLogiController extends Controller
{

    public function index()
    {
        $service = Service::all();

        return Inertia::render('Services/ServicesPage', [
            'services' => $service
        ]);
    }

    public function Adminindex()
    {
        return Inertia::render('admin/services/Index', [
            'services' => Service::latest()->get()
        ]);
    }
    
    public function show(Service $service)
    {
        $faqs = Faq::take(3)->get();
        $testimonials = Testimonial::take(4)->get();

        return Inertia::render('Services/show', [
            'services' => [
                'service' => $service,
                'faqs' => $faqs,
                'testimonials' => $testimonials
            ],
            'featureIcons' => [
                '24-48hr delivery' => 'Clock',
                'Customs clearance' => 'Shield',
                'Dedicated handlers' => 'Truck',
                'Temperature control' => 'Thermometer',
                'Global coverage' => 'Globe',
            ]
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

