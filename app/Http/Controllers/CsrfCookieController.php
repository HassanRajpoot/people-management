<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsrfCookieController extends Controller
{
    /**
     * Get the CSRF token cookie.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        return response()->json(['csrfToken' => csrf_token()]);
    }
}
