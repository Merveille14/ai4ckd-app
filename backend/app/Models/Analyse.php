<?php

namespace App\Models;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Analyse extends Model
{
    use HasFactory;

    /**
     * Les attributs mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'resultat',
        'patient_id',
        'medecin_id',
        'date_analyse',
    ];

    /**
     * Les dates à traiter comme des instances Carbon.
     *
     * @var array
     */
    protected $dates = [
        'date_analyse',
        'created_at',
        'updated_at'
    ];

    /**
     * Relation avec le patient.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Relation avec le médecin.
     */
    public function medecin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'medecin_id');
    }

    /**
     * Convertit le modèle en tableau.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'resultat' => $this->resultat,
            'date_analyse' => $this->date_analyse->format('Y-m-d'),
            'patient' => $this->patient->only(['id', 'nom', 'prenom']),
            'medecin' => $this->medecin->only(['id', 'name']),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
} 