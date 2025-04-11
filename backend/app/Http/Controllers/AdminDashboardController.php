<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Consultation;
use App\Models\Workflow;
use App\Models\WorkflowEtape;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function getStats()
{
    // Statistiques sur les patients
    $totalPatients = Patient::count();
    $patientsLastMonth = Patient::whereHas('consultations', function($query) {
        $query->where('date', '>', now()->subMonth());
    })->count();

    // Statistiques sur les workflows
    $totalWorkflows = Workflow::count();
    $completedEtapes = WorkflowEtape::where('statut', 'terminé')->count();
    $pendingEtapes = WorkflowEtape::where('statut', 'en attente')->count();

    // Statistiques sur les consultations
    $consultationsLastMonth = Consultation::where('date', '>', now()->subMonth())->count();

    return response()->json([
        'patients' => [
            'total' => $totalPatients,
            'last_month' => $patientsLastMonth
        ],
        'workflows' => [
            'total' => $totalWorkflows,
            'completed_etapes' => $completedEtapes,
            'pending_etapes' => $pendingEtapes
        ],
        'consultations' => [
            'last_month' => $consultationsLastMonth
        ]
    ]);
}

public function getLogs()
{
    $logs = file(storage_path('logs/laravel.log')); // Lire les logs Laravel
    return response()->json(['logs' => $logs]);
}


}
