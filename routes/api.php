<?php

use App\Http\Controllers\Api\PeopleController;
use Illuminate\Support\Facades\Route;

// People API Routes
Route::middleware('auth:sanctum')->prefix('api')->group(function () {
    Route::get('/person', [PeopleController::class, 'index'])->name('api.people.index');
    Route::post('/person', [PeopleController::class, 'store'])->name('api.people.store');
    Route::get('/person/{id}', [PeopleController::class, 'show'])->name('api.people.show');
    Route::put('/person/{id}', [PeopleController::class, 'update'])->name('api.people.update');
    Route::delete('/person/{id}', [PeopleController::class, 'destroy'])->name('api.people.destroy');
});
