import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientTable.css";

export default function PatientTable() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    sexe: "Homme",
    adresse: "",
    telephone: "",
    email: "",
    numero_dossier: "",
    medecin_id: "",
    antecedents: ""
  });

  // Charger les patients au montage du composant
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients');
      setPatients(response.data.patients);
    } catch (error) {
      console.error("Erreur lors de la récupération des patients:", error);
    }
  };

  const openActionDialog = (patient) => {
    setSelectedPatient(patient);
    setIsActionOpen(true);
  };

  const closeActionDialog = () => {
    setSelectedPatient(null);
    setIsActionOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/patients/${id}`);
      fetchPatients(); // Rafraîchir la liste
      closeActionDialog();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatient) {
        // Mise à jour
        await axios.put(`/api/patients/${selectedPatient.id}`, newPatient);
      } else {
        // Création
        await axios.post('/api/patients', newPatient);
      }
      fetchPatients(); // Rafraîchir la liste
      setIsDialogOpen(false);
      setNewPatient({
        nom: "",
        prenom: "",
        date_naissance: "",
        sexe: "Homme",
        adresse: "",
        telephone: "",
        email: "",
        numero_dossier: "",
        medecin_id: "",
        antecedents: ""
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  const handleEdit = (patient) => {
    setNewPatient({
      nom: patient.nom,
      prenom: patient.prenom,
      date_naissance: patient.date_naissance,
      sexe: patient.sexe,
      adresse: patient.adresse,
      telephone: patient.telephone,
      email: patient.email,
      numero_dossier: patient.numero_dossier,
      medecin_id: patient.medecin_id,
      antecedents: patient.antecedents
    });
    setSelectedPatient(patient);
    setIsDialogOpen(true);
    closeActionDialog();
  };

  // Calculer l'âge à partir de la date de naissance
  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  };

  const filteredPatients = patients.filter(patient => 
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <input 
          type="text" 
          placeholder="Rechercher un patient..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button 
          className="add-btn" 
          onClick={() => {
            setIsDialogOpen(true); 
            setSelectedPatient(null);
            setNewPatient({
              nom: "",
              prenom: "",
              date_naissance: "",
              sexe: "Homme",
              adresse: "",
              telephone: "",
              email: "",
              numero_dossier: "",
              medecin_id: "",
              antecedents: ""
            });
          }}
        >
          Ajouter un patient
        </button>
      </div>

      <table className="patient-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Âge</th>
            <th>Sexe</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Numéro dossier</th>
            <th>Médecin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.nom}</td>
              <td>{patient.prenom}</td>
              <td>{calculateAge(patient.date_naissance)}</td>
              <td>{patient.sexe}</td>
              <td>{patient.telephone || "N/A"}</td>
              <td>{patient.email || "N/A"}</td>
              <td>{patient.numero_dossier || "N/A"}</td>
              <td>{patient.medecin?.name || "N/A"}</td>
              <td>
                <button 
                  className="action-btn" 
                  onClick={() => openActionDialog(patient)}
                >
                  ⋮
                </button>
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
            <button className="edit-btn" onClick={() => handleEdit(selectedPatient)}>
              Modifier
            </button>
            <button 
              className="delete-btn" 
              onClick={() => handleDelete(selectedPatient.id)}
            >
              Supprimer
            </button>
            <button className="close-btn" onClick={closeActionDialog}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Dialog pour Modifier ou Ajouter */}
      {isDialogOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedPatient ? "Modifier un patient" : "Ajouter un patient"}</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Nom" 
                value={newPatient.nom} 
                onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Prénom" 
                value={newPatient.prenom} 
                onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })} 
                required 
              />
              <input 
                type="date" 
                placeholder="Date de naissance" 
                value={newPatient.date_naissance} 
                onChange={(e) => setNewPatient({ ...newPatient, date_naissance: e.target.value })} 
                required 
              />
              <select
                value={newPatient.sexe}
                onChange={(e) => setNewPatient({ ...newPatient, sexe: e.target.value })}
                required
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Femme">Star</option>
              </select>
              <input 
                type="text" 
                placeholder="Adresse" 
                value={newPatient.adresse} 
                onChange={(e) => setNewPatient({ ...newPatient, adresse: e.target.value })} 
              />
              <input 
                type="tel" 
                placeholder="Téléphone" 
                value={newPatient.telephone} 
                onChange={(e) => setNewPatient({ ...newPatient, telephone: e.target.value })} 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={newPatient.email} 
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Numéro de dossier" 
                value={newPatient.numero_dossier} 
                onChange={(e) => setNewPatient({ ...newPatient, numero_dossier: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="ID Médecin" 
                value={newPatient.medecin_id} 
                onChange={(e) => setNewPatient({ ...newPatient, medecin_id: e.target.value })} 
                required 
              />
              <textarea 
                placeholder="Antécédents médicaux" 
                value={newPatient.antecedents} 
                onChange={(e) => setNewPatient({ ...newPatient, antecedents: e.target.value })} 
              />
              <button type="submit">Enregistrer</button>
              <button 
                type="button" 
                className="close-btn" 
                onClick={() => setIsDialogOpen(false)}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}