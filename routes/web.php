<?php

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Quote;
use App\Models\Message;
use App\Models\Faq;
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
    StatController,
    SliderController,
    DepartmentController,
    TestimonialController,
    MessageController,
    MemberController,
    CargoTypeController,
    OfficeController
};

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about-us', [AboutController::class, 'index'])->name('about');

Route::get('/tracking', function () {
    return Inertia::render('TrackingPage',[
        'faqs'=> Faq::where('category', '0')->get(),
    ]);
})->name('track');

Route::get('/services', [ServicesLogiController::class, 'index']);
Route::get('/services/{service:slug}', [ServicesLogiController::class, 'show']);

Route::get('/quotes', [QuoteController::class, 'create'])->name('quote.create');
Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');



// routes/web.php
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
    
        return Inertia::render('admin/dashboard', [
            'stats' => [
            'totalMessages' => Message::count(),
            'unreadMessages' => Message::where('is_read', false)->count(),
            'unreadQuotes' => Quote::where('is_answered', false)->count(),
            'totalQuotes' => Quote::count(),
            'repliedQuotes' => Quote::where('is_answered', true)->count(),
        ],
        'quotesOverTime' => Quote::selectRaw("DATE(created_at) as date, COUNT(*) as count")
        ->groupBy('date')->orderBy('date')->get(),
        'messagesByDepartment' => Message::select('department', \DB::raw('COUNT(*) as count'))
        ->groupBy('department')->get(),
        ]);

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
    
    Route::get('/departments',[DepartmentController::class, 'index'])->name('admin.departments.Index');
    Route::get('/departments/create',[DepartmentController::class, 'create'])->name('admin.departments.create');
    Route::post('/departments',[DepartmentController::class, 'store'])->name('admin.departments.store');
    Route::get('/departments/edit/{department}',[DepartmentController::class, 'edit'])->name('admin.departments.edit');
    Route::put('/departments/{department}',[DepartmentController::class, 'update'])->name('admin.departments.update');
    Route::delete('/departments/{department}',[DepartmentController::class, 'destroy'])->name('admin.departments.destroy');
    
    Route::get('/cargotypes',[CargoTypeController::class, 'index'])->name('admin.cargotypes.index');
    Route::get('/cargotypes/create',[CargoTypeController::class, 'create'])->name('admin.cargotypes.create');
    Route::post('/cargotypes',[CargoTypeController::class, 'store'])->name('admin.cargotypes.store');
    Route::get('/cargotypes/edit/{cargoType}',[CargoTypeController::class, 'edit'])->name('admin.cargotypes.edit');
    Route::put('/cargotypes/{cargoType}',[CargoTypeController::class, 'update'])->name('admin.cargotypes.update');
    Route::delete('/cargotypes/{cargoType}',[CargoTypeController::class, 'destroy'])->name('admin.cargotypes.destroy');

    Route::get('/stats',[StatController::class, 'index'])->name('admin.stats.FaqsAdmin');
    Route::get('/stats/create',[StatController::class, 'create'])->name('admin.stats.create');
    Route::post('/stats',[StatController::class, 'store'])->name('admin.stats.store');
    Route::get('/stats/edit/{stat}',[StatController::class, 'edit'])->name('admin.stats.edit');
    Route::put('/stats/{stat}',[StatController::class, 'update'])->name('admin.stats.update');
    Route::delete('/stats/{stat}',[StatController::class, 'destroy'])->name('admin.stats.destroy');

    Route::get('/faqs',[FaqController::class, 'index'])->name('admin.faqs.FaqsAdmin');
    Route::get('/faqs/create',[FaqController::class, 'create'])->name('admin.faqs.create');
    Route::post('/faqs',[FaqController::class, 'store'])->name('admin.faqs.store');
    Route::get('/faqs/edit/{faq}',[FaqController::class, 'edit'])->name('admin.faqs.edit');
    Route::put('/faqs/{faq}',[FaqController::class, 'update'])->name('admin.faqs.update');
    Route::delete('/faqs/{faq}',[FaqController::class, 'destroy'])->name('admin.faqs.destroy');
    
    /* Member protected api Routes /api/ */
    Route::get('/teams',[MemberController::class, 'index'])->name('admin.teams.teamsAdmin');
    Route::get('/team',[MemberController::class, 'indexteams']);
    Route::post('/teams',[MemberController::class, 'store']);
    Route::put('/teams/{member}',[MemberController::class, 'update']);
    Route::delete('/teams/{member}',[MemberController::class, 'destroy']);


    /* Testimonials protected api Routes /api/ */
    Route::get('/testimonials', [TestimonialController::class, 'index'])->name('admin.testimonials.index');
    Route::get('/testimonials/create', [TestimonialController::class, 'create'])->name('admin.testimonials.create');
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('admin.testimonials.store');
    Route::get('/testimonials/edit/{testimonial}', [TestimonialController::class, 'edit'])->name('admin.testimonials.edit');
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');
   
    
    /* Quotes api protected routes */
    Route::get('/quote',[QuoteController::class, 'indexquotes']);
    Route::get('/quotes',[QuoteController::class, 'adminindex'])->name('admin.quotes.quotesAdmin');
    Route::get('/quotes/emailsQuotes/{quote}',[QuoteController::class, 'Emailindex'])->name('admin.quotes.EmailQuotes');
    Route::post('/send-email', [QuoteController::class, 'sendEmail'])->name('admin.quotes.send-email');
    Route::put('/quotes/mark-answered/{quote}', [QuoteController::class, 'markAsAnswered'])->name('admin.quotes.mark-answered');


    /* Messages api protected routes */
    Route::get('/messages',[MessageController::class, 'adminindex'])->name('admin.messages.messagesAdmin');
    Route::get('/message', [MessageController::class, 'indexmessages']);
    Route::put('/messages/read/{message}', [MessageController::class, 'markAsRead']);
    Route::put('/messages/unread/{message}', [MessageController::class, 'markAsUnread']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
    
    Route::get('/services', [ServicesLogiController::class, 'Adminindex'])->name('admin.services.index');
    Route::get('/services/create', [ServicesLogiController::class, 'create'])->name('admin.services.create');
    Route::post('/services', [ServicesLogiController::class, 'store'])->name('admin.services.store');
    Route::get('/services/edit/{service}', [ServicesLogiController::class, 'edit'])->name('admin.services.edit');
    Route::put('/services/{service}', [ServicesLogiController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [ServicesLogiController::class, 'destroy'])->name('admin.services.destroy');
});


Route::prefix('api')->group(function () {

    Route::get('/slides',[SliderController::class, 'indexslides']);

    Route::get('/testimonials',[TestimonialController::class, 'indextestimonials']);

    Route::get('/faqs',[FaqController::class, 'indexfaqs']);
    
    Route::post('/messages', [ContactController::class, 'store'])->name('message.store');

});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

