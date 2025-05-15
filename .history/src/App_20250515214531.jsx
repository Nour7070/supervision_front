  /*import React, { useState } from 'react';
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
  import TrainerRequestsTable from './pages/TrainerRequestsTable';
  import CourseRequestsTable from './pages/CourseRequestsTable';

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
            <Route 
              path="/admin/trainer-requests" 
              element={<TrainerRequestsTable />} 
            />
            <Route 
              path="/admin/course-requests" 
              element={<CourseRequestsTable />} 
            />
          </Route>
        </Routes>
      </Router>
    );
  }

  export default App;
  */
 /* <Route
              path="/:userId/dashboard"
              element={
                userType === 'SUPERVISEUR'
                  ? <Dashboard />
                  : <DashboardMod />
              }
            /> */
  /*import React, { useEffect, useState } from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Layout from './components/Layout';
  import Dashboard from './pages/Dashboard';
  import DashboardMod from './pages/DashboardMod';
  import Unauthorized from './components/Unauthorized';
  import AddModerateur from './pages/AddModerateur';
  import ModerateursListe from './pages/ModerateursListe';
  import UsersList from './pages/UsersList';
  import UserStat from './pages/UserStat';
  import TrainerRequestsTable from './pages/TrainerRequestsTable';
  import CourseRequestsTable from './pages/CourseRequestsTable';
  import './styles/tailwind.css';

  function App() {
    const [userType, setUserType] = useState('');

    useEffect(() => {
      const storedType = localStorage.getItem('userType');
      if (storedType) setUserType(storedType);
    }, []);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout userType={userType} onLogout={() => {}} />}>
           
          <Route path="/:userType/:userId/dashboard" element={
            userType === 'SUPERVISEUR' ? 
              <Dashboard userType="SUPERVISEUR" /> : 
              <DashboardMod userType="MODERATEUR" />
          } />
            <Route
              path="/users/:userType/:userId/stats"
              element={<UserStat />}
            />

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

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin/trainer-requests" element={<TrainerRequestsTable />} />
            <Route path="/admin/course-requests" element={<CourseRequestsTable />} />
          </Route>
        </Routes>
      </Router>
    );
  }

  export default App;
*/
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DashboardMod from './pages/DashboardMod';
import Unauthorized from './components/Unauthorized';
import AddModerateur from './pages/AddModerateur';
import ModerateursListe from './pages/ModerateursListe';
import UsersList from './pages/UsersList';
import UserStat from './pages/UserStat';
import TrainerRequestsTable from './pages/TrainerRequestsTable';
import CourseRequestsTable from './pages/CourseRequestsTable';
import './styles/tailwind.css';

const DashboardWrapper = () => {
  const { userType, userId } = useParams();
  
  // Validation des paramètres
  if (!userId || !userType) {
    console.error('Paramètres manquants dans l\'URL');
    return <Navigate to="/unauthorized" />;
  }

  // Stockage des données dans localStorage
  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType.toUpperCase());
  }, [userId, userType]);

  switch(userType.toLowerCase()) {
    case 'superviseur':
      return <Dashboard userType="SUPERVISEUR" userId={userId} />;
    case 'moderateur':
      return <DashboardMod userType="MODERATEUR" userId={userId} />;
    default:
      return <Navigate to="/unauthorized" />;
  }
};

function App() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Vérification initiale de l'authentification
    const storedType = localStorage.getItem('userType');
    const storedId = localStorage.getItem('userId');

    if (!storedType || !storedId) {
      console.log('Redirection vers l\'auth - données manquantes');
      window.location.href = "http://localhost:5173";
      return;
    }

    setUserType(storedType);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route d'authentification croisée */}
        <Route 
          path="/auth-callback" 
          element={<AuthCallback />} 
        />

        <Route path="/" element={<Layout userType={userType} onLogout={() => {
          localStorage.clear();
          window.location.href = "http://localhost:5173";
        }} />}>
          
          {/* Nouvelle structure de routes */}
          <Route path="dashboard/:userId" element={<DashboardWrapper />} />
          
          <Route path="users/:userType/:userId/stats" element={<UserStat />} />

          <Route path="users">
            <Route path="formateur" element={<UsersList userType="FORMATEUR" />} />
            <Route path="apprenant" element={<UsersList userType="APPRENANT" />} />
          </Route>

          {userType === 'SUPERVISEUR' && (
            <Route path="moderateurs">
              <Route index element={<ModerateursListe />} />
              <Route path="add" element={<AddModerateur />} />
              <Route path=":id/statistiques" element={<Dashboard />} />
            </Route>
          )}

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin/trainer-requests" element={<TrainerRequestsTable />} />
          <Route path="/admin/course-requests" element={<CourseRequestsTable />} />
        </Route>

        {/* Redirection de fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Nouveau composant pour gérer la redirection depuis l'auth
const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      console.error('Token manquant dans l\'URL');
      return navigate('/unauthorized');
    }

    try {
      const authData = JSON.parse(atob(token));
      localStorage.setItem('userId', authData.userId);
      localStorage.setItem('userType', authData.userType);
      localStorage.setItem('userEmail', authData.email);

      navigate(`/dashboard/${authData.userId}`);
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      navigate('/unauthorized');
    }
  }, [navigate, searchParams]);

  return <div>Chargement...</div>;
};

export default App;