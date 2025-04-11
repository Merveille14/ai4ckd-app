//PatientManage

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, Search, UserPlus } from "lucide-react";
<<<<<<< HEAD
// import SidebarMedical from "@/components/sidebarMedical";
import '../../app.css';
import axios from "axios";
=======
import SidebarMedical from "@/components/sidebarMedical";
import '@/App.css';
import api from "@/services/axios";
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25

export default function PatientManage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
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
  });

  useEffect(() => {
<<<<<<< HEAD
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/patients");
        setPatients(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError("Impossible de charger les patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
=======
    api.get("/patients")
      .then(res => {
        console.log(" Patients API response:", res.data);
        setPatients(res.data.patients)
  })
      .catch(err => console.error("Erreur Axios :", err.response?.data || err.message));
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25
  }, []);

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setNewPatient(patient);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
<<<<<<< HEAD
    try {
      await axios.delete(`http://localhost:3000/api/patients/${id}`);
      const res = await axios.get("http://localhost:3000/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("Erreur de suppression:", err);
      setError("Échec de la suppression");
    }
=======
    await api.delete(`/patients/${id}`);
    const res = await api.get("/patients");
    setPatients(res.data.patients);
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatient) {
<<<<<<< HEAD
        await axios.put(`http://localhost:3000/api/patients/${selectedPatient.id}`, newPatient);
      } else {
        await axios.post("http://localhost:3000/api/patients", newPatient);
      }
      const res = await axios.get("http://localhost:3000/api/patients");
      setPatients(res.data);
      setIsDialogOpen(false);
      setSelectedPatient(null);
    } catch (err) {
      console.error("Erreur d'enregistrement:", err);
      setError("Échec de l'enregistrement");
    }
=======
        await api.put(`/patients/${selectedPatient.id}`, newPatient);
        setMessage("Patient mis à jour avec succès.");
        setMessageType("success");
      } else {
        await api.post("/patients", newPatient);
        setMessage("Patient ajouté avec succès.");
        setMessageType("success");
      }
  
      const res = await api.get("/patients");
      setPatients(res.data.patients);
      setIsDialogOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      setMessage(
          error.response?.data?.message === "The given data was invalid."
            ? Object.values(error.response?.data?.errors || {})
                .flat()
                .join(", ")
            : "Erreur lors de l'enregistrement. Réessaie."
        );
 
      setMessageType("error");
      console.error("Erreur:", error.response?.data || error.message);
    }
  
    // Effacer le message après 5 secondes
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25
  };
  

