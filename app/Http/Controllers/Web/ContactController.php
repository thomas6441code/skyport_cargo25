<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('ContactPage', [
            'offices' => [
                'china' => [
                    'address' => '123 Cargo Ave, Shanghai, China',
                    'phone' => '+86 21 1234 5678',
                    'email' => 'china@skyportcargo.com'
                ],
                'tanzania' => [
                    'address' => '456 Logistics St, Dar es Salaam, Tanzania',
                    'phone' => '+255 22 987 6543',
                    'email' => 'tanzania@skyportcargo.com'
                ]
            ]
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|email',
                'phone' => 'required|string|max:20',
                'subject' => 'required|string|max:100',
                'message' => 'required|string|max:1000|min:15',
                'department' => 'required|string',
            ]);

            $message = Message::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.',
                'data' => $message
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
                'message' => 'An error occurred while submitting your message.'
            ], 500);
        }
    }

}
