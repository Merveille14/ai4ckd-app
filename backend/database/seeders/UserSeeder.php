<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

    
    class UserSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {
            // Exemple d'utilisateur médecin
            User::create([
                'first_name'    => 'Alice',
                'last_name'     => 'Dupont',
                'email'         => 'alice.dupont@example.com',
                'password'      => Hash::make('password'), // assurez-vous d'utiliser un mot de passe sécurisé en prod
                'role'          => 'doctor', // peut être 'doctor', 'nurse', 'admin' ou 'staff'
                'phone_number'  => '0123456789',
                'specialization'=> 'Néphrologie',
                'address'       => '123 rue de la Santé, Paris',
                'is_active'     => true,
            ]);
    
            // Exemple d'utilisateur administrateur
            User::create([
                'first_name'    => 'Bob',
                'last_name'     => 'Martin',
                'email'         => 'bob.martin@example.com',
                'password'      => Hash::make('password'),
                'role'          => 'admin',
                'phone_number'  => '0987654321',
                'specialization'=> null,
                'address'       => '456 avenue des Hôpitaux, Lyon',
                'is_active'     => true,
            ]);
        }
    }
    

