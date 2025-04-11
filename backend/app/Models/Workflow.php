<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workflow extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description'];

    public function etapes()
    {
        return $this->hasMany(WorkflowEtape::class, 'workflow_id');
    }

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'workflow_patient', 'workflow_id', 'patient_id');
    }
}
