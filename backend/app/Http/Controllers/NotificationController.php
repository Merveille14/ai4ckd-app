<?php

namespace App\Http\Controllers;

use App\Models\WorkflowEtape;
use App\Notifications\WorkflowReminderNotification;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{public function sendWorkflowReminder($id)
    {
        $etape = WorkflowEtape::find($id);
    
        if (!$etape) {
            return response()->json(['message' => 'Étape not found'], 404);
        }
    
        // Vérifier si le workflow est lié
        $workflow = $etape->workflow;
        if (!$workflow) {
            return response()->json(['message' => 'Workflow not found'], 404);
        }
    
        // Récupérer le médecin lié au patient
        $patient = $workflow->patients->first(); // Supposons qu'au moins un patient soit lié
        if (!$patient) {
            return response()->json(['message' => 'No patients found in workflow'], 404);
        }
    
        $medecin = $patient->medecin;
        if (!$medecin) {
            return response()->json(['message' => 'Médecin not found'], 404);
        }
    
        Notification::send($medecin, new WorkflowReminderNotification($etape));
    
        return response()->json(['message' => 'Notification sent successfully to the doctor']);
    }
    
}