<<<<<<< HEAD
  const filteredPatients = patients.filter(p => 
    `${p.nom} ${p.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-4 md:p-10 font-sans">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0c4687]"></div>
=======
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10 font-[Poppins]">
      <SidebarMedical />

      {message && (
        <div className={`p-3 mb-4 rounded text-sm font-medium ${
          messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="glass-effect p-6 rounded-2xl ml-20 md:ml-60 space-y-8 transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Rechercher un patient..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0c4687]" />
          </div>
          <button className="bg-[#9ac441] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#7fa637]" onClick={() => {
            setIsDialogOpen(true);
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
            });
            setSelectedPatient(null);
          }}>
            <UserPlus size={18} /><span>Ajouter un patient</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 bg-white rounded-xl">
            <thead className="bg-[#0c4687] text-white">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Prénom</th>
                <th className="px-4 py-2">N° Dossier</th>
                <th className="px-4 py-2">Sexe</th>
                <th className="px-4 py-2">Âge</th>
                <th className="px-4 py-2">Adresse</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Médecin</th>
                <th className="px-4 py-2">Dernière consultation</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(patients) && patients.filter(p => p.nom.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{p.nom}</td>
                  <td className="px-4 py-2">{p.prenom}</td>
                  <td className="px-4 py-2">{p.numero_dossier}</td>
                  <td className="px-4 py-2">{p.sexe}</td>
                  <td className="px-4 py-2">{calculateAge(p.date_naissance)} ans</td>
                  <td className="px-4 py-2">{p.adresse}</td>
                  <td className="px-4 py-2">{p.telephone}</td>
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.medecin_id}</td>
                  <td className="px-4 py-2">{p.derniere_consultation}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => navigate(`/patient/${p.id}`)} className="text-[#0c4687] hover:underline">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => handleEdit(p)} className="text-yellow-500">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          {error} <button onClick={() => window.location.reload()} className="ml-2 text-blue-500">Réessayer</button>
        </div>
      ) : (
        <>
          {/* <SidebarMedical /> */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 rounded-2xl ml-0 md:ml-60 shadow-sm transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher un patient..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0c4687]" 
                />
              </div>
              <button 
                className="bg-[#0c4687] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#0a3a6f] flex items-center gap-2 w-full md:w-auto justify-center"
                onClick={() => {
                  setIsDialogOpen(true);
                  setNewPatient({
                    nom: "",
                    prenom: "",
                    numero_dossier: "",
                    sexe: "",
                    date_naissance: "",
                    medecin: "",
                    derniereConsultation: ""
                  });
                  setSelectedPatient(null);
                }}
              >
                <UserPlus size={18} />
                <span>Ajouter un patient</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                        <td className="px-4 py-3">{p.numero_dossier}</td>
                        <td className="px-4 py-3">{p.sexe}</td>
                        <td className="px-4 py-3">{calculateAge(p.date_naissance)} ans</td>
                        <td className="px-4 py-3">{p.medecin || "N/A"}</td>
                        <td className="px-4 py-3">{p.derniereConsultation || "N/A"}</td>
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
        </>
      )}

      {isDialogOpen && (
<<<<<<< HEAD
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedPatient ? "Modifier patient" : "Nouveau patient"}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input 
                    type="text" 
                    value={newPatient.nom} 
                    onChange={(e) => setNewPatient({...newPatient, nom: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687] focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input 
                    type="text" 
                    value={newPatient.prenom} 
                    onChange={(e) => setNewPatient({...newPatient, prenom: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687]" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">N° Dossier</label>
                  <input 
                    type="text" 
                    value={newPatient.numero_dossier} 
                    onChange={(e) => setNewPatient({...newPatient, numero_dossier: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687]" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                  <select 
                    value={newPatient.sexe} 
                    onChange={(e) => setNewPatient({...newPatient, sexe: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687]" 
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                  <input 
                    type="date" 
                    value={newPatient.date_naissance} 
                    onChange={(e) => setNewPatient({...newPatient, date_naissance: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687]" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Médecin référent</label>
                  <input 
                    type="text" 
                    value={newPatient.medecin} 
                    onChange={(e) => setNewPatient({...newPatient, medecin: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687]" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dernière consultation</label>
                  <input 
                    type="date" 
                    value={newPatient.derniereConsultation} 
                    onChange={(e) => setNewPatient({...newPatient, derniereConsultation: e.target.value})} 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#0c4687]" 
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsDialogOpen(false)} 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-[#0c4687] text-white rounded-md hover:bg-[#0a3a6f]"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
=======
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.40)] flex items-center justify-center z-50">
          <div className="white-box p-6 space-y-4 w-[500px]">
            <h2 className="text-xl font-semibold">
              {selectedPatient ? "Modifier un patient" : "Ajouter un patient"}
            </h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input type="text" placeholder="Nom" value={newPatient.nom} onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Prénom" value={newPatient.prenom} onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="N° Dossier" value={newPatient.numero_dossier} onChange={(e) => setNewPatient({ ...newPatient, numero_dossier: e.target.value })} className="w-full border p-2 rounded" required />
              <select value={newPatient.sexe} onChange={(e) => setNewPatient({ ...newPatient, sexe: e.target.value })} className="w-full border p-2 rounded" required>
                <option value="">-- Sexe --</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
              <input type="date" value={newPatient.date_naissance} onChange={(e) => setNewPatient({ ...newPatient, date_naissance: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Adresse" value={newPatient.adresse} onChange={(e) => setNewPatient({ ...newPatient, adresse: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Téléphone" value={newPatient.telephone} onChange={(e) => setNewPatient({ ...newPatient, telephone: e.target.value })} className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="ID Médecin référent" value={newPatient.medecin_id} onChange={(e) => setNewPatient({ ...newPatient, medecin_id: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="date" value={newPatient.derniere_consultation} onChange={(e) => setNewPatient({ ...newPatient, derniere_consultation: e.target.value })} className="w-full border p-2 rounded" />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-[#0c4687] text-white px-4 py-2 rounded">Enregistrer</button>
                <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => setIsDialogOpen(false)}>Annuler</button>
              </div>
            </form>
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25
          </div>
        </div>
      )}
    </div>
  );
}