<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('patients')->insert([
            [
                'nom' => 'Doe',
                'prenom' => 'John',
                'date_naissance' => '1985-07-12',
                'sexe' => 'Homme',
                'adresse' => '123 Rue Principale, Paris',
                'telephone' => '0123456789',
                'medecin_id' => 1, 
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nom' => 'Dupont',
                'prenom' => 'Sophie',
                'date_naissance' => '1992-03-25',
                'sexe' => 'Femme',
                'adresse' => '45 Avenue des Champs, Lyon',
                'telephone' => '0987654321',
                'medecin_id' => 2, 
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
