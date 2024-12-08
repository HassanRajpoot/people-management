<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use Illuminate\Support\Facades\Mail;
use App\Mail\PersonCapturedMail;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::with('user')->get();
        return inertia('People/Index', compact('people'));
    }

    public function create()
    {
        return inertia('People/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',  // Ensure the user exists (optional)
            'name' => 'required|string',
            'surname' => 'required|string',
            'south_african_id' => 'required|string',
            'mobile_number' => 'required|string',
            'email' => 'required|email|unique:people,email',
            'birth_date' => 'required|date',
            'language' => 'required|string',
            'interests' => 'required|array', // Ensure interests is an array
        ]);

        // Create the person record with the validated data
        $person = Person::create($validated);

        // Send email notification if needed
        // Mail::to($person->email)->send(new PersonCapturedMail($person));

        // Redirect to the people index page
        return redirect()->route('people.index');
    }

    public function show(Person $person)
    {
        return inertia('People/Show', compact('person'));
    }

    public function edit(Person $person)
    {
        return inertia('People/Edit', compact('person'));
    }

    public function update(Request $request, Person $person)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',  // Ensure the user exists (optional)
            'name' => 'required|string',
            'surname' => 'required|string',
            'south_african_id' => 'required|string',
            'mobile_number' => 'required|string',
            'email' => 'required|email|unique:people,email,' . $person->id,
            'birth_date' => 'required|date',
            'language' => 'required|string',
            'interests' => 'required|array', // Ensure interests is an array
        ]);

        // Update the person record with the validated data
        $person->update($validated);

        // Redirect to the people index page
        return redirect()->route('people.index');
    }

    public function destroy(Person $person)
    {
        $person->delete();

        return redirect()->route('people.index');
    }
}
