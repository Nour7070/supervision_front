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
  import React, { useEffect, useState } from 'react';
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
            <Route
              path="/:userId/dashboard"
              element={
                userType === 'SUPERVISEUR'
                  ? <Dashboard />
                  : <DashboardMod />
              }
            />

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
