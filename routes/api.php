<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\web\QuoteController;
use App\Http\Controllers\Web\ContactController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\Api\TrackingController;
use App\Http\Controllers\Api\VisionValueController;

Route::prefix('v1')->group(function () {
    Route::get('/tracking/{trackingNumber}', [TrackingController::class, 'show']);
    Route::post('/tracking/multiple', [TrackingController::class, 'trackMultiple']);
    Route::post('/quotes/calculate', [QuoteController::class, 'calculate']);
});


Route::prefix('api')->group(function () {
    Route::get('/slides',[SliderController::class, 'indexslides']);
    Route::get('/testimonials',[TestimonialController::class, 'indextestimonials']);
    Route::get('/faqs',[FaqController::class, 'indexfaqs']);
    Route::post('/messages', [ContactController::class, 'store'])->name('message.store');
});
