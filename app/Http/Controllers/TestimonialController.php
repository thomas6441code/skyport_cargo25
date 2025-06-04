<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function indextestimonials()
    {
       $testimonials = Testimonial::all();

        return response()->json($testimonials, 201);
    }



    
}
