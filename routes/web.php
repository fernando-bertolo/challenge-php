<?php

use App\Http\Controllers\ClientsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::post('/clients', [ClientsController::class, 'createClient'])->name('create-clients');
Route::get('/clients', [ClientsController::class, 'listClient'])->name('list-clients');
Route::delete('/clients/{id}', [ClientsController::class, 'deleteClient'])->name('delete-clients');

