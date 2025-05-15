// src/components/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { 
  AcademicCapIcon, 
  UserIcon, 
  UserGroupIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/outline';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  ResponsiveContainer 
} from 'recharts';
import StatsCard from './StatsCards';
import DashboardActivityTable from './DashboardActivityTable';
import ModeratorActivitiesTable from './ModeratorActivitiesTable';
import { getDashboardStats, getRecentActivities, getModerateurActivities } from '../../services/api';

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

  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
    getRecentActivities().then(setRecentActivities).catch(console.error);
    getModerateurActivities().then(setModerateurActivities).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard 
          title="Formateurs" 
          value={stats.userTypes.formateurs} 
          icon={<AcademicCapIcon className="h-4 w-4 sm:h-5 sm:w-5" />} 
          color="bg-blue-500" 
        />
        <StatsCard 
          title="Apprenants" 
          value={stats.userTypes.apprenants} 
          icon={<UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />} 
          color="bg-green-500" 
        />
        <StatsCard 
          title="Modérateurs" 
          value={stats.userTypes.moderateurs} 
          icon={<UserGroupIcon className="h-4 w-4 sm:h-5 sm:w-5" />} 
          color="bg-purple-500" 
        />
        <StatsCard 
          title="Quizz" 
          value={stats.quizz} 
          icon={<QuestionMarkCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />} 
          color="bg-yellow-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité mensuelle</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line type="monotone" dataKey="validations" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="inscriptions" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribution des utilisateurs</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={[
                  { name: 'Formateurs', count: stats.userTypes.formateurs },
                  { name: 'Apprenants', count: stats.userTypes.apprenants },
                  { name: 'Modérateurs', count: stats.userTypes.moderateurs },
                ]}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ModeratorActivitiesTable 
          moderators={moderateurActivities.map(m => ({
            id: m.id,
            name: m.name,
            approved: m.approvedCount,
            rejected: m.rejectedCount,
            pending: m.pendingCount
          }))} 
        />
      </div>

      <div className="mt-6">
        <DashboardActivityTable activities={recentActivities} />
      </div>
    </div>
  );
}

export default Dashboard;