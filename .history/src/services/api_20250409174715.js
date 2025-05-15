// src/services/api.js - version statique avec données simulées

// Données statiques pour les statistiques du tableau de bord
const mockStats = {
  userTypes: { formateurs: 24, apprenants: 450, moderateurs: 8 },
  quizz: 75
};

// Données statiques pour les activités récentes
const mockRecentActivities = [
  { userId: 123, action: "S'est inscrit à un cours", timestamp: '2025-04-05T14:30:00' },
  { userId: 456, action: "A terminé un cours", timestamp: '2025-04-05T10:15:00' },
  { userId: 789, action: "A créé un quiz", timestamp: '2025-04-04T16:45:00' },
  { userId: 321, action: "A validé un cours", timestamp: '2025-04-04T09:20:00' },
  { userId: 654, action: "A rejoint une équipe", timestamp: '2025-04-03T11:05:00' }
];

// Données statiques pour les activités des modérateurs
const mockModerateurActivities = [
  { id: 1, name: "Alice Martin", approvedCount: 45, rejectedCount: 12, pendingCount: 5 },
  { id: 2, name: "Thomas Bernard", approvedCount: 38, rejectedCount: 7, pendingCount: 10 },
  { id: 3, name: "Sophie Dubois", approvedCount: 52, rejectedCount: 9, pendingCount: 3 },
  { id: 4, name: "Lucas Petit", approvedCount: 27, rejectedCount: 15, pendingCount: 8 }
];

// Fonctions d'API simulées qui retournent des promesses avec des données statiques
export const getDashboardStats = async () =>
{
  return Promise.resolve(mockStats);
};

export const getRecentActivities = async () =>
{
  return Promise.resolve(mockRecentActivities);
};

export const getModerateurActivities = async () =>
{
  return Promise.resolve(mockModerateurActivities);
};