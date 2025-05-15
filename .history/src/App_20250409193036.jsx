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
      {/* Sidebar fixe */}
      <div className="fixed w-64 h-full bg-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-3">
            {['Home', 'Profile', 'Settings', 'Messages', 'Courses'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="ml-64 p-8">
        {/* En-tête */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>
          <p className="text-gray-600">Here's what's happening today</p>
        </header>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Total Users', value: '120', color: 'bg-blue-100 text-blue-800' },
            { title: 'Active Courses', value: '8', color: 'bg-green-100 text-green-800' },
            { title: 'New Messages', value: '5', color: 'bg-purple-100 text-purple-800' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl shadow-sm ${stat.color}`}
            >
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Activité récente */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New course added', time: '2 hours ago', user: 'Admin' },
              { action: 'User signed up', time: '3 hours ago', user: 'John Doe' },
              { action: 'New message received', time: '5 hours ago', user: 'Jane Smith' },
            ].map((activity, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <p className="font-medium">{activity.action}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{activity.time}</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;