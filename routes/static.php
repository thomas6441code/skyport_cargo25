<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/policies', function () {
    return Inertia::render('policy_terms/policy');
})->name('policies');

Route::get('/terms', function () {
    return Inertia::render('policy_terms/terms');
})->name('terms');

Route::get('/more_SkyPort', function () {
    return Inertia::render('aboutSkyport/moreOfSkyPort');
})->name('aboutSkyport');
