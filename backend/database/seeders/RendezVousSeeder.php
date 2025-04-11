<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RendezVous;

class RendezVousSeeder extends Seeder
{
    public function run()
    {
        RendezVous::create([
            'patient_id' => 1,
            'date_rendezvous' => '2025-04-10',
            'heure_rendezvous' => '14:30',
            'lieu' => 'Clinique Cotonou',
            'medecin_id' => 1,
            'status' => 'confirmé',
            'description' => 'Consultation de suivi pour MRC',
        ]);

        RendezVous::create([
            'patient_id' => 2,
            'date_rendezvous' => '2025-04-12',
            'heure_rendezvous' => '10:00',
            'lieu' => 'Clinique Akpakpa',
            'medecin_id' => 2,
            'status' => 'annulé',
            'description' => 'Examen de routine',
        ]);
    }
}
