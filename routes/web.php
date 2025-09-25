<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\QuoteController;
use App\Http\Controllers\Web\AboutController;
use App\Http\Controllers\Web\ContactController;
use App\Http\Controllers\Web\TrackingController;
use App\Http\Controllers\Web\ServicesLogiController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about-us', [AboutController::class, 'index'])->name('about');

Route::get('/services', [ServicesLogiController::class, 'index']);
Route::get('/services/{service:slug}', [ServicesLogiController::class, 'show']);

Route::get('/quotes', [QuoteController::class, 'create'])->name('quote.create');
Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');

Route::get('/tracking', [TrackingController::class, 'index'])->name('tracking');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');

require __DIR__.'/static.php';
require __DIR__.'/admin.php';
require __DIR__.'/api.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

