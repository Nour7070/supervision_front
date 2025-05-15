import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Book, Award, Users, AlertCircle } from 'lucide-react';
import axios from '../axios';

const UserStat = () => {
    const { userType, id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usingFallbackData, setUsingFallbackData] = useState(false);

    // Données par défaut adaptées aux nouvelles statistiques
    const defaultFormateurData = {
        name: "Nom du Formateur",
        email: "formateur@example.com",
        photo: "https://via.placeholder.com/150",
        dateIntegration: "01/01/2023",
        coursPublies: 0,
        coursEnAttente: 0,
        etudiantsAbonnes: 0
    };

    const defaultApprenantData = {
        name: "Nom de l'Apprenant",
        email: "apprenant@example.com",
        photo: "https://via.placeholder.com/150",
        dateIntegration: "01/09/2023",
        tempsTotalEnSecondes: 0,
        progressionParDomaine: {},
        formateursSuivis: 0
    };
    const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};
useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        let url = '';
        if (userType === 'FORMATEUR') {
          url = `/api/stats/formateurs/${id}`;
        } else if (userType === 'APPRENANT') {
          url = `/api/stats/apprenants/${id}`;
        } else {
          throw new Error("Type d'utilisateur non reconnu");
        }
  
        // Configuration Axios avec timeout et headers
        const config = {
          timeout: 5000, // 5 secondes de timeout
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
  
        const response = await axios.get(url, config);
        
        console.log("Réponse Axios:", response);
        
        // Axios parse automatiquement le JSON, pas besoin de JSON.parse()
        const completeData = completeStatsData(response.data);
        setStats(completeData);
        
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques:", err);
        
        // Gestion plus fine des erreurs avec Axios
        let errorMessage = "Erreur lors du chargement des statistiques";
        if (err.response) {
          // Erreur avec réponse du serveur (4xx, 5xx)
          console.error("Détails erreur:", err.response.data);
          errorMessage = `Erreur serveur: ${err.response.status}`;
        } else if (err.request) {
          // Pas de réponse reçue
          errorMessage = "Pas de réponse du serveur";
        }
        
        setUsingFallbackData(true);
        if (userType === 'FORMATEUR') {
          setStats({...defaultFormateurData, id});
        } else {
          setStats({...defaultApprenantData, id});
        }
        setError(`${errorMessage}: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStats();
  }, [userType, id]);

    // Fonction pour compléter les données manquantes
    const completeStatsData = (data) => {
        if (!data) return null;
        
        const defaultData = userType === 'FORMATEUR' ? defaultFormateurData : defaultApprenantData;
        
        // Fusionner les données reçues avec les données par défaut pour les champs manquants
        return {
            ...defaultData,
            ...data,
            // Assurer que certains champs numériques sont bien présents et valides
            coursPublies: data.coursPublies || 0,
            coursEnAttente: data.coursEnAttente || 0,
            etudiantsAbonnes: data.etudiantsAbonnes || 0,
            tempsTotalEnSecondes: data.tempsTotalEnSecondes || 0,
            formateursSuivis: data.formateursSuivis || 0,
            progressionParDomaine: data.progressionParDomaine || {}
        };
    };

    // Convertir les secondes en heures:minutes:secondes
    const formatTime = (seconds) => {
        if (!seconds) return "0s";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${secs}s`;
    };

    // Création des données pour les graphiques (Formateur)
    const getFormateurChartData = () => {
        if (!stats) return null;
        
        const pieData = [
            { name: 'Cours publiés', value: stats.coursPublies, color: '#4F46E5' },
            { name: 'Cours en attente', value: stats.coursEnAttente, color: '#F59E0B' }
        ];
        
        const progressData = [
            { name: 'Cours', publiés: stats.coursPublies, enAttente: stats.coursEnAttente }
        ];
        
        return { pieData, progressData };
    };

    // Création des données pour les graphiques (Apprenant)
    const getApprenantChartData = () => {
        if (!stats) return null;
        
        // Convertir progressionParDomaine en tableau pour le graphique
        const domainData = stats.progressionParDomaine 
            ? Object.entries(stats.progressionParDomaine).map(([domain, progress]) => ({
                name: domain,
                progression: progress
            }))
            : [];
        
        return { 
            domainData,
            formateursData: [
                { name: 'Formateurs suivis', value: stats.formateursSuivis }
            ]
        };
    };

    const formateurCharts = stats && userType === 'FORMATEUR' ? getFormateurChartData() : null;
    const apprenantCharts = stats && userType === 'APPRENANT' ? getApprenantChartData() : null;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            {usingFallbackData && (
                <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-8 mx-4">
                    <p className="font-medium">Attention: Affichage des données d'exemple</p>
                    <p>Les données affichées sont des exemples car nous n'avons pas pu récupérer les informations depuis le serveur.</p>
                </div>
            )}
            
            <motion.div 
                className="container mx-auto px-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    className="bg-white rounded-xl shadow-lg p-6 mb-8"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <img 
                                src={stats?.photo || "https://via.placeholder.com/150"} 
                                alt={stats?.name} 
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100" 
                            />
                            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full">
                                {userType === 'FORMATEUR' ? <Award size={20} /> : <Book size={20} />}
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800">{stats?.name}</h1>
                            <p className="text-gray-500 mt-1">{stats?.email}</p>
                            <div className="mt-4 flex flex-wrap gap-4">
                                <div className="flex items-center">
                                    <Clock className="text-indigo-600 mr-2" size={18} />
                                    <span>{stats?.dateIntegration}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="text-indigo-600 mr-2" size={18} />
                                    <span>
                                        {userType === 'FORMATEUR' 
                                            ? `${stats?.etudiantsAbonnes} étudiants` 
                                            : `${stats?.formateursSuivis} formateurs suivis`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div 
                        className="lg:col-span-2"
                        variants={itemVariants}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                {userType === 'FORMATEUR' ? 'Distribution des cours' : 'Progression par domaine'}
                            </h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    {userType === 'FORMATEUR' ? (
                                        <BarChart data={formateurCharts?.progressData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="publiés" fill="#4F46E5" />
                                            <Bar dataKey="enAttente" fill="#F59E0B" />
                                        </BarChart>
                                    ) : (
                                        <BarChart data={apprenantCharts?.domainData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="progression" fill="#4F46E5" />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                {userType === 'FORMATEUR' ? 'État des cours' : 'Formateurs suivis'}
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    {userType === 'FORMATEUR' ? (
                                        <PieChart>
                                            <Pie
                                                data={formateurCharts?.pieData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {formateurCharts?.pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    ) : (
                                        <PieChart>
                                            <Pie
                                                data={apprenantCharts?.formateursData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, value }) => `${name}: ${value}`}
                                            >
                                                <Cell key="cell-0" fill="#4F46E5" />
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                    variants={containerVariants}
                >
                    {userType === 'FORMATEUR' ? (
                        <>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Book className="text-indigo-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Cours publiés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.coursPublies || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-amber-100 p-3 rounded-full">
                                        <Clock className="text-amber-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Cours en attente</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.coursEnAttente || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Users className="text-green-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Étudiants abonnés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.etudiantsAbonnes || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
<div className="stat-item">
  <div className="stat-icon">✅</div>
  <div>
    <h3>Taux de validation</h3>
    <p>{stats.tauxValidation}%</p>
  </div>
</div>

<div className="stat-item">
  <div className="stat-icon">📅</div>
  <div>
    <h3>Dernier cours publié</h3>
    <p>{stats.dateDernierCours}</p>
  </div>
</div>
                        </>
                    ) : (
                        <>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Clock className="text-indigo-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Temps total</h3>
                                        <p className="text-2xl font-semibold text-gray-800">
                                            {formatTime(stats?.tempsTotalEnSecondes)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Users className="text-green-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Formateurs suivis</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.formateursSuivis || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Book className="text-blue-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Domaines maîtrisés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">
                                            {stats?.progressionParDomaine 
                                                ? Object.keys(stats.progressionParDomaine).length 
                                                : 0}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default UserStat;