<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table = 'patients';
    protected $fillable = [
        'nom', 'prenom', 'dateNaissance', 'sexe', 'telephone', 
        'antecedents', 'traitements', 'historiqueMedical', 'medecin_id'
    ];

    // Relation avec le médecin
    public function medecin()
    {
        return $this->belongsTo(User::class, 'medecin_id');
    }

    // Relation avec les analyses
    public function analyses()
    {
        return $this->hasMany(Analyse::class);
    }

    // Relation avec les rapports
    public function rapports()
    {
        return $this->hasMany(Rapport::class);
    }

    // Relation avec les alertes
    public function alertes()
    {
        return $this->hasMany(Alerte::class);
    }
}
