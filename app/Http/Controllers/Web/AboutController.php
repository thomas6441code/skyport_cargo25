<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Stat;
use App\Models\Member;
use App\Models\Service;
use App\Http\Controllers\Controller;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('AboutPage', [
            'stats' => Stat::latest()->get(),
            'services' => Service::latest()->get(),
            'teamMembers' => Member::latest()->get(),
            'history' => [
                'year' => 2010,
                'title' => 'Company Founded',
                'description' => 'Started as a small freight forwarder in Shanghai'
            ],
            'mission' => 'To provide the fastest and most reliable air freight services between China and Tanzania',
            'certifications' => [
                'IATA Accredited',
                'FIATA Member',
                'ISO 9001 Certified'
            ]
        ]);
    }
}
