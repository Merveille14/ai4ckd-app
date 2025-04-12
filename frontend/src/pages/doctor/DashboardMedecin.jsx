import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import api from "@/services/axios";
import { Mail, Bell, Settings, CheckCircle, Clock, UserCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import SiderbarMedical from '@/components/sidebarMedical';
import '../../App.css';

const DashboardMedecin = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    api.get("/dashboard")
      .then(res => {
        setDashboardData(res.data.data);
        setLoading(false); // Une fois les données récupérées, on arrête le chargement
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // On arrête aussi le chargement en cas d'erreur
      });
  }, []);

  useEffect(() => {
    if (chartRef.current && dashboardData?.consultationsParMois) {
      if (chartInstance.current) chartInstance.current.destroy();

      const moisLabels = dashboardData.consultationsParMois.map(item => `Mois ${item.mois}`);
      const consultations = dashboardData.consultationsParMois.map(item => item.total);

      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: moisLabels,
          datasets: [{
            label: "Consultations par mois",
            data: consultations,
            borderColor: '#0c4687',
            backgroundColor: 'rgba(12, 70, 135, 0.2)',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#9ac441',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { font: { size: 14 } } },
            x: { ticks: { font: { size: 14 } } }
          }
        }
      });
    }
  }, [dashboardData]);

  if (loading) {
    return <div>Chargement...</div>; // Affiche un message ou un spinner pendant le chargement
  }

  return (
    <div className="min-h-screen flex font-[Poppins] bg-gradient-to-br from-gray-100 to-gray-50">
      <SiderbarMedical />
      <main className="flex-1 ml-20 md:ml-60 p-6 space-y-8 transition-all duration-300">
        <h1 className="text-2xl font-semibold">Bonjour, Docteur !</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="white-box p-6 text-center">
            <p className="text-base text-gray-600">Patients Suivis</p>
            <p className="text-2xl font-bold text-[#0c4687]">{dashboardData.totalPatients}</p>
          </div>
          <div className="white-box p-6 text-center">
            <p className="text-base text-gray-600">Alertes Critiques</p>
            <p className="text-2xl font-bold text-[#0c4687]">{dashboardData.alertesCritiques}</p>
          </div>
          <div className="white-box p-6 text-center">
            <p className="text-base text-gray-600">Consultations ce mois</p>
            <p className="text-2xl font-bold text-[#0c4687]">
              {dashboardData.consultationsParMois?.reduce((sum, c) => sum + c.total, 0)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="white-box p-6 h-[320px] flex flex-col justify-between col-span-3 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700">Évolution des consultations</h2>
            <div className="flex-1">
              <canvas ref={chartRef} className="w-full h-full" />
            </div>
          </div>

          <div className="white-box p-6 col-span-3 overflow-x-auto">
            <h2 className="text-lg font-semibold">Prochains rendez-vous</h2>
            <table className="w-full text-left mt-4">
              <thead>
                <tr className="border-b">
                  <th className="pb-2">Patient</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Heure</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.prochainsRendezVous.map((rdv, i) => (
                  <tr key={i} className="border-b">
                    <td>{rdv.patient?.nom ?? 'N/A'}</td> {/* Assurez-vous que votre modèle RendezVous a une relation avec Patient */}
                    <td>{new Date(rdv.date_rendezvous).toLocaleDateString()}</td>
                    <td>{new Date(rdv.date_rendezvous).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <aside className="w-72 glass-effect p-4 space-y-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 text-[#0c4687] text-2xl">
            <Mail /><Bell /><Settings />
          </div>
          <img src="https://via.placeholder.com/40" alt="Profil" className="rounded-full w-12 h-12 border-2 border-white" />
        </div>

        <div className="white-box p-4 space-y-3">
          <h2 className="font-semibold text-lg">Alertes critiques</h2>
          <p className="text-sm text-gray-500">Taux d’urée élevé</p>
          <p className="text-sm text-gray-500">Absence consultation</p>
          <button className="w-full py-2 rounded-lg bg-[#9ac441] text-white font-semibold">
            Gérer les Patients
          </button>
        </div>

        <div className="p-4 space-y-3">
          <h2 className="font-semibold text-lg">À faire</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center space-x-3"><CheckCircle className="text-[#9ac441]" /><span>Lire les résultats</span></li>
            <li className="flex items-center space-x-3"><Clock className="text-[#0c4687]" /><span>Préparer ordonnances</span></li>
            <li className="flex items-center space-x-3"><UserCheck className="text-[#0c4687]" /><span>Appeler un patient</span></li>
          </ul>
        </div>

        <div className="white-box p-4 text-gray-700 space-y-3 mt-auto">
          <h2 className="font-semibold text-lg">À savoir</h2>
          <p><AlertTriangle className="text-[#9ac441] inline-block mr-2" /> Suivi renforcé des stades 4+</p>
          <p><TrendingUp className="text-[#0c4687] inline-block mr-2" /> Bonnes performances cette semaine</p>
        </div>
      </aside>
    </div>
  );
};

export default DashboardMedecin;
