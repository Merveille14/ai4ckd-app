<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Alerte;
use App\Models\RendezVous;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Nombre total de patients
        $totalPatients = Patient::count();

        // Vérifier la présence d'alertes critiques
        $alertesCritiques = Alerte::where('niveau', 'critique')->where('statut', 'non lu')->count();

        // Récupérer les prochains rendez-vous pour la semaine
        $prochainsRendezVous = RendezVous::whereBetween('date_rendezvous', [now(), now()->addWeek()])->get();

        // Données pour le graphique d'évolution
        $consultationsParMois = Patient::join('consultations', 'patients.id', '=', 'consultations.patient_id')
            ->selectRaw('MONTH(consultations.date) as mois, COUNT(*) as total')
            ->groupBy('mois')
            ->orderBy('mois', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'totalPatients' => $totalPatients,
                'alertesCritiques' => $alertesCritiques,
                'prochainsRendezVous' => $prochainsRendezVous,
                'consultationsParMois' => $consultationsParMois,
            ],
        ]);
    }

    public function countPatients()
    {
        $totalPatients = Patient::count();

        if ($totalPatients === 0) {
            return response()->json(['status' => 'error', 'message' => 'Aucun patient trouvé.'], 404);
        }

        return response()->json(['status' => 'success', 'data' => ['totalPatients' => $totalPatients]]);
    }

    public function criticalAlerts()
    {
        $criticalAlerts = Alerte::where('niveau', 'critique')->where('statut', 'non lu')->get();

        if ($criticalAlerts->isEmpty()) {
            return response()->json(['status' => 'error', 'message' => 'Aucune alerte critique trouvée.'], 404);
        }

        return response()->json(['status' => 'success', 'data' => ['criticalAlerts' => $criticalAlerts]]);
    }

    public function upcomingRendezVous()
    {
        $upcomingRendezVous = RendezVous::whereBetween('date_rendezvous', [now(), now()->addWeek()])->paginate(10);

        if ($upcomingRendezVous->isEmpty()) {
            return response()->json(['status' => 'error', 'message' => 'Aucun rendez-vous à venir trouvé.'], 404);
        }

        return response()->json(['status' => 'success', 'data' => ['upcomingRendezVous' => $upcomingRendezVous]]);
    }

    public function evolutionGraph()
    {
        $evolutionData = Patient::join('consultations', 'patients.id', '=', 'consultations.patient_id')
            ->selectRaw('MONTH(consultations.date) as mois, COUNT(*) as total')
            ->groupBy('mois')
            ->orderBy('mois', 'asc')
            ->get();

        if ($evolutionData->isEmpty()) {
            return response()->json(['status' => 'error', 'message' => 'Aucune donnée pour le graphique trouvée.'], 404);
        }

        return response()->json(['status' => 'success', 'data' => ['evolutionData' => $evolutionData]]);
    }
}
