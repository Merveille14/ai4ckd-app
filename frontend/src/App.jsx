import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardMedecin from './pages/doctor/DashboardMedecin';
import PatientManage from './pages/doctor/PatientManage';
import PatientFile from './pages/doctor/PatientFile';
import MedicalLogin from './pages/doctor/medicalLogin';
import LoginPage from './pages/admin/login';
import Dashboard from './pages/admin/dashboard'

const App = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<MedicalLogin />} />
          <Route path="/doctor/dashboard" element={<DashboardMedecin/>}/>
          <Route path="/doctor/patients" element={<PatientManage/>}/>
          <Route path="/doctor/patient" element={<PatientFile/>}/>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<Dashboard/>} />
        </Routes>
     
    </Router>
  );
}

export default App;
