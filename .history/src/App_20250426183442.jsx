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

/*function App()
{
  const [userType, setUserType] = useState('SUPERVISEUR');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout userType={userType} onLogout={() => { }} />}>
          <Route path="/dashboard" element={<Dashboard userType={userType} />} />
          <Route path="moderateurs">
            <Route index element={<ModerateursListe userType={userType} />} />
            <Route path="add" element={<AddModerateur />} />
          </Route>
          <Route path="users">
            <Route path="formateur" element={<UsersList userType="FORMATEUR" />} />
            <Route path="apprenant" element={<UsersList userType="APPRENANT" />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/moderateurs/:id/statistiques" element={<Dashboard />} />
          <Route path="/users/:userType/:id/stats" element={<UserStat />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
*/
function App() {
  const [userType, setUserType] = useState('SUPERVISEUR'); // À remplacer par votre vrai état d'authentification

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