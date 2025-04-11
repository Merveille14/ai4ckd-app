import { Badge } from "@/components/ui/badge"
import { Users, HeartHandshake } from "lucide-react"
import Mychart from "./ui/mychart"
import { User } from "./users"
import api from "@/services/axios"
import { useState, useEffect } from "react"

export default function EcommerceMetrics() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [orders, setOrders] = useState(0); // à remplacer avec une vraie stat si dispo
  const [totalUsers, setTotalUsers] = useState(0);
  const fetchTotalUsers = async () => {
    try {
      const response = await api.get("/users/count");
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error("Erreur lors du fetch du total des utilisateurs :", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      const data = response.data;
      setTotalPatients(data.patients.total);
      // Tu peux récupérer aussi les workflows ou consultations ici
    } catch (error) {
      console.error("Erreur lors du fetch des stats :", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchTotalUsers();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div className="shadow-lg hover:shadow-2xl hover:translate-1 transition">
          <Mychart />
        </div>
        <div className="grid gap-4">
          {/* Patients */}
          <div className="rounded-2xl shadow-lg hover:shadow-2xl hover:translate-1 transition border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <Users className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Nombre de patients
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {totalPatients}
                </h4>
              </div>
            </div>
          </div>

          {/* Orders - Stat fictive pour l'exemple */}
          <div className="rounded-2xl border shadow-lg hover:shadow-2xl hover:translate-1 transition border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <HeartHandshake className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Consultations ce mois
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {orders}
                </h4>
              </div>
            
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-lg"><User /></div>
    </div>
  )
}
