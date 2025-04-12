import { useEffect, useState } from "react"
import axios from "axios"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale } from 'chart.js'
import { Users, HeartHandshake, Shield, FileText, Laptop } from "lucide-react"
import { User } from "./users"
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale)

export default function EcommerceMetrics() {
  const [roleCounts, setRoleCounts] = useState({})
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/count-by-role")
      .then((res) => {
        const data = res.data.data
        setRoleCounts(data)
        setTotalUsers(Object.values(data).reduce((acc, count) => acc + count, 0))
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des rôles :", err)
      })
  }, [])

  // Prépare les données pour le graphique circulaire
  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: 'Répartition des rôles',
        data: Object.values(roleCounts),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
        hoverOffset: 4,
      },
    ],
  }

  // Options pour personnaliser le graphique
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
      // Ajouter un plugin pour afficher le total au centre
      datalabels: {
        display: true,
        formatter: () => `Total: ${totalUsers}`,
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#333',
        anchor: 'center',
        align: 'center',
      },
    },
  }

  return (
    <div>
       <h1 className=" font-bold text-3xl">Gestion des utilisateurs</h1>
      {/* Rôles dynamiques */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(roleCounts).map(([role, count]) => (
          <div
            key={role}
            className="rounded-2xl border shadow-lg hover:shadow-2xl hover:translate-1 transition border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              {/* Icone par rôle */}
              <Users className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {role.replace("_", " ")}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {count}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="relative w-100 m-auto">
         
          <Pie data={chartData} options={chartOptions} />
           <div className=" text-center mt-10 text-2xl text-black-500 font-bold">
            Total Utilisateurs: {totalUsers}
          </div>
        </div>
      </div>
      {/* Graphique circulaire */}
     

      {/* Tableau utilisateur */}
      <div className="mt-6 shadow-lg">
        <User />
      </div>
    </div>
  )
}
