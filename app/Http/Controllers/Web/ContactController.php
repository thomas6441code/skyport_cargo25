<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Office;
use App\Models\Slider;
use App\Models\Message;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function index()
    {
        $department = Department::all();
        $offices = Office::all();

        return Inertia::render('ContactPage', [
            'offices' => $offices,
            'departments' => $department,
            'image'=> Slider::inRandomOrder()->take(1)->get()->first(),
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
