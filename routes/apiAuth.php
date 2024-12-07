<?php

use App\Http\Controllers\Auth\ApiAuthenticatedSessionController;

Route::prefix('api')->group(function () {
    Route::post('login', [ApiAuthenticatedSessionController::class, 'apiLogin']);
    
    Route::middleware('auth:sanctum')->post('logout', [ApiAuthenticatedSessionController::class, 'apiLogout']);
});
