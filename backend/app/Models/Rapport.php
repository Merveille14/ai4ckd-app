<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    protected $fillable = [
        'patient_id', 'medecin_id', 'dateCreation', 'contenu', 'chemin_pdf'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function medecin()
    {
        return $this->belongsTo(User::class, 'medecin_id');
    }
}
