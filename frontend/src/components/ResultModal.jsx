// components/ResultModal.jsx
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

export default function ResultModal({ examen, onClose, onSubmit }) {
  const [valeur, setValeur] = useState('');
  const [unite, setUnite] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    if (!valeur || !unite || !date) return;
    onSubmit({ valeur, unite, date });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-[#0c4687] mb-4">Saisir Résultat d’Examen</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type d'examen</label>
            <input value={examen?.type || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Valeur</label>
              <input type="text" value={valeur} onChange={e => setValeur(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Unité</label>
              <input type="text" value={unite} onChange={e => setUnite(e.target.value)} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-[#0c4687] text-white py-2 px-4 rounded hover:bg-[#093b6e]"
          >
            <Save size={18} /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
