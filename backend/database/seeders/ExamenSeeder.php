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
    // Vérifie la présence de patients
    $patients = Patient::all();
    if ($patients->isEmpty()) {
        $this->command->info('La table patients est vide. Ajoutez des patients avant de lancer ce seeder.');
        return;
    }

    // Vérifie la présence de médecins (avec rôle "doctor" au lieu de "medecin")
    $medecins = User::where('role', 'doctor')->get();
    if ($medecins->isEmpty()) {
        $this->command->info('La table users est vide ou aucun utilisateur avec le rôle "doctor" n’est présent.');
        return;
    }

    // Créer des examens pour chaque patient
    foreach ($patients as $patient) {
        $medecin = $medecins->random(); // Sélectionner un médecin aléatoire

        foreach (['Test sanguin', 'Analyse d’urine', 'Échographie'] as $type) {
            Examen::create([
                'patient_id' => $patient->id,
                'medecin_id' => $medecin->id,
                'type' => $type,
                'valeur' => rand(1, 100) / 10,
                'unite' => $this->getRandomUnite(),
                'date' => now()->addDays(rand(1, 30)),
                'resultats' => 'Résultats à interpréter.',
            ]);
        }
    }

    $this->command->info('Examens créés avec succès pour tous les patients.');
}

private function getRandomUnite()
{
    $unites = ['mg/L', 'g/dL', 'mmol/L', 'UI/L']; // Liste des unités possibles
    return $unites[array_rand($unites)]; // Retourne une unité aléatoire
}

}
