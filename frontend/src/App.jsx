import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardMedecin from './pages/medical_user/DashboardMedecin';
import PatientManage from './pages/medical_user/PatientManage';
import MedicalLogin from './pages/medical_user/medicalLogin';
import LoginPage from './pages/admin/login';
import Dashboard from './pages/admin/dashboard'

const App = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<MedicalLogin />} />
          <Route path="/user_medical/dashboard" element={<DashboardMedecin/>}/>
          <Route path="/user_medical/patient" element={<PatientManage/>}/>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<Dashboard/>} />
        </Routes>
     
    </Router>
  );
}

export default App;
