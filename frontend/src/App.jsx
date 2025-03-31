import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importation des composants/pages

import LoginPage from './pages/admin/login';
import Dashboard from './pages/admin/dashboard'

const App = () => {
  return (
    <Router>
     
        <Routes>
          {/* Définir les routes */}
       
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<Dashboard/>} />
        </Routes>
     
    </Router>
  );
}

export default App;
