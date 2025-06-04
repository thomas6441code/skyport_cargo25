<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class SliderController extends Controller
{
  
    public function index()
    {
        $slides = Slider::all();
        return Inertia::render('admin/slides/SlidesAdmin',[
            'slides'=>$slides
        ]);
    }

    public function indexslides()
    {
        $slides = Slider::all();
        return response()->json($slides, 201);
    }

    public function store(Request $request)
    {
       
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'slide_url' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
            ]);
    
            $image = $request->file('slide_url');
            $extension = $image->getClientOriginalExtension();
            $filename = time().'_'.Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)).'.'.$extension;
            
            $image->move(public_path('images/slides'), $filename);
    
            $slide = Slider::create([
                'title' => $request->title,
                'slide_url' => $filename
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'Slide Created Succefuly.',
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating your slide request.',
            ], 500);
        }


    }

    public function update(Request $request, Slider $slide)
    {
        try {
            $request->validate([
                'title' => 'string|max:255',
                'slide_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
            ]);
    
            if ($request->hasFile('slide_url')) {
                // Delete old image
                $oldimage = public_path('images/slides/'). $slide->slide_url;
                if (file_exists($oldimage)) {
                    unlink($oldimage);
                }
    
                // Store new image
                $image = $request->file('slide_url');
                $extension = $image->getClientOriginalExtension();
                $filename = time().'_'.Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)).'.'.$extension;
                
                $image->move(public_path('images/slides'), $filename);
                $slide->slide_url = $filename;
            }
    
            $slide->title = $request->title ?? $slide->title;
            $slide->save();
    
            return response()->json([
                'success' => true,
                'message' => 'Slide updated Succefuly.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating your slide request.',
                'error_details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function destroy(Slider $slide)
    {
       
        try {

             // Delete old image
             $oldimage = public_path('images/slides/'). $slide->slide_url;
             if (file_exists($oldimage)) {
                unlink($oldimage);
             }

            $slide->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Slide deleted Succefuly.',
            ]);
      
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting your slide request.',
                'error_details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
