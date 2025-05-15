// src/services/api.js

export const getDashboardStats = async () => {
    const res = await fetch('/api/dashboard/stats');
    if (!res.ok) throw new Error('Erreur lors de la récupération des statistiques');
    return res.json();
  };
  
  export const getRecentActivities = async () => {
    const res = await fetch('/api/dashboard/activites-recentes');
    if (!res.ok) throw new Error('Erreur lors de la récupération des activités récentes');
    return res.json();
  };
  
  export const getModerateurActivities = async () => {
    const res = await fetch('/api/dashboard/moderateurs-activites');
    if (!res.ok) throw new Error('Erreur lors de la récupération des activités des modérateurs');
    return res.json();
  };
  