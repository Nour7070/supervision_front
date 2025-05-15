import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, Clock, Book, Award, Users, AlertCircle } from 'lucide-react';
import { Calendar, BookOpen } from 'lucide-react'; 
import axios from '../axios';
import MiniCalendar from './MiniCalendar';
import 'react-datepicker/dist/react-datepicker.css';

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

    const DOMAIN_COLORS = [
        '#06895F', 
        '#82ca9d', 
        '#046244', 
        '#FDEEAF', 
        '#C4FDEB', 
        '#CCCCCC', 
        '#FDE587'
    ];

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
                let errorMessage = "Erreur";
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
        
        const pieData = stats.coursParCategorie 
            ? Object.entries(stats.coursParCategorie).map(([name, value]) => ({
                name,
                value,
                color: DOMAIN_COLORS[Object.keys(stats.coursParCategorie).indexOf(name) % DOMAIN_COLORS.length]
            }))
            : [];
    
        return { 
            progressData: [
                { name: 'Cours', publiés: stats.coursPublies, enAttente: stats.coursEnAttente }
            ],
            pieData 
        };
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
                    <p className="mt-4 text-gray-600">Loading...</p>
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
                    <p className="mt-2 text-sm">Error.</p>
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
    className="relative rounded-xl shadow-lg p-6 mb-8 overflow-hidden border-2 border-[#FACC15]"
    variants={itemVariants}
>
    <div className="absolute inset-0 bg-gradient-to-r from-[#034732]/90 to-[#056349]/80 z-0"></div>
    
    <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden z-0">
        <img 
            src="/images/Subtract.png" 
            alt=""
            className="h-full object-cover object-left"
            style={{
                transform: 'translateX(70%)',
                opacity: 0.7
            }}
        />
    </div>
    
    <div className="relative z-10">
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">{stats?.name}</h1>
            <p className="text-white/80 mt-2">{stats?.email}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-white/90">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span>{stats?.dateIntegration}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
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
                        <motion.div 
                            className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Approved courses</h3>
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
                                        <h3 className="text-sm font-medium text-gray-500">Pending courses</h3>
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
                                        <h3 className="text-sm font-medium text-gray-500">Validation rate</h3>
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
                                        <h3 className="text-sm font-medium text-gray-500">Most recent course</h3>
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
                                        <h3 className="text-sm font-medium text-gray-500">Enrolled students</h3>
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
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Distribution by field</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {stats?.coursParCategorie && Object.entries(stats.coursParCategorie).map(([categorie, count]) => (
                                                <span key={categorie} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {categorie}: {count}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <div className="md:hidden space-y-4 mb-6">
                            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <CheckCircle className="text-green-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Approved courses</h3>
                                            <p className="text-xl font-semibold">{stats?.coursPublies || 0}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">Total</div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-amber-100 p-2 rounded-full">
                                            <Clock className="text-amber-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Pending courses</h3>
                                            <p className="text-xl font-semibold">{stats?.coursEnAttente || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <span className="text-blue-600">%</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Validation rate</h3>
                                            <p className="text-xl font-semibold">
                                                {stats?.tauxValidation ? `${stats.tauxValidation}%` : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <Calendar className="text-purple-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Most recent course</h3>
                                            <p className="text-lg font-semibold">
                                                {stats?.dateDernierCours || 'Aucun'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-indigo-100 p-2 rounded-full">
                                            <Users className="text-indigo-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Subscribed students</h3>
                                            <p className="text-xl font-semibold">{stats?.etudiantsAbonnes || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-cyan-100 p-2 rounded-full mt-1">
                                        <BookOpen className="text-cyan-600" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Category distribution</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {stats?.coursParCategorie && Object.entries(stats.coursParCategorie).map(([categorie, count]) => (
                                                <span key={categorie} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                                    {categorie}: {count}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants}>
                                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                    Course statistics
                                    </h2>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={formateurCharts?.progressData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="publiés" fill="#057652" name="Approved" />
                                                <Bar dataKey="enAttente" fill="#FCE173" name="Pending" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="lg:col-span-1 h-full">
                                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                    Distribution by field
                                    </h2>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={formateurCharts?.pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {formateurCharts?.pieData?.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={DOMAIN_COLORS[index % DOMAIN_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    formatter={(value) => [`${value} cours`, "Nombre"]}
                                                />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="md:hidden space-y-4 mb-8">
                            <motion.div variants={itemVariants}>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Course statistics</h2>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={formateurCharts?.progressData}
                                                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="publiés" fill="#057652" name="Appoved" />
                                                <Bar dataKey="enAttente" fill="#FCE173" name="Pending" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribution by field </h2>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={formateurCharts?.pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={60}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {formateurCharts?.pieData?.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={DOMAIN_COLORS[index % DOMAIN_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => [`${value} cours`, "Nombre"]} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
            </motion.div>
        </div>
    );
};

export default UserStat;