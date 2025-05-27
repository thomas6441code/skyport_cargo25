<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
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
        ];
    }
}
