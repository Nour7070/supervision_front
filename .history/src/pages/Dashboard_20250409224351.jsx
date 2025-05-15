import React, { useState, useEffect } from 'react';

const Dashboard = ({ userType }) =>
{
    const [stats, setStats] = useState({
        totalFormateurs: 10,
        totalApprenants: 150,
        totalQuizz: 25,
        actionsByModerateurs: 5,
        pendingRegistrations: [
            {
                id: 1,
                name: "Mohamed Ali",
                email: "m.ali@example.com",
                cv: "/path/to/cv.pdf",
                date: "2023-05-15"
            }
        ],
        pendingCourseSubmissions: [
            {
                id: 1,
                formateur: "Samira Ben",
                title: "Introduction à React",
                file: "/path/to/course.pptx",
                date: "2023-05-10"
            }
        ]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleApproveRegistration = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(req => req.id !== id),
            totalFormateurs: prev.totalFormateurs + 1
        }));
    };

    const handleRejectRegistration = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(req => req.id !== id)
        }));
    };

    const handleApproveCourse = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id),
            totalQuizz: prev.totalQuizz + 1
        }));
    };

    const handleRejectCourse = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id)
        }));
    };
    useEffect(() =>
    {
        const fetchStats = () =>
        {
            setLoading(true);
            setTimeout(() =>
            {
                // Simuler un délai de chargement des données
                setLoading(false);
            }, 1000);
        };

        fetchStats();
    }, []);

    const renderStat = (title, value, icon, color) => (
        <div className={`bg-${color}-100 p-4 rounded-md shadow-lg text-${color}-800 flex items-center`}>
            <div className="text-3xl mr-4">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <h3 className="text-xl font-semibold">{value}</h3>
                <p>{title}</p>
            </div>
        </div>
    );

    if (loading) return <div className="text-center text-xl">Chargement des statistiques...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="p-6 bg-white-100 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-center text-black-600 mb-4">Tableau de bord</h1>
                <p className="text-center text-white-600 mb-6">Bienvenue sur votre tableau de bord</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {renderStat('Total Formateurs', stats.totalFormateurs, 'fa-user-check', 'white')}
                    {renderStat('Total Apprenants', stats.totalApprenants, 'fa-graduation-cap', 'green')}
                    {renderStat('Total Quizz', stats.totalQuizz, 'fa-book', 'orange')}

                    {userType?.toUpperCase() === 'SUPERVISEUR' && (
                        renderStat('Actions par Modérateurs', stats.actionsByModerateurs, 'fa-shield-alt', 'purple')
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Demandes d'inscription */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Demandes d'inscription (Formateurs)</h2>
                        <div className="space-y-4">
                            {stats.pendingRegistrations.map(request => (
                                <div key={request.id} className="border-b pb-4 last:border-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium">{request.name}</p>
                                            <p className="text-gray-500 text-sm">{request.email}</p>
                                            <p className="text-gray-400 text-xs">{request.date}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleApproveRegistration(request.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Accepter
                                            </button>
                                            <button
                                                onClick={() => handleRejectRegistration(request.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Rejeter
                                            </button>
                                            <a
                                                href={request.cv}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Voir CV
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Demandes de cours */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Demandes de publication (Cours)</h2>
                        <div className="space-y-4">
                            {stats.pendingCourseSubmissions.map(course => (
                                <div key={course.id} className="border-b pb-4 last:border-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium">{course.title}</p>
                                            <p className="text-gray-500 text-sm">Par {course.formateur}</p>
                                            <p className="text-gray-400 text-xs">{course.date}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleApproveCourse(course.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Accepter
                                            </button>
                                            <button
                                                onClick={() => handleRejectCourse(course.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Rejeter
                                            </button>
                                            <a
                                                href={course.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Voir Fichier
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher un formateur ou un apprenant..."
                        className="w-full p-3 border border-white-300 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Activités récentes</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                                    <i className="fas fa-user-plus"></i>
                                </div>
                                <div>
                                    <p>Un nouvel apprenant s'est inscrit</p>
                                    <span className="text-white-500 text-sm">Il y a 1 heure</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                                    <i className="fas fa-edit"></i>
                                </div>
                                <div>
                                    <p>Un formateur a mis à jour son cours</p>
                                    <span className="text-white-500 text-sm">Il y a 3 heures</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Utilisateurs par type</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-full bg-white-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full"
                                        style={{ width: `${(stats.totalFormateurs / 2)}%` }}
                                    ></div>
                                </div>
                                <div className="ml-4">{stats.totalFormateurs}</div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-full bg-white-200 rounded-full h-3">
                                    <div
                                        className="bg-green-600 h-3 rounded-full"
                                        style={{ width: `${(stats.totalApprenants / 2)}%` }}
                                    ></div>
                                </div>
                                <div className="ml-4">{stats.totalApprenants}</div>
                            </div>

                            {userType?.toUpperCase() === 'SUPERVISEUR' && (
                                <div className="flex items-center">
                                    <div className="w-full bg-white-200 rounded-full h-3">
                                        <div
                                            className="bg-purple-600 h-3 rounded-full"
                                            style={{ width: `${(stats.actionsByModerateurs / 20)}%` }}
                                        ></div>
                                    </div>
                                    <div className="ml-4">{stats.actionsByModerateurs}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
