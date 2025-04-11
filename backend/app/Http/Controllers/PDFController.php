<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFController extends Controller
{
    public function generatePatientPDF($id)
    {
        // Récupérer le patient et ses relations nécessaires
        $patient = Patient::with(['consultations', 'traitements', 'examens'])->find($id);
    
        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }
    
        // Préparer les données pour la vue
        $data = [
            'patient' => $patient,
            'consultations' => $patient->consultations,
            'traitements' => $patient->traitements,
            'examens' => $patient->examens
        ];
    
        // Charger la vue Blade et générer le PDF
        $pdf = Pdf::loadView('pdfs.patient_report', $data);
    
        // Retourner le PDF en téléchargement avec des en-têtes HTTP
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="Patient_' . $patient->nom . '_' . $patient->prenom . '.pdf"');
    }
    



/*public function generatePatientPDF($id)
{
    $patient = Patient::with(['consultations', 'traitements', 'examens'])->find($id);

    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    $data = [
        'patient' => $patient,
        'consultations' => $patient->consultations,
        'traitements' => $patient->traitements,
        'examens' => $patient->examens
    ];

    // Retourne la vue pour tester
    return view('pdfs.patient_report', $data);
}*/




}
