<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Examen;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;

class ExamenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Récupérer tous les patients et les médecins
        $patients = Patient::all();
        $medecins = User::where('role', 'medecin')->get();  // Assurant que l'utilisateur est un médecin

        // Créer des examens pour chaque patient
        foreach ($patients as $patient) {
            // Sélectionner un médecin aléatoire
            $medecin = $medecins->random();

            // Créer plusieurs examens pour chaque patient
            foreach (['Test sanguin', 'Analyse d’urine', 'Échographie'] as $type) {
                Examen::create([
                    'patient_id' => $patient->id,
                    'medecin_id' => $medecin->id,
                    'type' => $type,
                    'valeur' => rand(1, 100) / 10,  // Valeur aléatoire entre 0.1 et 10
                    'unite' => $this->getRandomUnite(),
                    'date' => Carbon::now()->addDays(rand(1, 30)),  // Examen dans les 30 jours à venir
                    'resultats' => 'Résultats à interpréter.',
                ]);
            }
        }
    }

    /**
     * Retourner une unité aléatoire parmi celles définies.
     *
     * @return string
     */
    private function getRandomUnite()
    {
        $unites = ['mg/L', 'g/dL', 'mmol/L', 'UI/L'];
        return $unites[array_rand($unites)];
    }
}
