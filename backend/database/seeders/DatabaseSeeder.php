<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            PatientSeeder::class,
            //ConsultationSeeder::class,
            DiagnosticSeeder::class,
            TraitementSeeder::class,
            RendezVousSeeder::class,
        ]);
    }
}
