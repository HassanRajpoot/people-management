<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiCsrfProtection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Allow API routes to pass without CSRF token verification
        if ($request->is('api/*')) {
            return $next($request);
        }

        // Otherwise, handle CSRF verification for non-API routes
        return csrf_token(); // Return the CSRF token for web routes if needed
    }
}
