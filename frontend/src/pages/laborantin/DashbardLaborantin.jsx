import React, { useEffect, useState } from 'react';
import api from '@/services/axios';
import { TestTube2, Search, CheckCircle, Clock, FileText } from 'lucide-react';
import SidebarLab from '@/components/sidebarLab';
import ResultModal from '@/components/ResultModal';

const DashboardLaborantin = () => {
  const [examens, setExamens] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedExamen, setSelectedExamen] = useState(null);

  // Chargement des examens
  const fetchExamens = async () => {
    try {
      const res = await api.get('/examens/pending');
      setExamens(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des examens :", err);
    }
  };

  useEffect(() => {
    fetchExamens();
  }, []);

  const handleValidate = async (examenId, result) => {
    try {
      await api.post(`/examens/${examenId}/validate`, result);
      setExamens(prev =>
        prev.map(ex => ex.id === examenId ? { ...ex, status: 'validé', ...result } : ex)
      );
      setSelectedExamen(null);
    } catch (err) {
      console.error("Erreur validation :", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-50 font-[Poppins]">
      <SidebarLab />

      <main className="flex-1 ml-20 md:ml-60 p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0c4687]">Examens en attente</h1>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un patient ou type..."
              className="w-full pl-10 p-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="white-box p-4 space-y-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0c4687] text-white">
              <tr>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Statut</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {examens
                .filter(e =>
                  e.patient?.nom?.toLowerCase().includes(search.toLowerCase()) ||
                  e.type.toLowerCase().includes(search.toLowerCase())
                )
                .map(e => (
                  <tr key={e.id} className="border-b hover:bg-[#9ac441]/10">
                    <td className="px-3 py-2">{e.patient?.nom} {e.patient?.prenom}</td>
                    <td className="px-3 py-2">{e.type}</td>
                    <td className="px-3 py-2">{e.date}</td>
                    <td className="px-3 py-2 text-gray-600 capitalize">{e.status}</td>
                    <td className="px-3 py-2 space-x-3">
                      {e.status === 'en attente' && (
                        <button onClick={() => setSelectedExamen(e)} className="text-blue-600">
                          Saisir Résultat
                        </button>
                      )}
                      {e.status === 'validé' && (
                        <a href={`/pdf/examen/${e.id}`} target="_blank" className="text-[#0c4687] flex items-center gap-1">
                          <FileText size={16} /> Télécharger
                        </a>
                      )}
                      {e.status === 'en cours' && (
                        <span className="text-blue-500 flex items-center gap-1">
                          <Clock size={16} /> En cours
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modale de saisie des résultats */}
        {selectedExamen && (
          <ResultModal
            examen={selectedExamen}
            onClose={() => setSelectedExamen(null)}
            onSubmit={(result) => handleValidate(selectedExamen.id, result)}
          />
        )}
      </main>
    </div>
  );
};

export default DashboardLaborantin;
