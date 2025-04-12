public function store(Request $request, $patientId)
{
    // Valider que le patient existe
    $patient = Patient::findOrFail($patientId);

    $validatedData = $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'nullable|string',
        'etapes' => 'required|array|min:1',
        'etapes.*.type' => 'required|string|in:Prise de sang,Consultation,Examen imagerie,Livraison médicaments,Génération bilan PDF,Notification patient',
        'etapes.*.date_prevue' => 'required|date|after_or_equal:today',
        'etapes.*.frequence' => 'nullable|string|in:quotidien,hebdomadaire,mensuel,annuel',
    ]);

    // Création du workflow
    $workflow = $patient->workflows()->create([
        'nom' => $validatedData['nom'],
        'description' => $validatedData['description']
    ]);

    // Création des étapes
    $etapes = collect($validatedData['etapes'])->map(function ($etape, $index) {
        return new WorkflowEtape([
            'type' => $etape['type'],
            'date_prevue' => $etape['date_prevue'],
            'frequence' => $etape['frequence'],
            'ordre' => $index + 1
        ]);
    });

    $workflow->etapes()->saveMany($etapes);

    return response()->json([
        'message' => 'Workflow créé avec succès',
        'data' => $workflow->load('etapes')
    ], 201);
}