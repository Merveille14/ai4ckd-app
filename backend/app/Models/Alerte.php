<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Http\Controllers\AlerteController;

class Alerte extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'niveau',
        'statut',
        'date',
        'examen_id',
        'patient_id',
    ];

    // Relation avec le modèle Patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // Relation avec le modèle Examen (si applicable)
    public function examen()
    {
        return $this->belongsTo(Examen::class);
    }

}
