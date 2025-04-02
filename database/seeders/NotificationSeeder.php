<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Récupérer tous les médecins
        $medecins = User::where('role', 'medecin')->get();  // Assurant que l'utilisateur est un médecin

        // Créer des notifications pour chaque médecin
        foreach ($medecins as $medecin) {
            // Créer plusieurs notifications pour chaque médecin
            foreach (['Rappel: Nouvelle consultation', 'Votre agenda a été mis à jour', 'Une nouvelle prescription vous attend'] as $message) {
                Notification::create([
                    'medecin_id' => $medecin->id,
                    'message' => $message,
                    'vu' => rand(0, 1) == 1,  // Marquer la notification comme vue ou non aléatoirement
                    'created_at' => Carbon::now()->subDays(rand(0, 30)),  // Notification créée dans les 30 derniers jours
                    'updated_at' => Carbon::now(),  // La notification est mise à jour maintenant
                ]);
            }
        }
    }
}
