<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Champs pouvant être assignés en masse
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
<<<<<<< HEAD
        'role',
=======
        'role',           
        'phone_number',
        'specialization', 
        'address',
        'is_active',      
>>>>>>> origin/mv
    ];

    // Champs cachés lors de la sérialisation
    protected $hidden = [
        'password',
        'remember_token',
    ];

<<<<<<< HEAD
    // Relation avec les patients (pour les médecins)
    public function patients()
    {
        return $this->hasMany(Patient::class, 'medecin_id');
    }

    // Relation avec les rapports
    public function rapports()
    {
        return $this->hasMany(Rapport::class, 'medecin_id');
    }
=======
    // Définition des relations
>>>>>>> origin/mv

    /**
     * Un utilisateur (médecin, infirmier, etc.) peut réaliser plusieurs examens.
     */
    public function examens()
    {
        return $this->hasMany(Examen::class, 'medecin_id');
    }

    /**
     * Un utilisateur peut réaliser plusieurs consultations.
     */
    public function consultations()
    {
        return $this->hasMany(Consultation::class, 'medecin_id');
    }

    /**
     * Un utilisateur (par exemple, un médecin) reçoit plusieurs notifications.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'medecin_id');
    }
}
