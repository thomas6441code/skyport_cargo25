<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracking extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_number',
        'origin',
        'destination',
        'current_status',
        'estimated_arrival',
        'quote_id'
    ];

    public function statuses()
    {
        return $this->hasMany(TrackingStatus::class);
    }

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }
}
