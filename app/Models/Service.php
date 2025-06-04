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

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeAirFreight($query)
    {
        return $query->where('type', 'air');
    }
}
