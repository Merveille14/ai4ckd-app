<?php

namespace App\Models;
<<<<<<< HEAD
use App\Models\Patient;
=======

use Illuminate\Database\Eloquent\Factories\HasFactory;
>>>>>>> origin/mv
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
<<<<<<< HEAD
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
=======
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

>>>>>>> origin/mv
}
