import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, Search, UserPlus } from "lucide-react";
import SidebarMedical from "@/components/sidebarMedical";
import '../../app.css';
import axios from "axios";

export default function PatientManage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    nom: "",
    prenom: "",
    numero_dossier: "",
    sexe: "",
    date_naissance: "",
    medecin: "",
    derniereConsultation: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setNewPatient(patient);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/patients/${id}`);
    const res = await axios.get("http://localhost:3000/api/patients");
    setPatients(res.data);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? age - 1 : age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPatient) {
      await axios.put(`http://localhost:3000/api/patients/${selectedPatient.id}`, newPatient);
    } else {
      await axios.post("http://localhost:3000/api/patients", newPatient);
    }
    const res = await axios.get("http://localhost:3000/api/patients");
    setPatients(res.data);
    setIsDialogOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10 font-[Poppins]">
      <SidebarMedical />
      <div className="glass-effect p-6 rounded-2xl ml-20 md:ml-60 space-y-8 transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Rechercher un patient..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0c4687]" />
          </div>
          <button className="bg-[#9ac441] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#7fa637]"
            onClick={() => {
              setIsDialogOpen(true);
              setNewPatient({ nom: "", prenom: "", numero_dossier: "", sexe: "", date_naissance: "", medecin: "", derniereConsultation: "" });
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
                <th className="px-4 py-2">Médecin</th>
                <th className="px-4 py-2">Dernière consultation</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.filter(p => p.nom.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{p.nom}</td>
                  <td className="px-4 py-2">{p.prenom}</td>
                  <td className="px-4 py-2">{p.numero_dossier}</td>
                  <td className="px-4 py-2">{p.sexe}</td>
                  <td className="px-4 py-2">{calculateAge(p.date_naissance)} ans</td>
                  <td className="px-4 py-2">{p.medecin}</td>
                  <td className="px-4 py-2">{p.derniereConsultation}</td>
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
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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
              <input type="text" placeholder="Médecin référent" value={newPatient.medecin} onChange={(e) => setNewPatient({ ...newPatient, medecin: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="date" value={newPatient.derniereConsultation} onChange={(e) => setNewPatient({ ...newPatient, derniereConsultation: e.target.value })} className="w-full border p-2 rounded" required />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-[#0c4687] text-white px-4 py-2 rounded">Enregistrer</button>
                <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => setIsDialogOpen(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
