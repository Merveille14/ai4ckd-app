<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workflow;
use App\Models\WorkflowEtape;

class WorkflowController extends Controller
{
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'nullable|string',
        'etapes' => 'required|array',
        'etapes.*.type' => 'required|string|max:255',
        'etapes.*.date_prev' => 'required|date',
        'etapes.*.frequence' => 'nullable|string',
    ]);

    $workflow = Workflow::create($validatedData);

    foreach ($validatedData['etapes'] as $etape) {
        WorkflowEtape::create(array_merge($etape, ['workflow_id' => $workflow->id]));
    }

    return response()->json(['message' => 'Workflow created successfully', 'workflow' => $workflow], 201);
}

public function index()
{
    $workflows = Workflow::with('etapes')->get();

    return response()->json(['workflows' => $workflows]);
}

public function update(Request $request, $id)
{
    // Trouver le workflow à modifier
    $workflow = Workflow::with('etapes')->find($id);

    if (!$workflow) {
        return response()->json(['message' => 'Workflow not found'], 404);
    }

    // Valider les données reçues
    $validatedData = $request->validate([
        'nom' => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'etapes' => 'sometimes|array',
        'etapes.*.id' => 'nullable|exists:workflow_etapes,id', // Vérifie si l'étape existe
        'etapes.*.type' => 'sometimes|string|max:255',
        'etapes.*.date_prev' => 'sometimes|date',
        'etapes.*.frequence' => 'nullable|string',
        'etapes.*.statut' => 'nullable|in:en attente,terminé,annulé'
    ]);

    // Mise à jour du workflow
    $workflow->update([
        'nom' => $validatedData['nom'] ?? $workflow->nom,
        'description' => $validatedData['description'] ?? $workflow->description
    ]);

    // Mettre à jour ou ajouter les étapes
    if (isset($validatedData['etapes'])) {
        foreach ($validatedData['etapes'] as $etapeData) {
            if (isset($etapeData['id'])) {
                // Mise à jour d'une étape existante
                $etape = WorkflowEtape::find($etapeData['id']);
                if ($etape) {
                    $etape->update($etapeData);
                }
            } else {
                // Création d'une nouvelle étape
                WorkflowEtape::create(array_merge($etapeData, ['workflow_id' => $workflow->id]));
            }
        }
    }

    return response()->json(['message' => 'Workflow updated successfully', 'workflow' => $workflow]);
}


public function show($id)
{
    $workflow = Workflow::with(['etapes', 'patients'])->find($id);

    if (!$workflow) {
        return response()->json(['message' => 'Workflow not found'], 404);
    }

    return response()->json([
        'workflow' => $workflow,
    ]);
}

public function destroy($id)
{
    $workflow = Workflow::find($id);

    if (!$workflow) {
        return response()->json(['message' => 'Workflow not found'], 404);
    }

    $workflow->delete();

    return response()->json(['message' => 'Workflow deleted successfully']);
}



}
