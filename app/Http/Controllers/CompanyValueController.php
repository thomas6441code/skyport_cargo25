<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CompanyMissionVision;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyValueController extends Controller
{
    public function index()
    {
        $companyData = CompanyMissionVision::first();

        return Inertia::render('admin/companyValues/MissionVision', [
            'companyData' => $companyData ?: [
                'vision' => '',
                'mission' => '',
                'core_values' => []
            ],
            'flash' => session('flash', [])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vision' => 'required|string|max:500',
            'mission' => 'required|string|max:500',
        ]);

        CompanyMissionVision::updateOrCreate(
            ['id' => 1],
            $validated
        );

        return redirect()->route('admin.company.mission-vision')
            ->with('flash', ['success' => 'Company data updated successfully!']);
    }

	    public function addCoreValue(Request $request)
	{
	    try {
	        $validated = $request->validate([
	            'value' => 'required|string|max:255',
	        ]);

	        $company = CompanyMissionVision::firstOrCreate(
	            ['id' => 1],
	            [
	                'vision' => '',
	                'mission' => '',
	                'core_values' => []
	            ]
	        );

	        $values = $company->core_values ?? [];

	        if (in_array($validated['value'], $values)) {
	            return back()->with('flash', [
	                'error' => 'This core value already exists'
	            ]);
	        }

	        $values[] = $validated['value'];
	        $company->core_values = $values;
	        $company->save();

	        return back()->with('flash', [
	            'success' => 'Core value added successfully'
	        ]);

	    } catch (\Illuminate\Validation\ValidationException $e) {
	        return back()->withErrors($e->errors())->with('flash', [
	            'error' => 'Validation failed'
	        ]);
	    }
	}

    public function deleteCoreValue($index)
    {
        $companyData = CompanyMissionVision::first();

        if ($companyData && isset($companyData->core_values[$index])) {
            $coreValues = $companyData->core_values;
            array_splice($coreValues, $index, 1);

            $companyData->core_values = $coreValues;
            $companyData->save();
        }

        return back()->with('flash', ['success' => 'Core value deleted!']);
    }
}
