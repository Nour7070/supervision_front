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

export default UserStat;
/*
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from '../axios';

const UserStat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        coursPublies: 0,
        coursEnAttente: 0,
        etudiantsAbonnes: 0
    });
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Récupérer les stats
                const statsRes = await axios.get(`/api/users/formateurs/${id}/stats`);
                setStats(statsRes.data);
                
                // 2. Récupérer les cours
                const coursesRes = await axios.get(`/courses/formateurs/${id}/courses`);
                setCourses(coursesRes.data);
                
            } catch (err) {
                console.error("Erreur:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id]);

    if (loading) return <div className="p-4">Chargement...</div>;
    console.log("Type d'utilisateur :", userType);

    return (
        <div className="container mx-auto p-4">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center mb-4 text-blue-600"
            >
                <FiArrowLeft className="mr-2" />
                Retour
            </button>

            <h1 className="text-2xl font-bold mb-6">Statistiques du Formateur</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatBox title="Cours Publiés" value={stats.coursPublies} />
                <StatBox title="Cours en Attente" value={stats.coursEnAttente} />
                <StatBox title="Étudiants Inscrits" value={stats.etudiantsAbonnes} />
            </div>

            <h2 className="text-xl font-semibold mb-4">Liste des Cours</h2>
            <div className="space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="p-4 border rounded-lg">
                        <h3 className="font-bold">{course.titre}</h3>
                        <p className="text-gray-600">{course.description || 'Pas de description'}</p>
                        <span className={`text-sm px-2 py-1 rounded ${
                            course.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {course.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Composant pour afficher une stat
const StatBox = ({ title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default UserStat;
*/