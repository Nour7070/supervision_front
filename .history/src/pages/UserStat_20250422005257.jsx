import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Book, Award, Users, AlertCircle } from 'lucide-react';

const UserStat = () => {
    const { userType, id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usingFallbackData, setUsingFallbackData] = useState(false);

    // Données par défaut pour compléter les données manquantes
    const defaultFormateurData = {
        name: "Nom du Formateur",
        email: "formateur@example.com",
        photo: "https://via.placeholder.com/150",
        age: 35,
        dateIntegration: "01/01/2023",
        coursPublies: 0,
        coursEnAttente: 0,
        quizzPublies: 0,
        etudiantsAbonnes: 0
    };

    const defaultApprenantData = {
        name: "Nom de l'Apprenant",
        email: "apprenant@example.com",
        photo: "https://via.placeholder.com/150",
        age: 25,
        dateIntegration: "01/09/2023",
        coursSuivis: 0,
        quizzReussis: 0,
        quizzEchoues: 0,
        chapitresSuivis: 0
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

                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                let data;
                try {
                    data = await response.json();
                } catch (jsonError) {
                    console.error("Erreur de parsing JSON:", jsonError);
                    throw new Error("Format de réponse invalide");
                }
                
                // Compléter les données manquantes
                const completeData = completeStatsData(data);
                setStats(completeData);
            } catch (err) {
                console.error("Erreur lors du chargement des statistiques:", err);
                
                // Utiliser les données par défaut en cas d'erreur
                setUsingFallbackData(true);
                if (userType === 'FORMATEUR') {
                    setStats({...defaultFormateurData, id});
                } else {
                    setStats({...defaultApprenantData, id});
                }
                
                setError(`Erreur lors du chargement des statistiques: ${err.message}`);
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
            quizzPublies: data.quizzPublies || 0,
            coursSuivis: data.coursSuivis || 0,
            quizzReussis: data.quizzReussis || 0,
            quizzEchoues: data.quizzEchoues || 0,
            chapitresSuivis: data.chapitresSuivis || 0
        };
    };

    // Animation variants
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

    // Création des données pour les graphiques (Formateur)
    const getFormateurChartData = () => {
        if (!stats) return null;
        
        const pieData = [
            { name: 'Cours publiés', value: stats.coursPublies, color: '#4F46E5' },
            { name: 'Cours en attente', value: stats.coursEnAttente, color: '#F59E0B' }
        ];
        
        const progressData = [
            { name: 'Cours', publiés: stats.coursPublies, enAttente: stats.coursEnAttente },
            { name: 'Quizz', publiés: stats.quizzPublies, enAttente: stats.quizzEnAttente || 0 }
        ];
        
        return { pieData, progressData };
    };

    // Création des données pour les graphiques (Apprenant)
    const getApprenantChartData = () => {
        if (!stats) return null;
        
        const progressData = [
            { name: 'Quizz', réussis: stats.quizzReussis, échoués: stats.quizzEchoues }
        ];
        
        // Utiliser des données de progression réelles si disponibles, sinon générer des exemples
        const lineData = stats.progression?.map((prog, index) => ({
            mois: prog.periode,
            progression: prog.valeur,
        })) || Array(6).fill().map((_, i) => ({ 
            mois: `M${i+1}`, 
            progression: Math.floor(Math.random() * 100) 
        }));
        
        return { progressData, lineData };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error && !stats) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
                <p className="text-xl text-red-500 font-medium">{error}</p>
                <button 
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Réessayer
                </button>
            </div>
        );
    }

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
                                src={stats.photo || "https://via.placeholder.com/150"} 
                                alt={stats.name} 
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100" 
                            />
                            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full">
                                {userType === 'FORMATEUR' ? <Award size={20} /> : <Book size={20} />}
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800">{stats.name}</h1>
                            <p className="text-gray-500 mt-1">{stats.email}</p>
                            <div className="mt-4 flex flex-wrap gap-4">
                                <div className="flex items-center">
                                    <Clock className="text-indigo-600 mr-2" size={18} />
                                    <span>{stats.dateIntegration}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="text-indigo-600 mr-2" size={18} />
                                    <span>{userType === 'FORMATEUR' ? `${stats.etudiantsAbonnes} étudiants` : `${stats.age} ans`}</span>
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
                                {userType === 'FORMATEUR' ? 'Distribution des cours' : 'Progression d\'apprentissage'}
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
                                        <LineChart data={apprenantCharts?.lineData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="mois" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line 
                                                type="monotone" 
                                                dataKey="progression" 
                                                stroke="#4F46E5" 
                                                strokeWidth={2}
                                                dot={{ r: 4 }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                {userType === 'FORMATEUR' ? 'État des cours' : 'Résultats des quizz'}
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={userType === 'FORMATEUR' 
                                                ? formateurCharts?.pieData 
                                                : [
                                                    {name: 'Réussis', value: stats.quizzReussis, color: '#10B981'},
                                                    {name: 'Échoués', value: stats.quizzEchoues, color: '#EF4444'}
                                                  ]
                                            }
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {userType === 'FORMATEUR' 
                                                ? formateurCharts?.pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))
                                                : [
                                                    <Cell key="cell-0" fill="#10B981" />,
                                                    <Cell key="cell-1" fill="#EF4444" />
                                                  ]
                                            }
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
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
                                <div className="flex items-center">
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Book className="text-indigo-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Cours publiés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.coursPublies}</p>
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
                                        <p className="text-2xl font-semibold text-gray-800">{stats.coursEnAttente}</p>
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
                                        <p className="text-2xl font-semibold text-gray-800">{stats.etudiantsAbonnes}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Award className="text-purple-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Quizz publiés</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.quizzPublies}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Book className="text-indigo-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Cours suivis</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.coursSuivis}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Quizz réussis</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.quizzReussis}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <AlertCircle className="text-red-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Quizz échoués</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.quizzEchoues}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Book className="text-blue-600" size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Chapitres suivis</h3>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.chapitresSuivis || 0}</p>
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