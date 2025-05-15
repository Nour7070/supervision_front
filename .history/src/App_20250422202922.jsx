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
//import DemandesCours from './pages/DemandesCours';

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
          </Route>

          <Route path="permissions/:userId" element={<Permissions />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/moderateurs/:id/statistiques" element={<Dashboard />} />
          <Route path="/users/:userType/:id/stats" element={<UserStat />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
/*
import React from 'react';

export default function App()
{
  return (
    <div className="flex min-h-screen bg-gray-50">
     
      <div className="w-64 bg-blue-800 text-white p-4 fixed h-full">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            {['Home', 'Profile', 'Settings', 'Messages', 'Courses'].map(item => (
              <li key={item}>
                <button className="w-full text-left px-4 py-3 rounded hover:bg-blue-700 transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>
          <p className="text-gray-600">Here's what's happening today</p>
        </header>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Total Users', value: 120, color: 'blue' },
            { title: 'Active Courses', value: 8, color: 'green' },
            { title: 'New Messages', value: 5, color: 'purple' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-${stat.color}-100 text-${stat.color}-800 p-6 rounded-xl shadow`}
            >
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

       
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New course added', time: '2 hours ago', user: 'Admin' },
              { action: 'User signed up', time: '3 hours ago', user: 'John Doe' },
              { action: 'New message received', time: '5 hours ago', user: 'Jane Smith' }
            ].map((activity, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <p className="font-medium text-gray-700">{activity.action}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{activity.time}</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}*/