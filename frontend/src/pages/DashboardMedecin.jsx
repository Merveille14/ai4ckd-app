import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "../App.css";
import { Home, Users, ClipboardList, BarChart, LogOut, Bell, Mail, Settings, CheckCircle, Clock, UserCheck, AlertTriangle, TrendingUp } from 'lucide-react';

const DashboardMedecin = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['14 fév', '15 fév', '16 fév', '17 fév', '18 fév', '19 fév', '20 fév'],
          datasets: [{
            label: "Évolution de la créatinine",
            data: [1.2, 1.5, 1.4, 1.8, 1.7, 1.6, 1.9],
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
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: { size: 14 }
              }
            },
            x: {
              ticks: {
                font: { size: 14 }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex font-[Poppins] bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Sidebar */}
      <div className="absolute left-6 top-4 text-white text-2xl cursor-pointer">
        <Settings />
      </div>

      <aside id="sidebar" className="ml-4 mt-4 mb-4 items-center glass-sidebar flex flex-col justify-between py-2 space-y-2 relative">
        <button id="toggleSidebar" className="absolute -right-3 top-20 bg-[#9ac441] text-white rounded-full p-1 shadow-lg">
          <BarChart />
        </button>

        <div className="flex items-center justify-center space-x-2 px-4">
          <span className="text-white text-1xl font-bold">AI4CKD</span>
        </div>

        <nav className="space-y-8 flex flex-col items-start px-4 text-white text-1xl pb-6">
          <a href="#" className="nav-link flex items-center space-x-3">
            <Home className="sidebar-icon" />
            <span className="sidebar-text">Accueil</span>
          </a>
          <a href="#" className="nav-link flex items-center space-x-3">
            <Users className="sidebar-icon" />
            <span className="sidebar-text">Patients</span>
          </a>
          <a href="#" className="nav-link flex items-center space-x-3">
            <BarChart className="sidebar-icon" />
            <span className="sidebar-text">Suivi</span>
          </a>
          <a href="#" className="nav-link flex items-center space-x-3">
            <ClipboardList className="sidebar-icon" />
            <span className="sidebar-text">Rapports</span>
          </a>
        </nav>

        <div className="flex flex-col items-start space-y-6 px-4 pb-6 text-white text-1xl">
          <div className="flex items-center space-x-3">
            <LogOut className="sidebar-icon" />
            <span className="sidebar-text">Déconnexion</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-9/12 p-10 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Bonjour, <span id="username">Docteur</span>!</h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="white-box p-6 text-center">
            <p className="text-1xl text-gray-600">Patients Suivis</p>
            <p className="text-2xl font-bold text-[#0c4687]">143</p>
          </div>
          <div className="white-box p-6 text-center">
            <p className="text-1xl text-gray-600">Alertes Critiques</p>
            <p className="text-2xl font-bold text-[#0c4687]">7</p>
          </div>
          <div className="white-box p-6 text-center">
            <p className="text-1xl text-gray-600">Consultations Hebdo</p>
            <p className="text-2xl font-bold text-[#0c4687]">32</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-6 col-span-1">
            <div className="white-box p-6 flex justify-between items-center">
              <div>
                <p className="text-1xl text-gray-600 mb-4">Patients hospitalisés</p>
                <p className="text-5xl font-bold text-[#0c4687]">12</p>
              </div>
              <span className="mt-7 bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">+2</span>
            </div>
            <div className="white-box p-6 flex justify-between items-center">
              <div>
                <p className="mb-4 text-1xl text-gray-600">Examens en attente</p>
                <p className="text-5xl font-bold text-[#0c4687]">6</p>
              </div>
              <span className="mt-10 bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">-1</span>
            </div>
          </div>

          <div className="white-box p-6 h-[320px] flex flex-col justify-between col-span-2">
            <h2 className="text-lg font-semibold text-gray-700">Évolution de la créatinine</h2>
            <div className="flex-1">
              <canvas ref={chartRef} className="w-full h-full"></canvas>
            </div>
          </div>

          <div className="glass-effect p-6 col-span-3">
            <h2 className="text-xl font-semibold mb-4">Actions médicales récentes</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src="https://via.placeholder.com/40" alt="Patient 1" className="rounded-full w-10 h-10" />
                  <div>
                    <p className="font-semibold">Patient Alpha</p>
                    <p className="text-sm text-gray-500">Analyse reçue</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">Aujourd'hui, 09:15</span>
              </li>
              <li className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src="https://via.placeholder.com/40" alt="Patient 2" className="rounded-full w-10 h-10" />
                  <div>
                    <p className="font-semibold">Patient Bêta</p>
                    <p className="text-sm text-gray-500">Ajout d’un traitement</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">Hier, 15:30</span>
              </li>
            </ul>
          </div>

          <div className="white-box p-6 col-span-3">
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
                <tr className="border-b">
                  <td>Patient A</td>
                  <td>Dialyse</td>
                  <td>Bien toléré</td>
                </tr>
                <tr className="border-b">
                  <td>Patient B</td>
                  <td>Médicament X</td>
                  <td>Effets secondaires légers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Right Column */}
      <aside className="w-72 glass-effect p-4 space-y-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 text-[#0c4687] text-2xl">
            <Mail />
            <Bell />
            <Settings />
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
