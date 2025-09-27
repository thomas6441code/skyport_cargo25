<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalMessages' => Message::count(),
                'unreadMessages' => Message::where('is_read', false)->count(),
                'unreadQuotes' => Quote::where('is_answered', false)->count(),
                'totalQuotes' => Quote::count(),
                'repliedQuotes' => Quote::where('is_answered', true)->count(),
            ],
            'quotesOverTime' => Quote::selectRaw("DATE(created_at) as date, COUNT(*) as count")
                ->groupBy('date')->orderBy('date')->get(),
            'recentQuotes' => Quote::take(5)->orderBy('updated_at', 'desc')->get(),
            'messagesByDepartment' => Message::select('department', \DB::raw('COUNT(*) as count'))
                ->groupBy('department')->get(),
        ]);
    }
}
