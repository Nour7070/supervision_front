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
        <div className="w-64 bg-blue-900 text-white p-5 fixed h-full">
          <h2 className="text-2xl mb-6">Dashboard</h2>
          <ul>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="#" className="block">Home</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="#" className="block">Profile</a>
            </li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">
              <a href="#" className="block">Settings</a>
            </li>
          </ul>
        </div>

        {/* Main content - décalé pour la sidebar */}
        <div className="flex-1 p-6 ml-64">
          <h1 className="text-3xl font-semibold mb-4">Welcome to your Dashboard</h1>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">120</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Active Courses</h3>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">New Messages</h3>
              <p className="text-3xl font-bold text-yellow-600">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              <li className="border-b pb-3">
                <p className="font-semibold">New course added</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </li>
              <li className="border-b pb-3">
                <p className="font-semibold">User signed up</p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </li>
              <li>
                <p className="font-semibold">New message received</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;