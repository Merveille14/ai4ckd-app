import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardMedecin from './pages/doctor/DashboardMedecin';
import PatientManage from './pages/doctor/PatientManage';
import PatientFile from './pages/doctor/PatientFile';
import LoginPage from './pages/auth/login';
import Dashboard from './pages/admin/dashboard'
import PatientTable from "./components/PatientTable";

const App = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/"  element={<LoginPage />}  />
          <Route path="/doctor/dashboard" element={<DashboardMedecin/>}/>
          <Route path="/patient/:id" element={<PatientFile />} />
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route  path="/patientsTables" element={<PatientTable />} />
          <Route path="/patients" element={<PatientManage />} />
        </Routes>
     
    </Router>
  )
}

export default App;
