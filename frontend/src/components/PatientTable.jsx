import React, { useState } from "react";
import "./PatientTable.css";

export default function PatientTable() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([
    { id: 1, nom: "Doe", prenom: "John", age: 32, groupeSanguin: "O+", statut: "Hospitalisé", allergies: "Pollen", maladies: "Diabète", medecin: "Dr Smith", derniereConsultation: "2024-03-01" },
    { id: 2, nom: "Dupont", prenom: "Alice", age: 45, groupeSanguin: "A-", statut: "Suivi", allergies: "Aucune", maladies: "Hypertension", medecin: "Dr Martin", derniereConsultation: "2024-03-05" },
    { id: 3, nom: "Durand", prenom: "Paul", age: 28, groupeSanguin: "B+", statut: "En Observation", allergies: "Antibiotiques", maladies: "Asthme", medecin: "Dr Thomas", derniereConsultation: "2024-02-15" },
    { id: 1, nom: "Doe", prenom: "John", age: 32, groupeSanguin: "O+", statut: "Hospitalisé", allergies: "Pollen", maladies: "Diabète", medecin: "Dr Smith", derniereConsultation: "2024-03-01" },
    { id: 2, nom: "Dupont", prenom: "Alice", age: 45, groupeSanguin: "A-", statut: "Suivi", allergies: "Aucune", maladies: "Hypertension", medecin: "Dr Martin", derniereConsultation: "2024-03-05" },
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
    <div className="container">
      <div className="header">
        <input type="text" placeholder="Rechercher un patient..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="add-btn" onClick={() => { setIsDialogOpen(true); setNewPatient({ nom: "", prenom: "", age: "", groupeSanguin: "", statut: "", allergies: "", maladies: "", medecin: "", derniereConsultation: "" }); }}>Ajouter un patient</button>
      </div>

      <table className="patient-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Âge</th>
            <th>Groupe Sanguin</th>
            <th>Statut</th>
            <th>Allergies</th>
            <th>Maladies</th>
            <th>Médecin</th>
            <th>Dernière consultation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.nom}</td>
              <td>{patient.prenom}</td>
              <td>{patient.age}</td>
              <td>{patient.groupeSanguin}</td>
              <td>{patient.statut}</td>
              <td>{patient.allergies}</td>
              <td>{patient.maladies}</td>
              <td>{patient.medecin}</td>
              <td>{patient.derniereConsultation}</td>
              <td>
                <button className="action-btn" onClick={() => openActionDialog(patient)}>⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog d'actions (Modifier / Supprimer) */}
      {isActionOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Actions pour {selectedPatient.nom} {selectedPatient.prenom}</h2>
            <button className="edit-btn" onClick={handleEdit}>Modifier</button>
            <button className="delete-btn" onClick={handleDelete}>Supprimer</button>
            <button className="close-btn" onClick={closeActionDialog}>Annuler</button>
          </div>
        </div>
      )}

      {/* Dialog pour Modifier ou Ajouter */}
      {isDialogOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedPatient ? "Modifier un patient" : "Ajouter un patient"}</h2>
            <form>
              <input type="text" placeholder="Nom" value={newPatient.nom} onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })} required />
              <input type="text" placeholder="Prénom" value={newPatient.prenom} onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })} required />
              <input type="number" placeholder="Âge" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} required />
              <input type="text" placeholder="Groupe Sanguin" value={newPatient.groupeSanguin} onChange={(e) => setNewPatient({ ...newPatient, groupeSanguin: e.target.value })} required />
              <input type="text" placeholder="Statut" value={newPatient.statut} onChange={(e) => setNewPatient({ ...newPatient, statut: e.target.value })} required />
              <input type="text" placeholder="Allergies" value={newPatient.allergies} onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })} required />
              <input type="text" placeholder="Maladies" value={newPatient.maladies} onChange={(e) => setNewPatient({ ...newPatient, maladies: e.target.value })} required />
              <input type="text" placeholder="Médecin" value={newPatient.medecin} onChange={(e) => setNewPatient({ ...newPatient, medecin: e.target.value })} required />
              <input type="date" value={newPatient.derniereConsultation} onChange={(e) => setNewPatient({ ...newPatient, derniereConsultation: e.target.value })} required />
              <button type="submit">Enregistrer</button>
              <button className="close-btn" onClick={() => setIsDialogOpen(false)}>Annuler</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
