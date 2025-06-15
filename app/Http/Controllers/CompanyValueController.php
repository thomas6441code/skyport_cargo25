<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CompanyValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyValueController extends Controller
{
    /**
     * Display the company values management page
     */
    public function index()
    {
        return Inertia::render('admin/companyValues/Index', [
            'mission' => CompanyValue::where('type', 'mission')->first(),
            'vision' => CompanyValue::where('type', 'vision')->first(),
            'values' => CompanyValue::where('type', 'value')
                            ->orderBy('sort_order')
                            ->get()
        ]);
    }

    /**
     * Store a newly created company value
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:mission,vision,value',
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
            'sort_order' => 'sometimes|integer'
        ]);

        // For mission/vision, ensure only one exists
        if (in_array($validated['type'], ['mission', 'vision'])) {
            CompanyValue::where('type', $validated['type'])->delete();
        }

        $companyValue = CompanyValue::create($validated);

        return redirect()
                ->back()
                ->with('success', ucfirst($validated['type']) . ' saved successfully');
    }

    /**
     * Update the specified company value
     */
    public function update(Request $request, CompanyValue $companyValue)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
            'sort_order' => 'sometimes|integer'
        ]);

        $companyValue->update($validated);

        return redirect()
                ->back()
                ->with('success', 'Value updated successfully');
    }

    /**
     * Remove the specified company value
     */
    public function destroy(CompanyValue $companyValue)
    {
        $companyValue->delete();

        return redirect()
                ->back()
                ->with('success', 'Value deleted successfully');
    }

    /**
     * Handle reordering of company values
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'values' => 'required|array',
            'values.*' => 'exists:company_values,id'
        ]);

        foreach ($request->values as $index => $id) {
            CompanyValue::where('id', $id)->update(['sort_order' => $index]);
        }

        return response()->json(['success' => true]);
    }
}