<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alerte;

class AlerteController extends Controller
{
    public function index(Request $request)
{
    $alertes = Alerte::query();

    // Ajouter des filtres optionnels (par gravité ou statut)
    if ($request->has('niveau')) {
        $alertes->where('niveau', $request->niveau);
    }

    if ($request->has('statut')) {
        $alertes->where('statut', $request->statut);
    }

    return response()->json($alertes->paginate(10)); // Pagination par 10 éléments
}

public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'message' => 'required|string',
            'niveau' => 'required|in:info,warning,critique',
            'statut' => 'required|in:lu,non lu',
            'date' => 'required|date',
            'examen_id' => 'nullable|exists:examens,id',
            'patient_id' => 'required|exists:patients,id',
        ]);

        $alerte = Alerte::create($validated);
        return response()->json($alerte, 201);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 400);
    }
}

public function update(Request $request, $id)
{
    try {
        $alerte = Alerte::findOrFail($id); // Trouver l'alerte ou renvoyer une erreur
        
        $validated = $request->validate([
            'message' => 'nullable|string',
            'niveau' => 'nullable|in:info,warning,critique',
            'statut' => 'nullable|in:lu,non lu',
            'date' => 'nullable|date',
            'examen_id' => 'nullable|exists:examens,id',
            'patient_id' => 'nullable|exists:patients,id',
        ]);

        $alerte->update($validated);
        return response()->json($alerte);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 400);
    }
}


public function destroy($id)
{
    try {
        $alerte = Alerte::findOrFail($id); // Trouver l'alerte ou renvoyer une erreur
        $alerte->delete();
        return response()->json(['message' => 'Alerte supprimée avec succès']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 400);
    }
}



}
