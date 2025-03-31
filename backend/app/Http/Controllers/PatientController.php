<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $patients = Patient::with('medecin')->get();
        // return response()->json($patients);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $validated = $request->validate([
        //     'nom' => 'required|string',
        //     'prenom' => 'required|string',
        //     'dateNaissance' => 'required|date',
        //     'sexe' => 'required|string',
        //     'telephone' => 'required|string',
        //     'antecedents' => 'nullable|string',
        //     'traitements' => 'nullable|string',
        //     'historiqueMedical' => 'nullable|string',
        //     'medecin_id' => 'required|exists:users,id',
        // ]);

        // $patient = Patient::create($validated);
        // return response()->json($patient, 201);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // return response()->json($patient->load(['medecin', 'analyses', 'rapports']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
