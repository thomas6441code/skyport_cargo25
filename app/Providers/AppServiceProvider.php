<?php

namespace App\Providers;

use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
        // Custom binding for Service (works with both ID and slug)
        Route::bind('service', function ($value) {
            return Service::where('id', $value)
                ->orWhere('slug', $value)
                ->firstOrFail();
        });
        

    }
}
