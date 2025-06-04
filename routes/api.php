<?php

use App\Http\Controllers\SliderController;
use App\Http\Controllers\web\QuoteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    TrackingController,
};

Route::prefix('v1')->group(function () {
    Route::get('/tracking/{trackingNumber}', [TrackingController::class, 'show']);
    Route::post('/tracking/multiple', [TrackingController::class, 'trackMultiple']);

    Route::post('/quotes/calculate', [QuoteController::class, 'calculate']);
});



