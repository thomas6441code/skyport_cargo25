<?php

namespace App\Http\Controllers\web;

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Inertia\Inertia;
use App\Models\Quote;
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
        'defaultOrigin' => 'China',
            'defaultDestination' => 'Tanzania',
            'cargoTypes' => config('services.cargo_types')
        ]);
    }

    public function create()
    {
        return Inertia::render('QuotePage', [
            'defaultOrigin' => 'China',
            'defaultDestination' => 'Tanzania',
            'cargoTypes' => config('services.cargo_types')
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
                Mail::to($quote->email)->send(new QuoteConfirmation($quote));

                Mail::to('hopeshayo1@gmail.com')->send(new NewQuoteNotification($quote));
            } catch (\Exception $e) {

                Log::error('Email sending failed: ' . $e->getMessage());
                // Continue processing even if email fails
            }

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your quote request! We will contact you shortly.',
                'data' => $quote
            ]);

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

}

