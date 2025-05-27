<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'transit_time',
        'route',
        'features',
        'cargo_types',
        'has_customs_support'
    ];

    protected $casts = [
        'features' => 'array',
        'cargo_types' => 'array',
        'has_customs_support' => 'boolean'
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeAirFreight($query)
    {
        return $query->where('type', 'air');
    }
}
