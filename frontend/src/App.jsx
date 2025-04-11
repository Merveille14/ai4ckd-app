import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardMedecin from './pages/doctor/DashboardMedecin';
import PatientManage from './pages/doctor/PatientManage';
import PatientFile from './pages/doctor/PatientFile';
import LoginPage from './pages/auth/login';
import Dashboard from './pages/admin/dashboard'
import PatientTable from "./components/PatientTable";
import DashboardLaborantin from "./pages/laborantin/DashbardLaborantin";

const App = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/"  element={<LoginPage />}  />
          <Route path="/dashboard/doctor" element={<DashboardMedecin/>}/>
          <Route path="/dashboard/laborantin" element={<DashboardLaborantin/>}/>
          <Route path="/patients" element={<PatientManage/>}/>
          <Route path="/patient/:id" element={<PatientFile />} />
          <Route path="/dashboard/admin" element={<Dashboard/>} />
          <Route  path="/patientsTables" element={<PatientTable />} />
        </Routes>
     
    </Router>
  )
}

export default App;
