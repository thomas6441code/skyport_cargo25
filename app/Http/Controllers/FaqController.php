<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function indexfaqs()
    {
       $faqs = Faq::all();

        return response()->json($faqs, 201);
    }

    public function index()
    {
       $faqs = Faq::all();

       return Inertia::render('admin/faqs/FaqsAdmin', [
        'faqs' => Faq::latest()->get()
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('admin/faqs/Create');
    }

    // Store new faqs
    public function store(Request $request)
    {
        $validated = $request->validate([
            'answer' => 'required|string|max:255',
            'question' => 'required|string|max:500',
        ]);

        Faq::create($validated);

        return redirect()->route('admin.faqs.FaqsAdmin')->with('success', 'Faq created successfully!');
    }

    // Show edit form
    public function edit(Faq $faq)
    {
        return Inertia::render('admin/faqs/Edit', [
            'faq' => $faq
        ]);
    }

    // Update faqs
    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'answer' => 'required|string|max:255',
            'question' => 'required|string|max:255',
        ]);

        $faq->update($validated);

        return redirect()->route('admin.faqs.FaqsAdmin')->with('success', 'Faq updated successfully!');
    }

    // Delete faqs
    public function destroy(Faq $faq)
    {
        $faq->delete();
        return redirect()->route('admin.faqs.FaqsAdmin')->with('success', 'Faq deleted successfully!');
    }
}
