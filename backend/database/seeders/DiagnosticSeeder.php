<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DiagnosticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = DB::table('patients')->pluck('id')->toArray();
        $consultations = DB::table('consultations')->pluck('id')->toArray();
        
        if (empty($patients) || empty($consultations)) {
            return; // Évite une erreur si les tables sont vides
        }

        $stades = ['stade_1', 'stade_2', 'stade_3', 'stade_4', 'stade_5'];

        foreach (range(1, 10) as $index) {
            DB::table('diagnostics')->insert([
                'patient_id' => $patients[array_rand($patients)],
                'consultation_id' => $consultations[array_rand($consultations)],
                'stade_maladie' => $stades[array_rand($stades)],
                'diagnostic' => Str::random(50),
                'date_diagnostic' => Carbon::now()->subDays(rand(1, 30)),
                'commentaires' => rand(0, 1) ? Str::random(100) : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
