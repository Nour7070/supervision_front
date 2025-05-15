// src/components/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { AcademicCapIcon, UserIcon, UserGroupIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import StatsCard from './StatsCards';
import DashboardActivityTable from './DashboardActivityTable';
import ModeratorActivitiesTable from './ModeratorActivitiesTable';
import { getDashboardStats, getRecentActivities, getModerateurActivities } from '@/services/api';
function Dashboard() {
  const [stats, setStats] = useState({
    userTypes: { formateurs: 0, apprenants: 0, moderateurs: 0 },
    quizz: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [moderateurActivities, setModerateurActivities] = useState([]);

  const activityData = [
    { name: 'Jan', validations: 12, inscriptions: 28 },
    { name: 'Fév', validations: 19, inscriptions: 25 },
    { name: 'Mar', validations: 15, inscriptions: 30 },
    { name: 'Avr', validations: 22, inscriptions: 22 },
    { name: 'Mai', validations: 28, inscriptions: 15 },
    { name: 'Juin', validations: 25, inscriptions: 18 },
  ];

  /*useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);

    fetch('/api/dashboard/activites-recentes')
      .then(res => res.json())
      .then(data => setRecentActivities(data))
      .catch(console.error);

    fetch('/api/dashboard/moderateurs-activites')
      .then(res => res.json())
      .then(data => setModerateurActivities(data))
      .catch(console.error);
  }, []);*/
  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
    getRecentActivities().then(setRecentActivities).catch(console.error);
    getModerateurActivities().then(setModerateurActivities).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Formateurs" value={stats.userTypes.formateurs} icon={<AcademicCapIcon className="h-6 w-6" />} color="bg-blue-500" />
        <StatsCard title="Apprenants" value={stats.userTypes.apprenants} icon={<UserIcon className="h-6 w-6" />} color="bg-green-500" />
        <StatsCard title="Modérateurs" value={stats.userTypes.moderateurs} icon={<UserGroupIcon className="h-6 w-6" />} color="bg-purple-500" />
        <StatsCard title="Quizz" value={stats.quizz} icon={<QuestionMarkCircleIcon className="h-6 w-6" />} color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité mensuelle</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="validations" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="inscriptions" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribution des utilisateurs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Formateurs', count: stats.userTypes.formateurs },
              { name: 'Apprenants', count: stats.userTypes.apprenants },
              { name: 'Modérateurs', count: stats.userTypes.moderateurs },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ModeratorActivitiesTable moderators={moderateurActivities.map(m => ({
        id: m.id,
        name: m.name,
        approved: m.approvedCount,
        rejected: m.rejectedCount,
        pending: m.pendingCount
      }))} />

      <DashboardActivityTable activities={recentActivities} />
    </div>
  );
}

export default Dashboard;
