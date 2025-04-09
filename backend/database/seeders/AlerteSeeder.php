<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Alerte;

class AlerteTableSeeder extends Seeder
{
    public function run()
    {
        Alerte::create([
            'patient_id' => 1,
            'type' => 'Examen critique',
            'message' => 'Créatinine hors norme détectée.',
            'date' => '2025-03-15',
        ]);

        Alerte::create([
            'patient_id' => 2,
            'type' => 'Rendez-vous annulé',
            'message' => 'Le rendez-vous du 12 avril 2025 est annulé.',
            'date' => '2025-04-10',
        ]);
    }
}
