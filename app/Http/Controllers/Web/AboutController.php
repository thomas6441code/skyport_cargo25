<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('AboutPage', [
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
