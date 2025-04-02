import React from 'react';
import {
  User, Phone, MapPin, BookOpen, Stethoscope, TestTube,
  ClipboardList, FileText, Download, Mail, Bell, Settings,
  CheckCircle, Clock, UserCheck, AlertTriangle, TrendingUp
} from 'lucide-react';
import SidebarMedical from '@/components/sidebarMedical';
import '../../app.css';

const PatientFile = () => {
  const patient = {
    nom: 'John',
    prenom: 'Doe',
    sexe: 'Homme',
    date_naissance: '1988-05-20',
    adresse: '123 Rue de la Santé, Cotonou',
    telephone: '+229 91 23 45 67',
    antecedents: ['Hypertension', 'Diabète de type 2'],
    traitements: [
      { nom: 'Médicament A', dosage: '2x/jour', durée: '30 jours' },
      { nom: 'Médicament B', dosage: '1x/jour', durée: '15 jours' }
    ],
    examens: [
      { date: '2024-03-10', type: 'Créatinine', valeur: '1.8', unité: 'mg/dL' },
      { date: '2024-03-01', type: 'Urée', valeur: '44', unité: 'mg/dL' }
    ],
    consultations: [
      { date: '2024-03-15', motif: 'Suivi MRC', medecin: 'Dr. Martin' },
      { date: '2024-02-10', motif: 'Résultats examens', medecin: 'Dr. Thomas' }
    ],
    documents: [
      { nom: 'Analyse sang', type: 'PDF', date: '2024-03-01', lien: '#' },
      { nom: 'Ordonnance', type: 'PDF', date: '2024-03-10', lien: '#' }
    ]
  };

  const calculateAge = (date) => {
    const birth = new Date(date);
    return new Date().getFullYear() - birth.getFullYear();
  };

  return (
    <div className="min-h-screen flex font-[Poppins] bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Sidebar */}
      <SidebarMedical />

      {/* Main content */}
      <main className="flex-1 ml-20 md:ml-60 p-6 space-y-8 transition-all duration-300">
        <h1 className="text-2xl font-bold text-[#0c4687]">Dossier Patient : {patient.nom} {patient.prenom}</h1>

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

        {/* Antécédents */}
        <div className="white-box p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><BookOpen size={20} /> Antécédents médicaux</h2>
          <ul className="list-disc list-inside text-gray-700">
            {patient.antecedents.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>

        {/* Traitements */}
        <div className="white-box p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Stethoscope size={20} /> Traitements en cours</h2>
          <ul className="text-gray-700">
            {patient.traitements.map((t, i) => (
              <li key={i}><strong>{t.nom}</strong> – {t.dosage}, {t.durée}</li>
            ))}
          </ul>
        </div>

        {/* Examens */}
        <div className="white-box p-6 space-y-3 overflow-x-auto">
          <h2 className="text-xl font-semibold flex items-center gap-2"><TestTube size={20} /> Résultats d’examens</h2>
          <table className="w-full text-sm mt-2">
            <thead className="text-left text-[#0c4687] border-b">
              <tr><th>Date</th><th>Type</th><th>Valeur</th><th>Unité</th></tr>
            </thead>
            <tbody>
              {patient.examens.map((e, i) => (
                <tr key={i} className="border-b text-gray-700 hover:bg-[#9ac441]/10">
                  <td>{e.date}</td><td>{e.type}</td><td>{e.valeur}</td><td>{e.unité}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Consultations */}
        <div className="white-box p-6 space-y-3 overflow-x-auto">
          <h2 className="text-xl font-semibold flex items-center gap-2"><ClipboardList size={20} /> Historique des consultations</h2>
          <table className="w-full text-sm mt-2">
            <thead className="text-left text-[#0c4687] border-b">
              <tr><th>Date</th><th>Motif</th><th>Médecin</th></tr>
            </thead>
            <tbody>
              {patient.consultations.map((c, i) => (
                <tr key={i} className="border-b text-gray-700 hover:bg-[#9ac441]/10">
                  <td>{c.date}</td><td>{c.motif}</td><td>{c.medecin}</td>
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
              {patient.documents.map((doc, i) => (
                <tr key={i} className="border-b text-gray-700 hover:bg-[#9ac441]/10">
                  <td>{doc.nom}</td><td>{doc.type}</td><td>{doc.date}</td>
                  <td><a href={doc.lien} target="_blank" rel="noopener noreferrer"><Download size={18} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
