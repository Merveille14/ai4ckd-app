<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;

class ExamenController extends Controller
{
    // 1. Récupérer tous les examens d’un patient
    public function index($patientId)
    {
        $examens = Examen::where('patient_id', $patientId)
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($examens);
    }

    // 2. Créer une demande d’examen
    public function store(Request $request, $patientId)
    {
        $validated = $request->validate([
            'type'   => 'required|string|max:255',
            'valeur' => 'required|numeric',
            'unite'  => 'required|string|max:50',
            'date'   => 'required|date',
            'note'   => 'nullable|string',
        ]);

        $examen = Examen::create([
            'patient_id'  => $patientId,
            'type'        => $validated['type'],
            'valeur'      => $validated['valeur'],
            'unite'       => $validated['unite'],
            'date'        => $validated['date'],
            'note'        => $validated['note'] ?? null,
            'status'      => 'en attente',
            'medecin_id'  => auth()->id() ?? 1, // fallback pour test
        ]);

        return response()->json(['message' => 'Demande enregistrée', 'examen' => $examen], 201);
    }

    // 3. Enregistrer les résultats par le laborantin
    public function updateResult(Request $request, $id)
    {
        $validated = $request->validate([
            'valeur' => 'required|numeric',
            'unite'  => 'required|string|max:50',
        ]);

        $examen = Examen::find($id);

        if (!$examen) {
            return response()->json(['message' => 'Examen introuvable'], 404);
        }

        $examen->update([
            'valeur' => $validated['valeur'],
            'unite'  => $validated['unite'],
            'status' => 'validé',
        ]);

        return response()->json(['message' => 'Résultat enregistré', 'examen' => $examen]);
    }

    // 4. Supprimer un examen
    public function destroy($id)
    {
        $examen = Examen::find($id);

        if (!$examen) {
            return response()->json(['message' => 'Examen introuvable'], 404);
        }

        $examen->delete();

        return response()->json(['message' => 'Examen supprimé avec succès']);
    }
    public function pending()
{
    $examens = Examen::with('patient')
        ->where('status', 'en attente')
        ->orderBy('date', 'desc')
        ->get();

    return response()->json($examens);
}
}
