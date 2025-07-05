<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RouteStop extends Model
{
    protected $fillable = [
        'route_id',
        'location',
        'code',
        'order'
    ];
}
