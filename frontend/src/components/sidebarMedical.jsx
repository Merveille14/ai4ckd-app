import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Home, Users, ClipboardList, BarChart, LogOut, Bell, Mail, Settings, CheckCircle, Clock, UserCheck, AlertTriangle, TrendingUp } from 'lucide-react';
export default function SiderbarMedical (){
     const [sidebarOpen, setSidebarOpen] = useState(false);
      const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    return(
        <div>
              <aside id="sidebar" className={`fixed top-4 bottom-4  left-4 glass-sidebar flex flex-col justify-between py-4 transition-all duration-300 z-50 ${sidebarOpen ? 'w-60 px-4' : 'w-20 items-center'}`}>
      <button onClick={toggleSidebar} className="absolute -right-3 top-20 bg-[#9ac441] text-white rounded-full p-1 shadow-lg">
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>


        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-white text-xl font-bold">AI4CKD</span>
        </div>

        <nav className="space-y-8 flex flex-col text-white text-base mb-6">
          <a href="#" className="nav-link flex items-center space-x-3">
            <Home className="sidebar-icon" />
            <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Accueil</span>
          </a>
          <a href="#" className="nav-link flex items-center space-x-3">
            <Users className="sidebar-icon" />
            <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Patients</span>
          </a>
          <a href="#" className="nav-link flex items-center space-x-3">
            <BarChart className="sidebar-icon" />
            <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Suivi</span>
          </a>
          <a href="#" className="nav-link flex items-center space-x-3">
            <ClipboardList className="sidebar-icon" />
            <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Rapports</span>
          </a>
        </nav>

        <div className="flex flex-col space-y-6 text-white text-base">
          <div className="flex items-center space-x-3">
            <LogOut className="sidebar-icon" />
            <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Déconnexion</span>
          </div>
        </div>
      </aside>
        </div>
    );
}