<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use App\Models\Quote;
use App\Models\Slider;
use App\Mail\QuoteReply;
use App\Models\CargoType;
use Illuminate\Http\Request;
use Illuminate\Mail\SentMessage;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use App\Mail\QuoteConfirmation;
use App\Mail\NewQuoteNotification;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class QuoteController extends Controller
{
    public function index()
    {

        return Inertia::render('QuotePage', [
            'cargoTypes'=> CargoType::all(),
            'image'=> Slider::inRandomOrder()->take(1)->get()->first(),
        ]);
    }

    public function indexquotes()
    {
	 $quotes = Quote::orderBy('created_at', 'desc')->get();
	 return response()->json($quotes, 200);
    }

    public function adminindex()
    {
        return Inertia::render('admin/quotes/QuotesAdmin');
    }

    public function create()
    {
        return Inertia::render('QuotePage', [
            'defaultOrigin' => 'China',
            'defaultDestination' => 'Tanzania',
            'cargoTypes' => CargoType::all(),
            'image'=> Slider::inRandomOrder()->take(1)->get()->first(),

        ]);
    }

    public function Emailindex( Quote $quote)
    {
        return Inertia::render('admin/quotes/EmailQuotes', [
            'quote' => $quote,
        ]);
    }

    public function store(Request $request)
    {
        try {

            $validated = $request->validate( [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'location' => 'nullable|string|max:255',
                'zipCode' => 'nullable|string|max:20',
                'origin' => 'required|string|max:255',
                'destination' => 'required|string|max:255',
                'cargoType' => 'required|string|max:255',
                'cargoDescription' => 'required|string',
                'weight' => 'required|string|max:50',
                'dimensions' => 'nullable|string|max:100',
                'readyDate' => 'required|date_format:Y-m-d',
                'specialRequirements' => 'nullable|string',
            ]);

            $quoteData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'location' => $validated['location'] ?? null,
                'zip_code' => $validated['zipCode'] ?? null,
                'origin' => $validated['origin'],
                'destination' => $validated['destination'],
                'cargo_type' => $validated['cargoType'],
                'cargo_description' => $validated['cargoDescription'],
                'weight' => $validated['weight'],
                'dimensions' => $validated['dimensions'] ?? null,
                'ready_date' => $validated['readyDate'],
                'special_requirements' => $validated['specialRequirements'] ?? null,
            ];

	    $quote = Quote::create($quoteData);

		// 1️⃣ Send admin notification
	    try {

	        $adminSent = Mail::to('skyportlogistics25@gmail.com')
	            ->send(new NewQuoteNotification($quote));

	        if (! ($adminSent instanceof SentMessage) ) {
	            return response()->json([
	                'success' => false,
	                'message' => 'Failed to send notification to admin.'
	            ], 500);
	        }

	        // 2️⃣ Send customer confirmation
	        $customerSent = Mail::to($quoteData['email'])
	            ->send(new QuoteConfirmation($quote));

	        if (! ($customerSent instanceof SentMessage) ) {
	            return response()->json([
	                'success' => false,
	                'message' => 'Failed to send confirmation to customer.'
	            ], 500);
	        }

	    } catch (TransportExceptionInterface $e) {
	        return response()->json([
	            'success' => false,
	            'message' => 'Email transport error: ' . $e->getMessage()
	        ], 500);

	    } catch (\Exception $e) {
	        return response()->json([
	            'success' => false,
	            'message' => 'Unexpected error sending email: ' . $e->getMessage()
	        ], 500);
	    }

	    return response()->json([
	        'success' => true,
	        'message' => 'Thank you for your quote request! We will contact you shortly.',
	        'data' => $quote
	    ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your quote request.',
                'error_details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
    
    public function sendEmail(Request $request)
    {
        $validated = $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
            'quote_id' => 'required|exists:quotes,id',
        ]);
    
        $quote = Quote::findOrFail($validated['quote_id']);
    
        try {
            Mail::to($validated['to'])
            ->send(new QuoteReply(
                $quote,
                $validated['subject'],
                $validated['content']
            ));

            // Mark quote as answered
            $quote->update(['is_answered' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Email sent successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send email: ' . $e->getMessage()
            ], 500);
        }
    }

    public function markAsAnswered(Quote $quote)
    {
        $quote->update(['is_answered' => true]);
        
        return back()->with('success', 'Quote marked as answered');
    }

}
