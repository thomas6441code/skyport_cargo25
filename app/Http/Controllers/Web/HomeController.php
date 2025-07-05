<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Stat;
use App\Models\Slider;
use App\Models\Service;
use App\Models\FlightRoute;
use App\Models\Testimonial;
use App\Models\CompanyMissionVision;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $faqs = Faq::take(5)->get();
        $stats = Stat::all();
        $slides = Slider::all();
        $services = Service::all();
        $companydata = CompanyMissionVision::all()->first();
        $testimonials = Testimonial::take(5)->get();
	$routes = FlightRoute::with('stops')->get();

        return Inertia::render('HomePage', [
            'faqs'=> $faqs,
            'routes'=>$routes,
            'stats'=> $stats,
            'slides'=> $slides,
	    'companydata'=> $companydata,
            'services'=> $services,
            'testimonials'=> $testimonials,
            'banner' => [
                'title' => 'China-Tanzania Air Freight Experts',
                'subtitle' => 'Fast, reliable air cargo solutions with customs clearance included',
                'video' => asset('videos/earth.mp4'),
            ]
        ]);
    }
}
