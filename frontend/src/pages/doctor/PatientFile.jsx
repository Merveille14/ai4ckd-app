import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExamRequestModal from '@/components/ExamRequestModal';
import api from '@/services/axios';
import {
  User, Phone, MapPin, BookOpen, Stethoscope, TestTube,
  ClipboardList, FileText, Download, Mail, Bell, Settings,
  CheckCircle, Clock, UserCheck, AlertTriangle, TrendingUp,
  Workflow
} from 'lucide-react';
import SidebarMedical from '@/components/sidebarMedical';
import '../../app.css';
import WorkflowPatientModal from "@/components/WorkflowPatientModal"; // à créer ou déplacer


const PatientFile = () => {
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);


  useEffect(() => {
    api.get(`/patients/details/${id}`)
      .then(res => {
        setPatient(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    api.get(`/patients/${id}/workflow`)
      .then(res => setWorkflow(res.data))
      .catch(err => console.error("Erreur chargement workflow:", err));
  }, [id]);

  const calculateAge = (date) => {
    const birth = new Date(date);
    return new Date().getFullYear() - birth.getFullYear();
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!patient) return <div className="p-6 text-red-500">Patient introuvable.</div>;

  return (
    <div className="min-h-screen flex font-[Poppins] bg-gradient-to-br from-gray-100 to-gray-50">
      <SidebarMedical />

      <main className="flex-1 ml-20 md:ml-60 p-6 space-y-8 transition-all duration-300">
        <h1 className="text-2xl font-bold text-[#0c4687]">Dossier Patient : {patient.nom} {patient.prenom}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {/* Infos personnelles */}
          <div className="white-box p-6 space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2"><User size={20} /> Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Nom :</strong> {patient.nom}</p>
              <p><strong>Prénom :</strong> {patient.prenom}</p>
              <p><strong>Sexe :</strong> {patient.sexe}</p>
              <p><strong>Âge :</strong> {calculateAge(patient.date_naissance)} ans</p>
              <p><MapPin size={16} className="inline" /> {patient.adresse}</p>
              <p><Phone size={16} className="inline" /> {patient.telephone}</p>
            </div>
          </div>

          {/* Workflow */}
        <div className="white-box p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Workflow size={20} /> Suivi du Workflow</h2>
            <button onClick={() => setIsWorkflowModalOpen(true)} className="text-sm text-[#0c4687] hover:underline">
              Configurer
            </button>
          </div>

          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {workflow.length > 0 ? workflow.map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <input type="checkbox" checked={step.done} onChange={() => {
                  const updated = [...workflow];
                  updated[i].done = !updated[i].done;
                  setWorkflow(updated);
                  // appel API pour sauvegarder peut être ici
                }} />
                <span className={step.done ? "text-green-600 line-through" : ""}>{step.title}</span>
              </li>
            )) : <p className="text-sm italic text-gray-500">Aucune étape définie pour ce patient.</p>}
          </ol>
        </div>

        {isWorkflowModalOpen && (
          <WorkflowPatientModal
            onClose={() => setIsWorkflowModalOpen(false)}
            patientId={id}
          />
        )}

        </div>

        {/* Antécédents */}
        <div className="white-box p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><BookOpen size={20} /> Antécédents médicaux</h2>
          <ul className="list-disc list-inside text-gray-700">
            {(typeof patient.antecedents === "string"
              ? patient.antecedents.split(',')
              : patient.antecedents || []
            ).map((a, i) => <li key={i}>{a.trim()}</li>)}
          </ul>
        </div>

        {/* Traitements */}
        <div className="white-box p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Stethoscope size={20} /> Traitements en cours</h2>
          <ul className="text-gray-700">
            {patient.traitements_en_cours?.map((t, i) => (
              <li key={i}><strong>{t.nom}</strong> – {t.dosage}, {t.duree}</li>
            ))}
          </ul>
        </div>

        {/* Examens */}
        <div className="white-box p-6 space-y-4 overflow-x-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TestTube size={20} /> Examens
            </h2>
            <button
              onClick={() => setIsExamModalOpen(true)}
              className="text-sm text-[#0c4687] hover:underline"
            >
              Demander un examen
            </button>
          </div>

          {patient.resultats_examens?.length > 0 ? (
            <table className="w-full text-sm mt-2">
              <thead className="text-left text-[#0c4687] border-b">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Valeur</th>
                  <th>Unité</th>
                </tr>
              </thead>
              <tbody>
                {patient.resultats_examens.map((e, i) => (
                  <tr key={i} className="border-b text-gray-700 hover:bg-[#9ac441]/10">
                    <td>{e.date}</td>
                    <td>{e.type}</td>
                    <td>{e.valeur}</td>
                    <td>{e.unite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500 italic">Aucun examen enregistré.</p>
          )}
        </div>


        {/* Consultations */}
        <div className="white-box p-6 space-y-3 overflow-x-auto">
          <h2 className="text-xl font-semibold flex items-center gap-2"><ClipboardList size={20} /> Historique des consultations</h2>
          <table className="w-full text-sm mt-2">
            <thead className="text-left text-[#0c4687] border-b">
              <tr><th>Date</th><th>Motif</th><th>Médecin</th></tr>
            </thead>
            <tbody>
              {patient.historique_consultations?.map((c, i) => (
                <tr key={i} className="border-b text-gray-700 hover:bg-[#9ac441]/10">
                  <td>{c.date}</td><td>{c.motif}</td><td>{c.medecin?.nom ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Documents */}
        <div className="white-box p-6 space-y-3 overflow-x-auto">
          <h2 className="text-xl font-semibold flex items-center gap-2"><FileText size={20} /> Documents PDF</h2>
          <table className="w-full text-sm mt-2">
            <thead className="text-left text-[#0c4687] border-b">
              <tr><th>Nom</th><th>Type</th><th>Date</th><th>Télécharger</th></tr>
            </thead>
            <tbody>
              {patient.documents?.map((doc, i) => (
                <tr key={i} className="border-b text-gray-700 hover:bg-[#9ac441]/10">
                  <td>{doc.nom}</td><td>{doc.type}</td><td>{doc.date}</td>
                  <td><a href={doc.lien} target="_blank" rel="noopener noreferrer"><Download size={18} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isExamModalOpen && (
          <ExamRequestModal
            onClose={() => setIsExamModalOpen(false)}
            patientId={id}
            onExamAdded={() => {
              setIsExamModalOpen(false);
              // recharger les examens
              api.get(`/patients/details/${id}`)
                .then(res => setPatient(res.data))
                .catch(err => console.error(err));
            }}
          />
        )}

      </main>

      {/* Colonne droite */}
      <aside className="w-72 glass-effect p-4 space-y-6 hidden md:flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 text-[#0c4687] text-2xl">
            <Mail /><Bell /><Settings />
          </div>
          <img src="https://via.placeholder.com/40" alt="Profil" className="rounded-full w-12 h-12 border-2 border-white" />
        </div>

        <div className="white-box p-4 space-y-3">
          <h2 className="font-semibold text-lg">Alertes critiques</h2>
          <p className="text-sm text-gray-500">Taux d’urée élevé</p>
          <p className="text-sm text-gray-500">Consultation urgente manquée</p>
        </div>

        <div className="p-4 space-y-3">
          <h2 className="font-semibold text-lg">À faire</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center space-x-3"><CheckCircle className="text-[#9ac441]" /><span>Valider l’ordonnance</span></li>
            <li className="flex items-center space-x-3"><Clock className="text-[#0c4687]" /><span>Envoyer documents</span></li>
            <li className="flex items-center space-x-3"><UserCheck className="text-[#0c4687]" /><span>Contacter la famille</span></li>
          </ul>
        </div>

        <div className="white-box p-4 text-gray-700 space-y-3 mt-auto">
          <h2 className="font-semibold text-lg">À savoir</h2>
          <p><AlertTriangle className="text-[#9ac441] inline mr-2" /> Allergie médicamenteuse notée</p>
          <p><TrendingUp className="text-[#0c4687] inline mr-2" /> Bon rétablissement observé</p>
        </div>
      </aside>
    </div>
  );
};

export default PatientFile;
