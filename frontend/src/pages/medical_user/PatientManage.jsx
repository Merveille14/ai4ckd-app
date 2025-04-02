import React, { useState } from "react";
import '../../app.css';

export default function PatientManage() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([
    { id: 1, nom: "Doe", prenom: "John", age: 32, groupeSanguin: "O+", statut: "Hospitalisé", allergies: "Pollen", maladies: "Diabète", medecin: "Dr Smith", derniereConsultation: "2024-03-01" },
    { id: 2, nom: "Dupont", prenom: "Alice", age: 45, groupeSanguin: "A-", statut: "Suivi", allergies: "Aucune", maladies: "Hypertension", medecin: "Dr Martin", derniereConsultation: "2024-03-05" },
    { id: 3, nom: "Durand", prenom: "Paul", age: 28, groupeSanguin: "B+", statut: "En Observation", allergies: "Antibiotiques", maladies: "Asthme", medecin: "Dr Thomas", derniereConsultation: "2024-02-15" }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({ nom: "", prenom: "", age: "", groupeSanguin: "", statut: "", allergies: "", maladies: "", medecin: "", derniereConsultation: "" });

  const openActionDialog = (patient) => {
    setSelectedPatient(patient);
    setIsActionOpen(true);
  };

  const closeActionDialog = () => {
    setSelectedPatient(null);
    setIsActionOpen(false);
  };

  const handleDelete = () => {
    setPatients(patients.filter(patient => patient.id !== selectedPatient.id));
    closeActionDialog();
  };

  const handleEdit = () => {
    setNewPatient(selectedPatient);
    setIsDialogOpen(true);
    closeActionDialog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10 font-[Poppins]">
      <div className="glass-effect p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Rechercher un patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0c4687]"
          />
          <button
            className="bg-[#9ac441] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#7fa637]"
            onClick={() => {
              setIsDialogOpen(true);
              setNewPatient({ nom: "", prenom: "", age: "", groupeSanguin: "", statut: "", allergies: "", maladies: "", medecin: "", derniereConsultation: "" });
            }}
          >
            ➕ Ajouter un patient
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 bg-white rounded-xl">
            <thead className="bg-[#0c4687] text-white">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Prénom</th>
                <th className="px-4 py-2">Âge</th>
                <th className="px-4 py-2">Groupe</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Allergies</th>
                <th className="px-4 py-2">Maladies</th>
                <th className="px-4 py-2">Médecin</th>
                <th className="px-4 py-2">Dernière consultation</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.filter(p => p.nom.toLowerCase().includes(search.toLowerCase())).map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{patient.nom}</td>
                  <td className="px-4 py-2">{patient.prenom}</td>
                  <td className="px-4 py-2">{patient.age}</td>
                  <td className="px-4 py-2">{patient.groupeSanguin}</td>
                  <td className="px-4 py-2">{patient.statut}</td>
                  <td className="px-4 py-2">{patient.allergies}</td>
                  <td className="px-4 py-2">{patient.maladies}</td>
                  <td className="px-4 py-2">{patient.medecin}</td>
                  <td className="px-4 py-2">{patient.derniereConsultation}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => openActionDialog(patient)} className="text-[#0c4687] text-xl">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isActionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="white-box p-6 space-y-4">
            <h2 className="text-xl font-semibold">Actions pour {selectedPatient.nom} {selectedPatient.prenom}</h2>
            <div className="flex gap-4">
              <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg" onClick={handleEdit}>Modifier</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleDelete}>Supprimer</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-lg" onClick={closeActionDialog}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="white-box p-6 space-y-4 w-[500px]">
            <h2 className="text-xl font-semibold">{selectedPatient ? "Modifier un patient" : "Ajouter un patient"}</h2>
            <form className="space-y-3" onSubmit={(e) => {
              e.preventDefault();
              if (selectedPatient) {
                setPatients(patients.map(p => (p.id === selectedPatient.id ? newPatient : p)));
              } else {
                setPatients([...patients, { ...newPatient, id: Date.now() }]);
              }
              setIsDialogOpen(false);
              setSelectedPatient(null);
            }}>
              <input type="text" placeholder="Nom" value={newPatient.nom} onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Prénom" value={newPatient.prenom} onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="number" placeholder="Âge" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Groupe Sanguin" value={newPatient.groupeSanguin} onChange={(e) => setNewPatient({ ...newPatient, groupeSanguin: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Statut" value={newPatient.statut} onChange={(e) => setNewPatient({ ...newPatient, statut: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Allergies" value={newPatient.allergies} onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Maladies" value={newPatient.maladies} onChange={(e) => setNewPatient({ ...newPatient, maladies: e.target.value })} className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Médecin" value={newPatient.medecin} onChange={(e) => setNewPatient({ ...newPatient, medecin: e.target.value })} className="w-full border p-2 rounded" required />
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
