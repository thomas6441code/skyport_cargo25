<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Models\Service;

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

       // Route::model('service', Service::class);
        //Route::bind('service', function($value){
        //    return Service::where('slug', $value)->firstOrFail();
       // });

    }
}
