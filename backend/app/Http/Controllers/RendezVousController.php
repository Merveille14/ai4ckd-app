<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RendezVous;

class RendezVousController extends Controller
{
    
    public function index()
{
    $rendezVous = RendezVous::with('patient')->paginate(10);
    return response()->json(['status' => 'success', 'data' => $rendezVous], 200);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'patient_id' => 'required|exists:patients,id',
        'date_rendezvous' => 'required|date|after:now',
        'heure_rendezvous' => 'required|date_format:H:i',
        'lieu' => 'nullable|string|max:255',
        'medecin_id' => 'nullable|exists:users,id',
        'status' => 'required|in:confirmé,annulé,reporté',
        
    ]);

    $rendezVous = RendezVous::create($validated);
    return response()->json(['status' => 'success', 'data' => $rendezVous], 201);
}
public function show($id)
{
    $rendezVous = RendezVous::with(['patient', 'medecin'])->findOrFail($id);
    return response()->json(['status' => 'success', 'data' => $rendezVous], 200);
}


public function update(Request $request, $id)
{
    $validated = $request->validate([
        'patient_id' => 'nullable|exists:patients,id',
        'date_rendezvous' => 'nullable|date|after:now',
        'heure_rendezvous' => 'nullable|date_format:H:i',
        'lieu' => 'nullable|string|max:255',
        'medecin_id' => 'nullable|exists:users,id',
        'status' => 'nullable|in:confirmé,annulé,reporté',
        
    ]);

    $rendezVous = RendezVous::findOrFail($id);
    $rendezVous->update($validated);

    return response()->json(['status' => 'success', 'data' => $rendezVous], 200);
}

public function destroy($id)
{
    $rendezVous = RendezVous::findOrFail($id);
    $rendezVous->delete();

    return response()->json(['status' => 'success', 'message' => 'Rendez-vous supprimé avec succès'], 200);
}

}
