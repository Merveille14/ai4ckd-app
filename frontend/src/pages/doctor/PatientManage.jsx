import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, Search, UserPlus } from "lucide-react";
import SidebarMedical from "@/components/sidebarMedical";
import '@/App.css';
import api from "@/services/axios";

export default function PatientManage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [newPatient, setNewPatient] = useState({
    nom: "",
    prenom: "",
    numero_dossier: "",
    sexe: "",
    date_naissance: "",
    adresse: "",
    telephone: "",
    email: "",
    medecin_id: "",
    derniere_consultation: "",
    antecedents: ""
  });

  useEffect(() => {
    fetchPatients();
    fetchMedecins();
  }, []);



  const fetchMedecins = async () => {
    try {
      const res = await api.get("/user");
      const doctors = res.data.data.filter(user => user.role === 'doctor');
      console.log([doctors]);
      setMedecins(doctors);
    } catch (err) {
      console.error("Erreur lors de la récupération des médecins:", err);
      setMedecins([]);
    }
  };


  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data.patients);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setNewPatient({
      ...patient,
      date_naissance: patient.date_naissance ? patient.date_naissance.split('T')[0] : "",
      derniere_consultation: patient.derniere_consultation ? patient.derniere_consultation.split('T')[0] : ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) return;
    
    try {
      await api.delete(`/patients/${id}`);
      await fetchPatients();
      setMessage("Patient supprimé avec succès");
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de la suppression");
      setMessageType("error");
    }
    setTimeout(() => setMessage(""), 5000);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newPatient.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!newPatient.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!newPatient.date_naissance) newErrors.date_naissance = "La date de naissance est requise";
    if (!newPatient.sexe) newErrors.sexe = "Le sexe est requis";
    if (!newPatient.medecin_id) newErrors.medecin_id = "Le médecin référent est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (selectedPatient) {
        await api.put(`/patients/${selectedPatient.id}`, newPatient);
        setMessage("Patient mis à jour avec succès");
      } else {
        await api.post("/patients", newPatient);
        setMessage("Patient ajouté avec succès");
      }
      setMessageType("success");
      await fetchPatients();
      setIsDialogOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 
        (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(", ") : "Erreur lors de l'enregistrement")
      );
      setMessageType("error");
    }
    setTimeout(() => setMessage(""), 5000);
  };

  const filteredPatients = patients.filter(p => 
    `${p.nom} ${p.prenom}`.toLowerCase().includes(search.toLowerCase()) ||
    (p.numero_dossier && p.numero_dossier.toLowerCase().includes(search.toLowerCase())) ||
    (p.medecin && `${p.medecin.nom} ${p.medecin.prenom}`.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10 font-[Poppins]">
        <SidebarMedical />
        <div className="ml-20 md:ml-60 flex justify-center items-center h-full">
          <div className="text-center py-10">Chargement des patients...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10 font-[Poppins]">
        <SidebarMedical />
        <div className="ml-20 md:ml-60 text-center py-10 text-red-500">
          {error} <button onClick={fetchPatients} className="ml-2 text-blue-500">Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10 font-[Poppins]">
      <SidebarMedical />

      {message && (
        <div className={`fixed top-20 right-5 p-3 mb-4 rounded text-sm font-medium z-50 ${
          messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="glass-effect p-6 rounded-2xl ml-20 md:ml-60 space-y-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un patient..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0c4687]" 
            />
          </div>
          <button 
            className="bg-[#0c4687] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#0a3a6f] flex items-center gap-2 w-full md:w-auto justify-center"
            onClick={() => {
              setIsDialogOpen(true);
              setSelectedPatient(null);
              setNewPatient({
                nom: "",
                prenom: "",
                numero_dossier: "",
                sexe: "",
                date_naissance: "",
                adresse: "",
                telephone: "",
                email: "",
                medecin_id: "",
                derniere_consultation: "",
                antecedents: ""
              });
            }}
          >
            <UserPlus size={18} />
            <span>Ajouter un patient</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0c4687] text-white">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Prénom</th>
                <th className="px-4 py-3">N° Dossier</th>
                <th className="px-4 py-3">Sexe</th>
                <th className="px-4 py-3">Âge</th>
                <th className="px-4 py-3">Médecin</th>
                <th className="px-4 py-3">Dernière consultation</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{p.nom}</td>
                    <td className="px-4 py-3">{p.prenom}</td>
                    <td className="px-4 py-3">{p.numero_dossier || "N/A"}</td>
                    <td className="px-4 py-3">{p.sexe}</td>
                    <td className="px-4 py-3">{calculateAge(p.date_naissance)} ans</td>
                    <td className="px-4 py-3">
                      {p.medecin ? `${p.medecin.nom} ${p.medecin.prenom}` : "N/A"}
                    </td>
                    <td className="px-4 py-3">{formatDate(p.derniere_consultation)}</td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button 
                        onClick={() => navigate(`/patient/${p.id}`)} 
                        className="text-[#0c4687] hover:text-[#0a3a6f] transition-colors"
                        title="Voir détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEdit(p)} 
                        className="text-yellow-600 hover:text-yellow-800 transition-colors"
                        title="Modifier"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    {search ? "Aucun patient trouvé" : "Aucun patient enregistré"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour ajouter/modifier un patient */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {selectedPatient ? "Modifier le patient" : "Ajouter un nouveau patient"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom*</label>
                  <input
                    type="text"
                    value={newPatient.nom}
                    onChange={(e) => setNewPatient({...newPatient, nom: e.target.value})}
                    className={`w-full p-2 border rounded ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom*</label>
                  <input
                    type="text"
                    value={newPatient.prenom}
                    onChange={(e) => setNewPatient({...newPatient, prenom: e.target.value})}
                    className={`w-full p-2 border rounded ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">N° Dossier</label>
                  <input
                    type="text"
                    value={newPatient.numero_dossier}
                    onChange={(e) => setNewPatient({...newPatient, numero_dossier: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sexe*</label>
                  <select
                    value={newPatient.sexe}
                    onChange={(e) => setNewPatient({...newPatient, sexe: e.target.value})}
                    className={`w-full p-2 border rounded ${errors.sexe ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Sélectionner</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                  {errors.sexe && <p className="text-red-500 text-xs mt-1">{errors.sexe}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance*</label>
                  <input
                    type="date"
                    value={newPatient.date_naissance}
                    onChange={(e) => setNewPatient({...newPatient, date_naissance: e.target.value})}
                    className={`w-full p-2 border rounded ${errors.date_naissance ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.date_naissance && <p className="text-red-500 text-xs mt-1">{errors.date_naissance}</p>}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Médecin référent*</label>
              <select
                value={newPatient.medecin_id}
                onChange={(e) => setNewPatient({...newPatient, medecin_id: e.target.value})}
                className={`w-full p-2 border rounded ${errors.medecin_id ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner un médecin</option>
                {medecins.map((medecin) => (
                  <option key={medecin.id} value={medecin.id}>
                    Dr. {medecin.last_name} {medecin.first_name}
                    {medecin.specialite && ` (${medecin.specialite})`}
                  </option>
                ))}
              </select>
              {errors.medecin_id && <p className="text-red-500 text-xs mt-1">{errors.medecin_id}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={newPatient.adresse}
                    onChange={(e) => setNewPatient({...newPatient, adresse: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={newPatient.telephone}
                    onChange={(e) => setNewPatient({...newPatient, telephone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dernière consultation</label>
                  <input
                    type="date"
                    value={newPatient.derniere_consultation}
                    onChange={(e) => setNewPatient({...newPatient, derniere_consultation: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Antécédents médicaux</label>
                  <textarea
                    value={newPatient.antecedents}
                    onChange={(e) => setNewPatient({...newPatient, antecedents: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSelectedPatient(null);
                    setErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c4687] text-white rounded-md hover:bg-[#0a3a6f]"
                >
                  {selectedPatient ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}