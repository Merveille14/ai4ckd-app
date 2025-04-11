<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Document;


class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'prenom', 'date_naissance', 'sexe', 'adresse', 'telephone',
        'email', 'numero_dossier', 'medecin_id', 'derniere_consultation', 'antecedents'
    ];


    /**
     * Un patient peut avoir plusieurs consultations.
     */
    public function consultation()
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

    public function medecin()
{
    return $this->belongsTo(User::class, 'medecin_id');
}


public function consultations()
{
    return $this->hasMany(Consultation::class, 'patient_id');
}

public function rapports()
{
    return $this->hasMany(Rapport::class, 'patient_id');
}
 //Un patient peut avoir plusieurs examens
public function examens()
{
    return $this->hasMany(Examen::class, 'patient_id');
}

public function documents()
{
    return $this->hasMany(Document::class, 'patient_id');
}


}
