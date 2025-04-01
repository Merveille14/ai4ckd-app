<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'dateNaissance' => 'required|date',
            'sexe' => 'required|string|in:Masculin,Féminin,Autre',
            'telephone' => 'required|string|max:20',
            'antecedents' => 'nullable|string',
            'traitements' => 'nullable|string',
            'historiqueMedical' => 'nullable|string',
            'medecin_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = Patient::create($request->all());

        return response()->json([
            'status' => true,
            'patient' => $patient,
            'message' => 'Patient créé avec succès'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $patient = Patient::with('medecin')->find($id);

        if (!$patient) {
            return response()->json([
                'status' => false,
                'message' => 'Patient non trouvé'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'patient' => $patient
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
