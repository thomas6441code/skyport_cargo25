<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use App\Models\Faq;
use App\Models\Stat;
use App\Models\Slider;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServicesLogiController extends Controller
{

    public function index()
    {
        $service = Service::all();
        $stats = Stat::all();

        return Inertia::render('Services/ServicesPage', [
            'services' => $service,
            'stats' => $stats,
            'image'=> Slider::inRandomOrder()->take(1)->get()->first(),

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
        $faqs = Faq::where('category', $service->id)->get();
        $testimonials = Testimonial::where('category', $service->id)->get();

        return Inertia::render('Services/show', [
            'services' => [
                'service' => $service,
                'faqs' => $faqs,
                'testimonials' => $testimonials
            ],
	    'servicess' => Service::all(),
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

    //store the services new
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'required|string',
            'icon' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3048',
            'existing_image' => 'nullable|string',
            'features' => 'required|array',
            'features.*' => 'required|string|max:255',
            'benefits' => 'required|array',
            'benefits.*' => 'required|string|max:255',
            'process_steps' => 'required|array',
            'process_steps.*' => 'required|string|max:255',
       
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => 'Please fix the form errors'
            ], 422);
        }

        $validated = $validator->validated();

        // Handle image upload
        $imagePath = $this->handleImageUpload($request);

        // Create the service
        $service = Service::create([
            'slug'=> Str::slug($validated['title']),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'long_description' => $validated['long_description'],
            'icon' => $validated['icon'],
            'image' => $imagePath,
            'features' => $validated['features'],
            'benefits' => $validated['benefits'],
            'process_steps' => $validated['process_steps'],
        ]);

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service
        ], 201);
    }

    // Show edit form
    public function edit(Service $service)
    {

        return Inertia::render('admin/services/Edit', [
            'service' => $service
        ]);
    }

    //Updating the service
    public function update(Request $request, Service $service)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'required|string',
            'icon' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3048',
            'existing_image' => 'nullable|string',
            'features' => 'required|array',
            'features.*' => 'required|string|max:255',
            'benefits' => 'required|array',
            'benefits.*' => 'required|string|max:255',
            'process_steps' => 'required|array',
            'process_steps.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => 'Please fix the form errors',
                'request' => $request
            ], 422);
        }

        $validated = $validator->validated();

        // Handle image upload
        $imagePath = $this->handleImageUpload($request, $service);

        // Update the service
        $service->update([
            'slug'=> Str::slug($validated['title']),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'long_description' => $validated['long_description'],
            'icon' => $validated['icon'],
            'image' => $imagePath,
            'features' => $validated['features'],
            'benefits' => $validated['benefits'],
            'process_steps' => $validated['process_steps'],
        ]);

        return response()->json([
            'message' => 'Service updated successfully',
            'service' => $service
        ]);
    }

    // Delete service
    public function destroy(Service $service)
    {
        $publicPath = public_path('images/services');

        // Delete old image if exists
        if ($service && $service->image) {
            $oldImagePath = public_path($service->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully!');
    }

    //Handle image upload for service - moves directly to public/images/services
    private function handleImageUpload(Request $request, ?Service $service = null): ?string
    {
        $publicPath = public_path('images/services');
        
        // Create directory if it doesn't exist
        if (!File::exists($publicPath)) {
            File::makeDirectory($publicPath, 0755, true);
        }

        // If new image is uploaded
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($service && $service->image) {
                $oldImagePath = public_path($service->image);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
            
            // Move new image to public directory
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move($publicPath, $imageName);
            
            return '/images/services/' . $imageName;
        }

        // If existing image path is provided
        if ($request->filled('existing_image')) {
            return $request->input('existing_image');
        }

        // No image provided - delete existing if updating
        if ($service && $service->image) {
            $oldImagePath = public_path($service->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
            return null;
        }

        return null;
    }
}


