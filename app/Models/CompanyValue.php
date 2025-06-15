<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyValue extends Model
{
    protected $fillable = [
        'type', 'title', 'content', 'icon', 'sort_order'
    ];

    protected $casts = [
        'sort_order' => 'integer'
    ];
}
