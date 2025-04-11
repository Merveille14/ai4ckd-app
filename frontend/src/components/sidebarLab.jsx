import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight,
  Home, TestTube2, Clock, ClipboardList, LogOut
} from 'lucide-react';

export default function SidebarLaborantin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <aside className={`fixed top-4 bottom-4 left-4 glass-sidebar flex flex-col justify-between py-4 transition-all duration-300 z-50 ${sidebarOpen ? 'w-60 px-4' : 'w-20 items-center'}`}>
      <button onClick={toggleSidebar} className="absolute -right-3 top-20 bg-[#9ac441] text-white rounded-full p-1 shadow-lg">
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      <div className="flex items-center justify-center mb-6">
        <span className="text-white text-xl font-bold">AI4CKD</span>
      </div>

      <nav className="space-y-8 flex flex-col text-white text-base mb-6">
        <Link to="/laborantin" className="nav-link flex items-center space-x-3">
          <Home className="sidebar-icon" />
          <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Accueil</span>
        </Link>

        <Link to="/laborantin/examens" className="nav-link flex items-center space-x-3">
          <TestTube2 className="sidebar-icon" />
          <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Examens</span>
        </Link>

        <Link to="/laborantin/historique" className="nav-link flex items-center space-x-3">
          <ClipboardList className="sidebar-icon" />
          <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Historique</span>
        </Link>
      </nav>

      <div className="flex flex-col space-y-6 text-white text-base">
        <div className="flex items-center space-x-3 cursor-pointer">
          <LogOut className="sidebar-icon" />
          <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>Déconnexion</span>
        </div>
      </div>
    </aside>
  );
}
