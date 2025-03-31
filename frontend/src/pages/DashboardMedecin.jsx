import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const DashboardMedecin = () => {
  useEffect(() => {
    const ctx = document.getElementById('paymentChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['14 fév', '15 fév', '16 fév', '17 fév', '18 fév', '19 fév', '20 fév'],
        datasets: [{
          label: 'Évolution des Paiements',
          data: [12000, 15000, 13000, 17000, 19000, 16000, 18000],
          borderColor: '#0c4687',
          backgroundColor: 'rgba(12, 70, 135, 0.2)',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#9ac441',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 5000, font: { size: 14 } },
          },
          x: {
            ticks: { font: { size: 14 } },
          },
        },
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-50">
      <aside className="w-20 md:w-64 bg-[#0c4687] text-white p-4 flex flex-col justify-between rounded-r-2xl shadow-lg">
        <div>
          <h1 className="text-xl font-bold mb-10 hidden md:block">AI4CKD</h1>
          <nav className="space-y-6">
            <div className="flex items-center space-x-4 cursor-pointer">
              <i className="ph ph-house"></i><span className="hidden md:inline">Accueil</span>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer">
              <i className="ph ph-users"></i><span className="hidden md:inline">Patients</span>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer">
              <i className="ph ph-chart-bar"></i><span className="hidden md:inline">Suivi</span>
            </div>
          </nav>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer">
          <i className="ph ph-power"></i><span className="hidden md:inline">Déconnexion</span>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 space-y-8">
        <h1 className="text-2xl font-semibold text-[#0c4687]">Bonjour, Docteur !</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-600">Total Patients</p>
            <p className="text-3xl font-bold text-[#9ac441]">124</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-600">Alertes Actives</p>
            <p className="text-3xl font-bold text-[#9ac441]">5</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-600">Consultations Aujourd'hui</p>
            <p className="text-3xl font-bold text-[#0c4687]">9</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-[#0c4687] mb-4">Évolution des indicateurs</h2>
          <canvas id="paymentChart" className="w-full h-64"></canvas>
        </div>
      </main>
    </div>
  );
};

export default DashboardMedecin;
