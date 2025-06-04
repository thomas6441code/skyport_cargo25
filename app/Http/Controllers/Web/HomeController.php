<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Slider;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $faqs = Faq::all();
        $slides = Slider::all();
        $testimonials = Testimonial::all();

        return Inertia::render('HomePage', [
            'faqs'=> $faqs,
            'slides'=> $slides,
            'testimonials'=> $testimonials,
            'banner' => [
                'title' => 'China-Tanzania Air Freight Experts',
                'subtitle' => 'Fast, reliable air cargo solutions with customs clearance included',
                'video' => asset('videos/cargo-plane.mp4'),
            ]
        ]);
    }
}
