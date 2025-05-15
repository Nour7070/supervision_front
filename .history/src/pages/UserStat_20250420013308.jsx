/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserStat = () =>
{
    const { userType, id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        setTimeout(() =>
        {
            const simulatedData = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                age: 30,
                dateIntegration: '2022-05-10',
                photo: 'https://randomuser.me/api/portraits/men/1.jpg',
                coursPublies: 5,
                coursEnAttente: 2,
                etudiantsAbonnes: 50,
                quizzPublies: 10,
                plaintes: 3,
                coursSuivis: 8,
                coursTermines: 6,
                quizzReussis: 7,
                quizzEchoues: 3,
                plaintesDeposees: 1,
            };

            setStats(simulatedData);
            setLoading(false);
        }, 1000);
    }, [userType, id]);

    if (loading) return <p className="text-center text-xl">Chargement des statistiques...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4">Statistiques de {stats.name}</h1>
            <div className="flex items-center mb-6">
                <img src={stats.photo} alt={stats.name} className="w-20 h-20 rounded-full mr-6" />
                <div>
                    <p><strong>Email :</strong> {stats.email}</p>
                    <p><strong>Âge :</strong> {stats.age} ans</p>
                    <p><strong>Date d'intégration :</strong> {stats.dateIntegration}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userType === 'FORMATEUR' ? (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Cours publiés</h2>
                            <p>{stats.coursPublies}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Cours en attente</h2>
                            <p>{stats.coursEnAttente}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Étudiants abonnés</h2>
                            <p>{stats.etudiantsAbonnes}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Quizz publiés</h2>
                            <p>{stats.quizzPublies}</p>
                        </div>
                        
                    </>
                ) : (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Cours inscrits</h2>
                            <p>{stats.coursSuivis}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Quizz réussis</h2>
                            <p>{stats.quizzReussis}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Chapitre suivis</h2>
                            <p>{stats.quizzEchoues}</p>
                        </div>
                       
                    </>
                )}
            </div>
        </div>
    );
};

export default UserStat;
*/

/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const UserStat = () => {
    const { userType, id } = useParams();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const simulatedUsersData = {
        1: {
            name: "Khalil",
            email: "Khalil@gmail.com",
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
            age: 32,
            coursPublies: 12,
            coursEnAttente: 3,
            etudiantsAbonnes: 145,
            quizzPublies: 25
        },
        2: {
            name: "Fatima",
            email: "Fatima@gmail.com",
            photo: "https://randomuser.me/api/portraits/women/1.jpg",
            age: 28,
            coursSuivis: 8,
            coursTermines: 5,
            quizzReussis: 15,
            quizzEchoues: 2
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const userData = simulatedUsersData[id] || {
                name: 'Utilisateur inconnu',
                email: 'N/A',
                photo: 'https://randomuser.me/api/portraits/lego/1.jpg',
                age: 0
            };
            
            setStats({
                ...userData,
                coursPublies: userData.coursPublies || 0,
                coursEnAttente: userData.coursEnAttente || 0,
                etudiantsAbonnes: userData.etudiantsAbonnes || 0,
                quizzPublies: userData.quizzPublies || 0,
                coursSuivis: userData.coursSuivis || 0,
                coursTermines: userData.coursTermines || 0,
                quizzReussis: userData.quizzReussis || 0,
                quizzEchoues: userData.quizzEchoues || 0
            });
            setLoading(false);
        }, 200); 
    }, [id, userType]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-black hover:text-black mb-6"
            >
                <FiArrowLeft className="mr-2" />
                Back
            </button>

            <h1 className="text-3xl font-semibold mb-4">Statistics of {stats.name}</h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6">
                <img 
                    src={stats.photo} 
                    alt={stats.name} 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong className="text-gray-700">Email :</strong> {stats.email}</p>
                    <p><strong className="text-gray-700">Age :</strong> {stats.age} years old</p>
                    <p><strong className="text-gray-700">ID :</strong> {id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userType === 'FORMATEUR' ? (
                    <>
                        <StatCard title="Published courses" value={stats.coursPublies} />
                        <StatCard title="Courses pending" value={stats.coursEnAttente} />
                        <StatCard title="Subscribed students" value={stats.etudiantsAbonnes} />
                        <StatCard title="Published quizzes" value={stats.quizzPublies} />
                    </>
                ) : (
                    <>
                        <StatCard title="Courses followed" value={stats.coursSuivis} />
                        <StatCard title="Quizzes taken" value={stats.quizzReussis} />
                    </>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-3xl font-bold text-black">{value}</p>
    </div>
);

export default UserStat;*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from '../axios';

const UserStat = () => {
    const { userType, id } = useParams();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // 1. Récupérer les stats du formateur
                const statsResponse = await axios.get(`/api/formateurs/${id}/stats`);
                setStats(statsResponse.data);
                
                // 2. Récupérer les cours du formateur
                const coursesResponse = await axios.get(`/courses/formateurs/${id}/courses`);
                setCourses(coursesResponse.data);
                
            } catch (err) {
                console.error("Erreur API:", err);
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userType]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-500 p-4">
            {error}
            <button 
                onClick={() => window.location.reload()}
                className="mt-2 text-blue-500 hover:underline"
            >
                Réessayer
            </button>
        </div>
    );

    if (!stats) return <div>Aucune donnée disponible</div>;

    return (
        <div className="container mx-auto p-6">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-black hover:text-black mb-6"
            >
                <FiArrowLeft className="mr-2" />
                Retour
            </button>

            <h1 className="text-3xl font-semibold mb-4">Statistiques de {stats.nom || stats.username}</h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6">
                <img 
                    src={stats.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                    alt={stats.nom} 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong className="text-gray-700">Email :</strong> {stats.email}</p>
                    <p><strong className="text-gray-700">Date d'inscription :</strong> {new Date(stats.dateInscription).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Cours publiés" value={stats.coursPublies || 0} />
                <StatCard title="Cours en attente" value={stats.coursEnAttente || 0} />
                <StatCard title="Étudiants abonnés" value={stats.etudiantsAbonnes || 0} />
                <StatCard title="Quiz créés" value={stats.quizzCreés || 0} />
            </div>

            {/* Liste des cours */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Cours ({courses.length})</h2>
                
                {courses.length > 0 ? (
                    <div className="space-y-4">
                        {courses.map(course => (
                            <div key={course.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">{course.titre}</h3>
                                        <p className="text-gray-600 mt-1">{course.description || 'Pas de description'}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm 
                                        ${course.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 
                                          course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-gray-100 text-gray-800'}`}>
                                        {course.status}
                                    </span>
                                </div>
                                <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                                    <span>Créé le: {new Date(course.dateCreation).toLocaleDateString()}</span>
                                    {course.datePublication && (
                                        <span>Publié le: {new Date(course.datePublication).toLocaleDateString()}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Aucun cours trouvé</p>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-3xl font-bold text-black">{value}</p>
    </div>
);

export default UserStat;