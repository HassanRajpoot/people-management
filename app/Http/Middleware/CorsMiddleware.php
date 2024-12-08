<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // List of allowed origins
        $allowedOrigins = [
            'http://localhost:49902',
            'http://127.0.0.1:49902',
            'http://localhost:60181',
            'http://127.0.0.1:60181'
        ];

        // Check if the request's origin is in the allowed list
        $origin = $request->header('Origin');

        // Handle preflight OPTIONS requests
        if ($request->isMethod('OPTIONS')) {
            $response = response('', 200, [
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Max-Age' => '86400'
            ]);

            // Set the Access-Control-Allow-Origin header
            if (in_array($origin, $allowedOrigins)) {
                $response->header('Access-Control-Allow-Origin', $origin);
            }

            return $response;
        }

        // Process the request
        $response = $next($request);
        
        // Set the Access-Control-Allow-Origin header
        if (in_array($origin, $allowedOrigins)) {
            $response->header('Access-Control-Allow-Origin', $origin);
        }
        
        return $response;
    }
}