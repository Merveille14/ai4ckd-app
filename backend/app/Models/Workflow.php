// app/Models/Workflow.php
class Workflow extends Model
{
    protected $fillable = ['nom', 'description', 'patient_id'];

    public function etapes()
    {
        return $this->hasMany(WorkflowEtape::class)->orderBy('ordre');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}