<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'location',
        'zip_code',
        'origin',
        'destination',
        'cargo_type',
        'cargo_description',
        'weight',
        'dimensions',
        'ready_date',
        'special_requirements'
    ];

    protected $casts = [
        'ready_date' => 'date',
    ];
}
