<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Web\{
    HomeController,
    ServiceController,
    QuoteController,
    ContactController,
    AboutController
};

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/services/air-freight', [ServiceController::class, 'airfreight']);
Route::get('/services/ocean-freight', [ServiceController::class, 'oceanfreight']);
Route::get('/services/warehousing', [ServiceController::class, 'warehousing']);

Route::get('/quote', [QuoteController::class, 'create'])->name('quote.create');
Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');
Route::get('/get-quote', [QuoteController::class, 'create']);

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/about-us', [AboutController::class, 'index'])->name('about');

Route::get('/track', fn() => inertia('TrackingPage'))->name('track');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
