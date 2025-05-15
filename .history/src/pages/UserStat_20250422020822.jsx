import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Book, Award, Users, AlertCircle } from 'lucide-react';
import { Calendar, BookOpen } from 'lucide-react'; 
import axios from '../axios';

const UserStat = () => {
    const { userType, id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                const config = {
                    timeout: 5000,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };

                const response = await axios.get(url, config);
                setStats(response.data);
            } catch (err) {
                let errorMessage = "Erreur lors du chargement des statistiques";
                if (err.response) {
                    errorMessage = `Erreur serveur: ${err.response.status}`;
                } else if (err.request) {
                    errorMessage = "Pas de réponse du serveur";
                }
                setError(`${errorMessage}: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [userType, id]);

    const formatTime = (seconds) => {
        if (!seconds) return "0s";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${secs}s`;
    };

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

    const getApprenantChartData = () => {
        if (!stats) return null;
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

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto">
                    <div className="flex items-center">
                        <AlertCircle className="mr-2" size={24} />
                        <h3 className="font-bold">Erreur</h3>
                    </div>
                    <p className="mt-2">{error}</p>
                    <p className="mt-2 text-sm">Impossible d'afficher les statistiques.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
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
                    <motion.div className="lg:col-span-2" variants={itemVariants}>
                        <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                {userType === 'FORMATEUR' ? 'Performance des cours' : 'Progression par domaine'}
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
                                            <Bar dataKey="publiés" fill="#4F46E5" name="Cours publiés" />
                                            <Bar dataKey="enAttente" fill="#F59E0B" name="En attente" />
                                        </BarChart>
                                    ) : (
                                        <BarChart data={apprenantCharts?.domainData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip formatter={(value) => [`${value}%`, "Progression"]} />
                                            <Legend />
                                            <Bar dataKey="progression" fill="#4F46E5" name="% de complétion" />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
    
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                {userType === 'FORMATEUR' ? 'Répartition' : 'Activité'}
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    {userType === 'FORMATEUR' ? (
                                        <PieChart>
                                            <Pie
                                                data={formateurCharts?.pieData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {formateurCharts?.pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`${value}`, "Nombre"]} />
                                        </PieChart>
                                    ) : (
                                        <PieChart>
                                            <Pie
                                                data={apprenantCharts?.formateursData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                <Cell fill="#4F46E5" />
                                            </Pie>
                                            <Tooltip formatter={(value) => [`${value}`, "Nombre"]} />
                                        </PieChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>
    
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
                    variants={containerVariants}
                >
                    {userType === 'FORMATEUR' ? (
                        <>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Cours publiés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.coursPublies || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-amber-100 p-3 rounded-full">
                                        <Clock className="text-amber-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Cours en attente</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.coursEnAttente || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <span className="text-blue-600 text-xl">%</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Taux de validation</h3>
                                        <p className="text-2xl font-semibold text-gray-800">
                                            {stats?.tauxValidation ? `${stats.tauxValidation}%` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Calendar className="text-purple-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Dernier cours</h3>
                                        <p className="text-xl font-semibold text-gray-800">
                                            {stats?.dateDernierCours || 'Aucun'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Users className="text-indigo-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Étudiants abonnés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.etudiantsAbonnes || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg col-span-2">
                                <div className="flex items-center gap-4">
                                    <div className="bg-cyan-100 p-3 rounded-full">
                                        <BookOpen className="text-cyan-600" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Répartition par catégorie</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {stats?.coursParCategorie?.map(([categorie, count]) => (
                                                <span key={categorie} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {categorie}: {count}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Clock className="text-indigo-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Temps total</h3>
                                        <p className="text-2xl font-semibold text-gray-800">
                                            {formatTime(stats?.tempsTotalEnSecondes)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Users className="text-green-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Formateurs suivis</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats?.formateursSuivis || 0}</p>
                                    </div>
                                </div>
                            </motion.div>
    
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Book className="text-blue-600" size={24} />
                                    </div>
                                    <div>
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