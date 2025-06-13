<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    
    use HasFactory;

    protected $casts = [
        'features' => 'array',
        'benefits' => 'array',
        'process_steps' => 'array',
    ];

    protected $fillable = [
        'slug',
        'title',
        'image',
        'icon',
        'description',
        'long_description',
        'features',
        'benefits',
        'process_steps'
    ];


    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // app/Models/Service.php
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('id', $value)
            ->orWhere('slug', $value)
            ->firstOrFail();
    }

    public function scopeAirFreight($query)
    {
        return $query->where('type', 'air');
    }
}
