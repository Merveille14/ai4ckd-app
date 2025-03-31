import DashboardMedecin from './pages/DashboardMedecin';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardMedecin/>}/>
      </Routes>
    </Router>
  )
}

export default App
