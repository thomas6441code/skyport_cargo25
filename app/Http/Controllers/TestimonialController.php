<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
  
    public function index()
    {
        return Inertia::render('admin/testimonials/Index', [
            'testimonials' => Testimonial::latest()->get(),
            'services' => Service::select('id', 'title')->get()
        ]);
    }
    
    // Show create form
    public function create()
    {
        return Inertia::render('admin/testimonials/Create',[
            'services' => Service::select('id','title')->get(),
        ]);
    }

    //store the testimonials new
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'role' => 'required|string',
            'rating' => 'required|numeric|between:0,5',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3048',
            'existing_image' => 'nullable|string',
                 
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

        $validated['image']= $imagePath;

        // Create the testimonial
        $testimonial = Testimonial::create($validated);

        return response()->json([
            'message' => 'Testimonials created successfully',
            'testimonial' => $testimonial
        ], 201);
    }

    // Show edit form
    public function edit(Testimonial $testimonial)
    {

        return Inertia::render('admin/testimonials/Edit', [
            'testimonial' => $testimonial,
            'services' => Service::select('id','title')->get(),
        ]);
    }

    //Updating the testimonial
    public function update(Request $request, Testimonial $testimonial)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'role' => 'required|string',
            'rating' => 'required|numeric|between:0,5',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3048',
            'existing_image' => 'nullable|string',
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
        $imagePath = $this->handleImageUpload($request, $testimonial);

        $validated['image']= $imagePath;
        
        // Update the testimonial
        $testimonial->update($validated);

        return response()->json([
            'message' => 'testimonial updated successfully',
            'testimonial' => $testimonial
        ]);
    }

    // Delete testimonial
    public function destroy(Testimonial $testimonial)
    {
        $publicPath = public_path('images/testimonials');

        // Delete old image if exists
        if ($testimonial && $testimonial->image) {
            $oldImagePath = public_path($testimonial->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted successfully!');
    }

    //Handle image upload for testimonial - moves directly to public/images/testimonials
    private function handleImageUpload(Request $request, ?Testimonial $testimonial = null): ?string
    {
        $publicPath = public_path('images/testimonials');
        
        // Create directory if it doesn't exist
        if (!File::exists($publicPath)) {
            File::makeDirectory($publicPath, 0755, true);
        }

        // If new image is uploaded
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($testimonial && $testimonial->image) {
                $oldImagePath = public_path($testimonial->image);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
            
            // Move new image to public directory
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move($publicPath, $imageName);
            
            return '/images/testimonials/' . $imageName;
        }

        // If existing image path is provided
        if ($request->filled('existing_image')) {
            return $request->input('existing_image');
        }

        // No image provided - delete existing if updating
        if ($testimonial && $testimonial->image) {
            $oldImagePath = public_path($testimonial->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
            return null;
        }

        return null;
    }

   
}
