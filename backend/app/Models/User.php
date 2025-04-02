<?php

namespace App\Models;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Roles disponibles
     */
    public const ROLES = [
        'medecin' => 'Médecin',
        'administrateur' => 'Administrateur'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active' 
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean', // Cast pour le statut
            'role' => 'string' 
        ];
    }

    /**
     * Relation avec les patients (pour les médecins)
     */
    public function patients()
    {
        return $this->hasMany(Patient::class, 'medecin_id');
    }

    /**
     * Relation avec les rapports
     */
    public function rapports()
    {
        return $this->hasMany(Rapport::class, 'medecin_id');
    }

    /**
     * Vérifie si l'utilisateur a un rôle spécifique
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Vérifie si l'utilisateur est actif
     */
    public function isActive(): bool
    {
        return $this->is_active === true;
    }

    /**
     * Scope pour les utilisateurs actifs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope pour les médecins
     */
    public function scopeMedecins($query)
    {
        return $query->where('role', 'medecin');
    }
}