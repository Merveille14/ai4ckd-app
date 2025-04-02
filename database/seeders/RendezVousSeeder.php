<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RendezVousSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = DB::table('patients')->pluck('id')->toArray();
        $medecins = DB::table('users')->where('role', 'doctor')->pluck('id')->toArray();

        if (empty($patients) || empty($medecins)) {
            return; // Évite une erreur si les tables sont vides
        }

        $status = ['confirmé', 'annulé', 'reporté'];

        foreach (range(1, 10) as $index) {
            DB::table('rendezvous')->insert([
                'patient_id' => $patients[array_rand($patients)],
                'medecin_id' => $medecins[array_rand($medecins)],
                'date_rendezvous' => Carbon::now()->addDays(rand(1, 30))->format('Y-m-d'),
                'heure_rendezvous' => Carbon::createFromTime(rand(8, 17), rand(0, 59))->format('H:i:s'),
                'lieu' => 'Clinique ' . chr(rand(65, 90)), // Exemple : "Clinique A, B, C..."
                'status' => $status[array_rand($status)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
