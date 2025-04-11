import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import api from '@/services/axios';

const examTypes = [
  'Créatinine',
  'Hémoglobine',
  'Albumine',
  'Uricémie',
  'ECBU',
  'Échographie rénale',
  'Autre'
];

export default function ExamRequestModal({ onClose, patientId, onExamAdded }) {
  const [type, setType] = useState('');
  const [note, setNote] = useState('');
  const [valeur, setValeur] = useState('');
  const [unite, setUnite] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async () => {
    if (!type || !valeur || !unite) {
      setMessage("Tous les champs sont requis.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/patients/${patientId}/examens`, {
        type,
        note,
        valeur: parseFloat(valeur),
        unite,
        date: new Date().toISOString().split('T')[0],
      });

      setMessage("Examen demandé avec succès.");
      setMessageType("success");

      setTimeout(() => {
        onExamAdded(); // recharger la fiche
        onClose();     // fermer la modale
      }, 1000);
    } catch (err) {
      console.error("Erreur API complète :", err);
      if (err.response) {
        console.error("Erreur réponse serveur :", err.response.data);
      }
      setMessage("Erreur lors de la demande.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.40)] z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-600">
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-[#0c4687]">Demande d’examen</h2>

        {message && (
          <div className={`p-2 text-sm rounded font-medium ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Sélectionner un type d'examen --</option>
          {examTypes.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Valeur mesurée (ex: 3.5)"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Unité (ex: mg/L)"
          value={unite}
          onChange={(e) => setUnite(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Notes supplémentaires..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-[#0c4687] text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2 hover:bg-[#09376b] disabled:opacity-50"
        >
          <Save size={18} /> {loading ? "Envoi..." : "Demander"}
        </button>
      </div>
    </div>
  );
}
