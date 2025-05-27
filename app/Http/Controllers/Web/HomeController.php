<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('HomePage', [
            'services' => Service::featured()->take(4)->get(),
            'banner' => [
                'title' => 'China-Tanzania Air Freight Experts',
                'subtitle' => 'Fast, reliable air cargo solutions with customs clearance included',
                'video' => asset('videos/cargo-plane.mp4'),
            ]
        ]);
    }
}
