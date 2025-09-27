<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Slider;
use Inertia\Inertia;
use App\Models\Faq;

class TrackingController extends Controller
{
    public function index()
    {
 	return Inertia::render('TrackingPage',[
                'faqs'=> Faq::where('category', '0')->get(),
		'images'=> Slider::inRandomOrder()->take(1)->get()->first()
        ]);
    }
}
