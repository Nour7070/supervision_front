/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import './styles/tailwind.css';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import AddModerateur from './pages/AddModerateur';
import ModerateursListe from './pages/ModerateursListe';
import UsersList from './pages/UsersList';
import Permissions from './pages/Permissions';
import ModerateurStats from './pages/ModerateurStats';
import UserStat from './pages/UserStat';
import DemandesCours from './pages/DemandesCours';

function App()
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
            <Route path="formateur/:id/demandes" element={<DemandesCours />} />
          </Route>

          <Route path="permissions/:userId" element={<Permissions />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/moderateurs/:id/statistiques" element={<Dashboard />} />
          <Route path="/users/:userType/:id/statistiques" element={<UserStat />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;*/

import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-blue-900 text-white p-5">
          <h2 className="text-2xl mb-6">Dashboard</h2>
          <ul>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="#">Home</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="#">Profile</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-4">Welcome to your Dashboard</h1>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-3xl">120</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold">Active Courses</h3>
              <p className="text-3xl">8</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold">New Messages</h3>
              <p className="text-3xl">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded shadow-md">
                <p className="font-semibold">New course added</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </li>
              <li className="bg-white p-4 rounded shadow-md">
                <p className="font-semibold">User signed up</p>
                <p className="text-sm text-gray-600">3 hours ago</p>
              </li>
              <li className="bg-white p-4 rounded shadow-md">
                <p className="font-semibold">New message received</p>
                <p className="text-sm text-gray-600">5 hours ago</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
