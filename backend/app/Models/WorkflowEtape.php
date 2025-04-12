// app/Models/WorkflowEtape.php
class WorkflowEtape extends Model
{
    protected $fillable = [
        'type', 
        'date_prevue', 
        'frequence', 
        'statut',
        'ordre',
        'workflow_id'
    ];

    public function workflow()
    {
        return $this->belongsTo(Workflow::class);
    }
}