<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class PeopleController extends Controller
{
    protected function validationRules($id = null)
    {
        return [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'south_african_id' => 'required|string|max:13|unique:people,south_african_id' . ($id ? ',' . $id : ''),
            'mobile_number' => 'required|string|max:15|unique:people,mobile_number' . ($id ? ',' . $id : ''),
            'email' => 'required|email|max:255|unique:people,email' . ($id ? ',' . $id : ''),
            'birth_date' => 'required|date',
            'language' => 'nullable|string|max:255',
            'interests' => 'nullable|array',
        ];
    }

    // Get all people
    public function index()
    {
        try {
            $people = Person::all();

            return response()->json([
                'message' => 'People retrieved successfully.',
                'people' => $people,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving people: ' . $e->getMessage());
            return response()->json(['message' => 'Unable to retrieve people.'], 500);
        }
    }

    // Create a new person
    public function store(Request $request)
    {
        $validated = $request->validate($this->validationRules());

        try {
            $person = Person::create([
                'user_id' => $request->user_id, // Optional user association
                'name' => $validated['name'],
                'surname' => $validated['surname'],
                'south_african_id' => $validated['south_african_id'],
                'mobile_number' => $validated['mobile_number'],
                'email' => $validated['email'],
                'birth_date' => $validated['birth_date'],
                'language' => $validated['language'] ?? null,
                'interests' => isset($validated['interests']) ? json_encode($validated['interests']) : null,
            ]);

            return response()->json([
                'message' => 'Person created successfully.',
                'person' => $person,
            ], 201);
        } catch (QueryException $e) {
            Log::error('Error creating person: ' . $e->getMessage());
            return response()->json(['message' => 'Unable to save person.'], 500);
        }
    }

    // Show a single person
    public function show($id)
    {
        try {
            $person = Person::findOrFail($id);

            return response()->json([
                'message' => 'Person retrieved successfully.',
                'person' => $person,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Person not found.'], 404);
        }
    }

    // Update a person
    public function update(Request $request, $id)
    {
        $validated = $request->validate($this->validationRules($id));

        try {
            $person = Person::findOrFail($id);

            $person->update([
                'user_id' => $request->user_id ?? $person->user_id,
                'name' => $validated['name'],
                'surname' => $validated['surname'],
                'south_african_id' => $validated['south_african_id'],
                'mobile_number' => $validated['mobile_number'],
                'email' => $validated['email'],
                'birth_date' => $validated['birth_date'],
                'language' => $validated['language'] ?? null,
                'interests' => isset($validated['interests']) ? json_encode($validated['interests']) : null,
            ]);

            return response()->json([
                'message' => 'Person updated successfully.',
                'person' => $person,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Person not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unable to update person.'], 500);
        }
    }

    // Delete a person
    public function destroy($id)
    {
        try {
            $person = Person::findOrFail($id);
            $person->delete();

            return response()->json(['message' => 'Person deleted successfully.'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Person not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unable to delete person.'], 500);
        }
    }
}