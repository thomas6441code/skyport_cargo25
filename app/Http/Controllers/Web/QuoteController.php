<?php

namespace App\Http\Controllers\web;

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Inertia\Inertia;
use App\Models\Quote;
use App\Models\CargoType;
use App\Mail\QuoteReply;
use Illuminate\Http\Request;
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
        ]);
    }

    public function indexquotes()
    {
        $quotes = Quote::all();
        return response()->json($quotes, 201);
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
                'location' => 'required|string|max:255',
                'zipCode' => 'required|string|max:20',
                'origin' => 'required|string|max:255',
                'destination' => 'required|string|max:255',
                'cargoType' => 'required|string|max:255',
                'cargoDescription' => 'required|string',
                'weight' => 'required|string|max:50',
                'dimensions' => 'required|string|max:100',
                'readyDate' => 'required|date_format:Y-m-d',
                'specialRequirements' => 'nullable|string',
            ]);

            $quoteData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'location' => $validated['location'],
                'zip_code' => $validated['zipCode'],
                'origin' => $validated['origin'],
                'destination' => $validated['destination'],
                'cargo_type' => $validated['cargoType'],
                'cargo_description' => $validated['cargoDescription'],
                'weight' => $validated['weight'],
                'dimensions' => $validated['dimensions'],
                'ready_date' => $validated['readyDate'],
                'special_requirements' => $validated['specialRequirements'] ?? null,
            ];

            $quote = Quote::create($quoteData);
            
            try {

                Mail::to('hopeshayo1@gmail.com')->send(new NewQuoteNotification($quote));
                
                Mail::to($quote->email)->send(new QuoteConfirmation($quote));
                
                return response()->json([
                    'success' => true,
                    'message' => 'Thank you for your quote request! We will contact you shortly.',
                    'data' => $quote
                ]);

            } catch (\Exception $e) {

                return response()->json([
                    'success' => false,
                    'message' => 'Email sending failed: ' . $e->getMessage(),
                ]);

            }

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
