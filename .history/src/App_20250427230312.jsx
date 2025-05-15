import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import './styles/tailwind.css';
import Dashboard from './pages/Dashboard';
import DashboardMod from './pages/DashboardMod';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import AddModerateur from './pages/AddModerateur';
import ModerateursListe from './pages/ModerateursListe';
import UsersList from './pages/UsersList';
import UserStat from './pages/UserStat';


function App() {
  const [userType, setUserType] = useState('SUPERVISEUR'); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout userType={userType} onLogout={() => { }} />}>
          <Route 
            path="/dashboard" 
            element={
              userType === 'SUPERVISEUR' 
                ? <Dashboard userType={userType} /> 
                : <DashboardMod userType={userType} />
            } 
          />
          <Route path="users">
            <Route path="formateur" element={<UsersList userType="FORMATEUR" />} />
            <Route path="apprenant" element={<UsersList userType="APPRENANT" />} />
          </Route>
          {userType === 'SUPERVISEUR' && (
            <Route path="moderateurs">
              <Route index element={<ModerateursListe userType={userType} />} />
              <Route path="add" element={<AddModerateur />} />
            </Route>
          )}

          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {userType === 'SUPERVISEUR' && (
            <Route path="/moderateurs/:id/statistiques" element={<Dashboard />} />
          )}
          
          <Route path="/users/:userType/:id/stats" element={<UserStat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
/*import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Autres imports...

function App() {
  // Au lieu d'avoir un userType en dur
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Récupérer le rôle depuis localStorage (celui stocké lors de la connexion)
    const role = localStorage.getItem('role');
    
    // Vérifier si l'utilisateur a le droit d'accéder à ce service
    if (role === 'SUPERVISEUR' || role === 'MODERATEUR') {
      setUserType(role);
    } else {
      // Redirection vers le service d'authentification si rôle non autorisé
      window.location.href = 'http://localhost:3000';
      return;
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Chargement...</div>; // Ou un spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout userType={userType} onLogout={() => {
          // Gérer la déconnexion
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          window.location.href = 'http://localhost:3000';
        }} />}>
          {/* Redirection par défaut vers le dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Le reste de votre routing selon le userType */}
          <Route 
            path="/dashboard" 
            element={
              userType === 'SUPERVISEUR' 
                ? <Dashboard userType={userType} /> 
                : <DashboardMod userType={userType} />
            } 
          />
          
          {/* Routes communes aux deux rôles */}
          <Route path="users">
            <Route path="formateur" element={<UsersList userType="FORMATEUR" />} />
            <Route path="apprenant" element={<UsersList userType="APPRENANT" />} />
          </Route>
          
          {userType === 'SUPERVISEUR' && (
            <Route path="moderateurs">
              <Route index element={<ModerateursListe userType={userType} />} />
              <Route path="add" element={<AddModerateur />} />
              <Route path=":id/statistiques" element={<Dashboard />} />
            </Route>
          )}
          
          <Route path="/users/:userType/:id/stats" element={<UserStat />} />
          
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/unauthorized" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; */