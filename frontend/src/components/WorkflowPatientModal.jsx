import React, { useState } from 'react';
import { GripVertical, Plus, Trash2, Save, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import api from '@/services/axios';

const stepOptions = [
  'Prise de sang',
  'Consultation',
  'Examen imagerie',
  'Livraison médicaments',
  'Génération bilan PDF',
  'Notification patient'
];

export default function WorkflowPatientModal({ onClose, patientId, onWorkflowSaved }) {
  const [workflow, setWorkflow] = useState({
    title: '',
    description: '',
    steps: []
  });
  const [selectedStep, setSelectedStep] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const addStep = () => {
    if (!selectedStep) return;
    setWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, { id: uuidv4(), title: selectedStep, done: false }]
    }));
    setSelectedStep('');
  };

  const removeStep = (id) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s.id !== id)
    }));
  };

  const handleSubmit = async () => {
    try {
      const etapesFormatBackend = workflow.steps.map((step, index) => ({
        type: step.title,
        date_prevue: new Date().toISOString().split('T')[0],
        frequence: null,
        ordre: index + 1
      }));
  
      const response = await api.post(`/patients/${patientId}/workflows`, {
        nom: workflow.title,
        description: workflow.description,
        etapes: etapesFormatBackend
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      // Vérification explicite de la réponse
      if (response.status >= 200 && response.status < 300) {
        setMessage("Workflow enregistré !");
        setMessageType("success");
        
        setTimeout(() => {
          onWorkflowSaved(); // Rafraîchir les données
          onClose(); // Fermer le modal
        }, 1500);
      } else {
        throw new Error(`Réponse inattendue: ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur détaillée:", {
        error: error.response?.data || error.message,
        config: error.config
      });
      
      setMessage(error.response?.data?.message || 
                error.message || 
                "Erreur lors de l'enregistrement");
      setMessageType("error");
    }
  };
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.40)] z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4 relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-[#0c4687]">Configurer le Workflow</h2>

        {message && (
          <div className={`p-2 rounded text-sm font-medium ${
            messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>{message}</div>
        )}

        <input type="text" placeholder="Titre du workflow"
          className="w-full border p-2 rounded"
          value={workflow.title}
          onChange={(e) => setWorkflow({ ...workflow, title: e.target.value })} />

        <textarea placeholder="Description"
          className="w-full border p-2 rounded"
          value={workflow.description}
          onChange={(e) => setWorkflow({ ...workflow, description: e.target.value })} />

        <div className="flex gap-2 items-center">
          <select value={selectedStep} onChange={e => setSelectedStep(e.target.value)} className="border p-2 rounded w-full">
            <option value="">Ajouter une étape...</option>
            {stepOptions.map(step => (
              <option key={step} value={step}>{step}</option>
            ))}
          </select>
          <button onClick={addStep} className="bg-[#9ac441] text-white px-3 py-2 rounded hover:bg-[#7fa637]">
            <Plus size={16} />
          </button>
        </div>

        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {workflow.steps.map((step, index) => (
            <li key={step.id} className="flex items-center justify-between bg-gray-50 border p-3 rounded shadow-sm">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-gray-400" />
                <span>{index + 1}. {step.title}</span>
              </div>
              <button onClick={() => removeStep(step.id)} className="text-red-500"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          className="bg-[#0c4687] text-white px-4 py-2 rounded flex items-center gap-2 w-full justify-center"
        >
          <Save size={18} /> Enregistrer
        </button>
      </div>
    </div>
  );
}
