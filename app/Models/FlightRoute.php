<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FlightRoute extends Model
{
    protected $fillable = [
        'origin_city',
        'origin_code',
        'destination_city',
        'destination_code',
        'duration',
        'active',
        'departure_time',
        'arrival_time'
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function stops(): HasMany
    {
        return $this->hasMany(RouteStop::class, 'route_id')->orderBy('order');
    }
}

