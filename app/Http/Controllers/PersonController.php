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
        $people = Person::all();
        return inertia('People/Index', compact('people'));
    }

    public function create()
    {
        return inertia('People/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'south_african_id' => 'required|string',
            'mobile_number' => 'required|string',
            'email' => 'required|email|unique:people,email',
            'birth_date' => 'required|date',
            'language' => 'required|string',
            'interests' => 'required|array',
        ]);

        $person = Person::create($validated);
        // Mail::to($person->email)->send(new PersonCapturedMail($person));
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
        $validated = $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'south_african_id' => 'required|string',
            'mobile_number' => 'required|string',
            'email' => 'required|email|unique:people,email,' . $person->id,
            'birth_date' => 'required|date',
            'language' => 'required|string',
            'interests' => 'required|array',
        ]);

        $person->update($validated);

        return redirect()->route('people.index');
    }

    public function destroy(Person $person)
    {
        $person->delete();

        return redirect()->route('people.index');
    }
}
