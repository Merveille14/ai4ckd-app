<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Consultation;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;

class ConsultationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Récupérer des patients et des médecins (utilisateurs)
        $patients = Patient::all();
        $medecins = User::where('role', 'medecin')->get();  // Assurant que l'utilisateur est un médecin

        // Créer des consultations
        foreach ($patients as $patient) {
            // Sélectionner un médecin aléatoire
            $medecin = $medecins->random();

            // Créer une consultation
            Consultation::create([
                'patient_id' => $patient->id,
                'medecin_id' => $medecin->id,
                'date' => Carbon::now()->addDays(rand(1, 30)),  // Consultation dans les 30 jours à venir
                'motif' => 'Consultation générale',
                'observations' => 'Aucune observation particulière.',
            ]);
        }
    }
}
