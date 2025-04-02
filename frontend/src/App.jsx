import React from "react";
import PatientTable from "./components/PatientTable";

function App() {
  console.log("App est rendu !");
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Patients</h1>
      <PatientTable />
    </div>
  );
}

export default App;
