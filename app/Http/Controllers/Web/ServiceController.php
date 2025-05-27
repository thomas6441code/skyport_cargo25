<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('ServicesPage');
    }
    public function oceanfreight()
    {

        return Inertia::render('services.oceanfreight');
    }
    public function airfreight()
    {

        return Inertia::render('services.airfreight');
    }
    public function warehousing()
    {

        return Inertia::render('services.warehousing');
    }
}
