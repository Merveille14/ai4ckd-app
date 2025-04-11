<?php



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    // Liste de tous les patients
    public function getPatientList(Request $request)
    {
        $patients = Patient::with('medecin')
        ->select('id', 'nom', 'prenom', 'date_naissance', 'sexe', 'adresse', 'telephone', 'email', 'numero_dossier', 'derniere_consultation', 'medecin_id')
        ->get();
        return response()->json(['patients' => $patients,
                                'total' => $patients->count()]);
        

    }

    // Détails d'un patient spécifique
    public function getPatientById($id)
    {
        $patient = Patient::with('medecin', 'consultations', 'traitements', 'examens', 'documents')
            ->where('id', $id)
            ->first();

        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        return response()->json(['patient' => $patient]);
    }

    // Ajouter un nouveau patient
    public function storePatient(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'sexe' => 'required|in:Homme,Femme',
            'adresse' => 'nullable|string',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:patients,email',
            'numero_dossier' => 'nullable|string|unique:patients,numero_dossier',
            'medecin_id' => 'required|exists:users,id',
            'antecedents' => 'nullable|string',
            'derniere_consultation' => 'nullable|date',
        ]);

        $patient = Patient::create($validatedData);

        return response()->json(['message' => 'Patient created successfully', 'patient' => $patient], 201);
    }


    // Modifier un patient existant
    public function updatePatient(Request $request, $id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $validatedData = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'date_naissance' => 'sometimes|date',
            'sexe' => 'sometimes|in:Homme,Femme',
            'adresse' => 'nullable|string',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:patients,email,' . $id,
            'numero_dossier' => 'nullable|string|unique:patients,numero_dossier,' . $id,
            'medecin_id' => 'sometimes|exists:users,id',
            'antecedents' => 'nullable|string'
        ]);

        $patient->update($validatedData);

        return response()->json(['message' => 'Patient updated successfully', 'patient' => $patient]);
    }


    // Supprimer un patient
    public function deletePatient($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully']);
    }
    public function getPatientDetails($id)
    {
        $patient = Patient::with(['consultations', 'traitements', 'examens', 'documents'])
            ->where('id', $id)
            ->first();

        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        return response()->json([
            'id' => $patient->id,
            'nom' => $patient->nom,
            'prenom' => $patient->prenom,
            'date_naissance' => $patient->date_naissance,
            'sexe' => $patient->sexe,
            'adresse' => $patient->adresse,
            'telephone' => $patient->telephone,
            'email' => $patient->email,
            'numero_dossier' => $patient->numero_dossier,
            'antecedents' => $patient->antecedents, // Texte des antécédents médicaux
            'historique_consultations' => $patient->consultations,
            'traitements_en_cours' => $patient->traitements,
            'resultats_examens' => $patient->examens->where('status', 'validé')->values(),
            'documents' => $patient->documents,
        ]);
    }


}
