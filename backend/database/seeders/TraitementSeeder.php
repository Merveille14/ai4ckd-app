<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class TraitementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = DB::table('patients')->pluck('id')->toArray();
        $diagnostics = DB::table('diagnostics')->pluck('id')->toArray();

        if (empty($patients) || empty($diagnostics)) {
            return; // Évite une erreur si les tables sont vides
        }

        $medicaments = ['Paracétamol', 'Ibuprofène', 'Amoxicilline', 'Metformine', 'Atorvastatine'];
        $statuts = ['en_cours', 'terminé', 'interrompu'];

        foreach (range(1, 10) as $index) {
            DB::table('traitements')->insert([
                'patient_id' => $patients[array_rand($patients)],
                'diagnostic_id' => $diagnostics[array_rand($diagnostics)],
                'nom_medicament' => $medicaments[array_rand($medicaments)],
                'date_prescription' => Carbon::now()->subDays(rand(1, 30)),
                'posologie' => rand(1, 3) . ' comprimés par jour',
                'duree' => rand(5, 14) . ' jours',
                'status' => $statuts[array_rand($statuts)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
