<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'adresse',
        'telephone',
        'email',
        'medecin_id',
        
    ];

    /**
     * Un patient peut avoir plusieurs examens.
     */
    public function examens()
    {
        return $this->hasMany(Examen::class);
    }

    /**
     * Un patient peut avoir plusieurs consultations.
     */
    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }

    /**
     * Un patient peut avoir plusieurs traitements.
     */
    public function traitements()
    {
        return $this->hasMany(Traitement::class);
    }

    /**
     * Un patient peut avoir plusieurs diagnostics.
     */
    public function diagnostics()
    {
        return $this->hasMany(Diagnostic::class);
    }
}
