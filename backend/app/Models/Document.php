<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'type', 'date', 'lien', 'patient_id'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
