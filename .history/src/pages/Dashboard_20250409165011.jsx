import { useState, useEffect } from 'react';
import { 
  UserIcon, 
  AcademicCapIcon, 
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

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function DashboardActivityTable({ activities }) {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Activités récentes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Utilisateur #{activity.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity.action}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ModeratorActivitiesTable({ moderators }) {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Activités des modérateurs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modérateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approuvés
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rejetés
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                En attente
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {moderators.map((moderator) => (
              <tr key={moderator.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{moderator.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-600">{moderator.approved}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600">{moderator.rejected}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-yellow-600">{moderator.pending}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    userTypes: {
      formateurs: 0,
      apprenants: 0,
      moderateurs: 0
    },
    quizz: 0
  });
  
  const [recentActivities, setRecentActivities] = useState([]);
  const [moderateurActivities, setModerateurActivities] = useState([]);
  
  // Données fictives pour les graphiques
  const activityData = [
    { name: 'Jan', validations: 12, inscriptions: 28 },
    { name: 'Fév', validations: 19, inscriptions: 25 },
    { name: 'Mar', validations: 15, inscriptions: 30 },
    { name: 'Avr', validations: 22, inscriptions: 22 },
    { name: 'Mai', validations: 28, inscriptions: 15 },
    { name: 'Juin', validations: 25, inscriptions: 18 },
  ];
  
  useEffect(() => {
    // Appel API pour les statistiques
    fetch('/api/dashboard/stats')
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Erreur lors de la récupération des stats:', error));
    
    // Appel API pour les activités récentes
    fetch('/api/dashboard/activites-recentes')
      .then(response => response.json())
      .then(data => setRecentActivities(data))
      .catch(error => console.error('Erreur lors de la récupération des activités:', error));
    
    // Appel API pour les activités des modérateurs
    fetch('/api/dashboard/moderateurs-activites')
      .then(response => response.json())
      .then(data => setModerateurActivities(data))
      .catch(error => console.error('Erreur lors de la récupération des activités des modérateurs:', error));
  }, []);
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tableau de bord</h1>
      
      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Formateurs" 
          value={stats.userTypes.formateurs} 
          icon={<AcademicCapIcon className="h-6 w-6" />} 
          color="bg-blue-500" 
        />
        <StatsCard 
          title="Apprenants" 
          value={stats.userTypes.apprenants} 
          icon={<UserIcon className="h-6 w-6" />} 
          color="bg-green-500" 
        />
        <StatsCard 
          title="Modérateurs" 
          value={stats.userTypes.moderateurs}
          icon={<UserGroupIcon className="h-6 w-6" />} 
          color="bg-purple-500" 
        />
        <StatsCard 
          title="Quizz" 
          value={stats.quizz} 
          icon={<QuestionMarkCircleIcon className="h-6 w-6" />} 
          color="bg-yellow-500" 
        />
      </div>
      
      {/* Graphiques */}
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
              { name: 'Modérateurs', count: stats.userTypes.moderateurs }
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
      
      {/* Tableaux d'activités */}
      <ModeratorActivitiesTable 
        moderators={moderateurActivities.map(m => ({
          id: m.id,
          name: m.name,
          approved: m.approvedCount,
          rejected: m.rejectedCount,
          pending: m.pendingCount
        }))} 
      />
      
      <DashboardActivityTable activities={recentActivities} />
    </div>
  );
}

export default Dashboard;