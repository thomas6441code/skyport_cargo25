<?php

use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\{
    HomeController,
    ServicesLogiController,
    ServiceLastController,
    QuoteController,
    ContactController,
    AboutController
};
use App\Http\Controllers\{
    FaqController,
    SliderController,
    DepartmentController,
    TestimonialController,
    MessageController,
    MemberController,
    OfficeController
};

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about-us', [AboutController::class, 'index'])->name('about');

Route::get('/tracking', fn() => inertia('TrackingPage'))->name('track');

Route::get('/services', [ServicesLogiController::class, 'index']);
Route::get('/services/{service:slug}', [ServicesLogiController::class, 'show']);

Route::get('/quotes', [QuoteController::class, 'create'])->name('quote.create');
Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');



// routes/web.php
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::get('/slides',[SliderController::class, 'index'])->name('admin.slides.slidesAdmin');
    Route::get('/slides/create',[SliderController::class, 'create'])->name('admin.slides.create');
    Route::post('/slides',[SliderController::class, 'store'])->name('admin.slides.store');
    Route::get('/slides/edit/{slide}',[SliderController::class, 'edit'])->name('admin.slides.edit');
    Route::put('/slides/{slide}',[SliderController::class, 'update'])->name('admin.slides.update');
    Route::delete('/slides/{slide}',[SliderController::class, 'destroy'])->name('admin.slides.destroy');
    
    Route::get('/offices',[OfficeController::class, 'index'])->name('admin.offices.Index');
    Route::get('/offices/create',[OfficeController::class, 'create'])->name('admin.offices.create');
    Route::post('/offices',[OfficeController::class, 'store'])->name('admin.offices.store');
    Route::get('/offices/edit/{office}',[OfficeController::class, 'edit'])->name('admin.offices.edit');
    Route::put('/offices/{office}',[OfficeController::class, 'update'])->name('admin.offices.update');
    Route::delete('/offices/{office}',[OfficeController::class, 'destroy'])->name('admin.offices.destroy');

    Route::get('/faqs',[FaqController::class, 'index'])->name('admin.faqs.FaqsAdmin');
    Route::get('/faqs/create',[FaqController::class, 'create'])->name('admin.faqs.create');
    Route::post('/faqs',[FaqController::class, 'store'])->name('admin.faqs.store');
    Route::get('/faqs/edit/{faq}',[FaqController::class, 'edit'])->name('admin.faqs.edit');
    Route::put('/faqs/{faq}',[FaqController::class, 'update'])->name('admin.faqs.update');
    Route::delete('/faqs/{faq}',[FaqController::class, 'destroy'])->name('admin.faqs.destroy');

    Route::get('/teams',[MemberController::class, 'index'])->name('admin.teams.teamsAdmin');

    Route::get('/quotes',[QuoteController::class, 'adminindex'])->name('admin.quotes.quotesAdmin');

    Route::get('/messages',[MessageController::class, 'adminindex'])->name('admin.messages.messagesAdmin');
    

    Route::get('/services', [ServicesLogiController::class, 'Adminindex'])->name('admin.services.index');
    Route::get('/services/create', [ServicesLogiController::class, 'create'])->name('admin.services.create');
    Route::post('/services', [ServicesLogiController::class, 'store'])->name('admin.services.store');
    Route::get('/services/edit/{service}', [ServicesLogiController::class, 'edit'])->name('admin.services.edit');
    Route::put('/services/{service}', [ServicesLogiController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [ServicesLogiController::class, 'destroy'])->name('admin.services.destroy');
});


//routes/api.php
Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {

    /* Member protected api Routes /api/ */
    Route::get('/teams',[MemberController::class, 'indexteams']);
    Route::post('/teams',[MemberController::class, 'store']);
    Route::put('/teams/{member}',[MemberController::class, 'update']);
    Route::delete('/teams/{member}',[MemberController::class, 'destroy']);

    /* Quotes api protected routes */
    Route::get('/quotes',[QuoteController::class, 'indexquotes']);

    /* Messages api protected routes */
    Route::get('/messages', [MessageController::class, 'indexmessages']);
    Route::put('/messages/read/{message}', [MessageController::class, 'markAsRead']);
    Route::put('/messages/unread/{message}', [MessageController::class, 'markAsUnread']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);

    
});


Route::prefix('api')->group(function () {

    Route::get('/slides',[SliderController::class, 'indexslides']);

    Route::get('/testimonials',[TestimonialController::class, 'indextestimonials']);

    Route::get('/faqs',[FaqController::class, 'indexfaqs']);

    Route::post('/messages', [ContactController::class, 'store'])->name('message.store');

});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

