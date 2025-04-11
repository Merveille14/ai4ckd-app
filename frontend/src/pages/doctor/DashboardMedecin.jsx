// ✅ Version dynamique de DashboardMedecin.jsx avec données API
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import api from "@/services/axios";
import { 
  Mail, Bell, Settings, CheckCircle, Clock, UserCheck, AlertTriangle, TrendingUp 
} from 'lucide-react';
import SiderbarMedical from '@/components/sidebarMedical';
import '@/app.css';

const DashboardMedecin = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setDashboardData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (chartRef.current && dashboardData?.creatinineChart) {
      if (chartInstance.current) chartInstance.current.destroy();
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: dashboardData.creatinineChart.labels,
          datasets: [{
            label: "Évolution de la créatinine",
            data: dashboardData.creatinineChart.values,
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

 

  return (
    <div className="min-h-screen flex font-[Poppins] bg-gradient-to-br from-gray-100 to-gray-50">
      <SiderbarMedical />
      <main className="flex-1 ml-20 md:ml-60 p-6 space-y-8 transition-all duration-300">
        <h1 className="text-2xl font-semibold">Bonjour, Docteur !</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="white-box p-6 text-center">
            <p className="text-base text-gray-600">Patients Suivis</p>
            <p className="text-2xl font-bold text-[#0c4687]">{dashboardData.patientsSuivis}</p>
          </div>
          <div className="white-box p-6 text-center">
            <p className="text-base text-gray-600">Alertes Critiques</p>
            <p className="text-2xl font-bold text-[#0c4687]">{dashboardData.alertes}</p>
          </div>
          <div className="white-box p-6 text-center">
            <p className="text-base text-gray-600">Consultations Hebdo</p>
            <p className="text-2xl font-bold text-[#0c4687]">{dashboardData.consultationsHebdo}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 col-span-1">
            <div className="white-box p-6 flex justify-between items-center">
              <div>
                <p className="text-base text-gray-600 mb-4">Patients hospitalisés</p>
                <p className="text-5xl font-bold text-[#0c4687]">{dashboardData.hospitalises}</p>
              </div>
              <span className="mt-7 bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">+{dashboardData.hospitalisesVariation}</span>
            </div>
            <div className="white-box p-6 flex justify-between items-center">
              <div>
                <p className="mb-4 text-base text-gray-600">Examens en attente</p>
                <p className="text-5xl font-bold text-[#0c4687]">{dashboardData.examensAttente}</p>
              </div>
              <span className="mt-10 bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">{dashboardData.examensVariation}</span>
            </div>
          </div>

          <div className="white-box p-6 h-[320px] flex flex-col justify-between col-span-2 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700">Évolution de la créatinine</h2>
            <div className="flex-1">
              <canvas ref={chartRef} className="w-full h-full" />
            </div>
          </div>

          <div className="glass-effect p-6 col-span-3">
            <h2 className="text-xl font-semibold mb-4">Actions médicales récentes</h2>
            <ul className="divide-y divide-gray-200">
              {dashboardData.actionsRecents.map((action, i) => (
                <li key={i} className="py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src={action.avatar} alt={action.nom} className="rounded-full w-10 h-10" />
                    <div>
                      <p className="font-semibold">{action.nom}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{action.heure}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="white-box p-6 col-span-3 overflow-x-auto">
            <h2 className="text-lg font-semibold">Suivi des traitements</h2>
            <table className="w-full text-left mt-4">
              <thead>
                <tr className="border-b">
                  <th className="pb-2">Nom</th>
                  <th className="pb-2">Traitement</th>
                  <th className="pb-2">Observations</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.traitements.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td>{row.nom}</td>
                    <td>{row.traitement}</td>
                    <td>{row.observation}</td>
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
