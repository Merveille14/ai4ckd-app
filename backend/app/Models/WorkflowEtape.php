<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowEtape extends Model
{
    use HasFactory;

    protected $fillable = ['workflow_id', 'type', 'date_prev', 'frequence', 'statut'];

    public function workflow()
    {
        return $this->belongsTo(Workflow::class, 'workflow_id');
    }
}
