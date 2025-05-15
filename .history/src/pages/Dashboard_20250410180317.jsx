/*import React, { useState, useEffect } from 'react';

const Dashboard = ({ userType }) =>
{
    const [previewFile, setPreviewFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
    const FilePreviewModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Prévisualisation du fichier</h3>
                    <button
                        onClick={() => setPreviewFile(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {previewFile?.endsWith('.pdf') ? (
                        <iframe
                            src={previewFile}
                            className="w-full h-full min-h-[70vh]"
                            frameBorder="0"
                            title="Prévisualisation PDF"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-600 mb-4">Prévisualisation non disponible pour ce format</p>
                            <a
                                href={previewFile}
                                download
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Télécharger le fichier
                            </a>
                        </div>
                    )}
                </div>
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

                    
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                            >
                                                Accepter
                                            </button>
                                            <button
                                                onClick={() => handleRejectCourse(course.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                            >
                                                Rejeter
                                            </button>
                                            <button
                                                onClick={() => setPreviewFile(course.file)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                            >
                                                Voir Fichier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                   
                    {previewFile && <FilePreviewModal />}
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

    );
};

export default Dashboard;*/

/*
import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import InscriptionDomaine from "./InscriptionDomaine";
import Maps from "./Maps";
const Dashboard = ({ userType }) =>
{
    const [previewFile, setPreviewFile] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [showAllCourses, setShowAllCourses] = useState(false);


    const [stats, setStats] = useState({
        totalFormateurs: 10,
        totalApprenants: 150,
        totalQuizz: 25,
        actionsByModerateurs: 5,
        pendingRegistrations: [
            {
                id: 1,
                name: "Nour Hamouti",
                email: "nh@example.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "Hafida",
                date: "2023-05-13"
            },
            {
                id: 2,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 3,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 4,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 5,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 6,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            }
        ],
        pendingCourseSubmissions: [
            {
                id: 1,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "Débutant",
                date: "2023-05-10"
            },
            {
                id: 2,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "Débutant",
                date: "2023-05-10"
            },
            {
                id: 3,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "Débutant",
                date: "2023-05-10"
            },
            {
                id: 4,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "Débutant",
                date: "2023-05-10"
            }
        ]
    });
    const data = [
        { mois: 'Jan', Fiqh: 65, Ahkam: 45, History: 100, Quran: 25, Sira: 50 },
        { mois: 'Fév', Fiqh: 70, Ahkam: 50, History: 71, Quran: 40, Sira: 25 },
        { mois: 'Mar', Fiqh: 90, Ahkam: 100, History: 60, Quran: 50, Sira: 30 },
        { mois: 'Avr', Fiqh: 50, Ahkam: 70, History: 47, Quran: 10, Sira: 40 },
        { mois: 'Mai', Fiqh: 102, Ahkam: 120, History: 70, Quran: 20, Sira: 70 },
        { mois: 'Juin', Fiqh: 80, Ahkam: 50, History: 80, Quran: 25, Sira: 50 },
        { mois: 'Juil', Fiqh: 100, Ahkam: 75, History: 30, Quran: 55, Sira: 54 },
        { mois: 'Août', Fiqh: 90, Ahkam: 65, History: 50, Quran: 70, Sira: 44 },
        { mois: 'Sep', Fiqh: 120, Ahkam: 90, History: 65, Quran: 100, Sira: 70 },
        { mois: 'Oct', Fiqh: 70, Ahkam: 65, History: 90, Quran: 50, Sira: 10 },
        { mois: 'Nov', Fiqh: 90, Ahkam: 45, History: 100, Quran: 70, Sira: 40 },
        { mois: 'Déc', Fiqh: 50, Ahkam: 90, History: 75, Quran: 55, Sira: 30 },
    ];

    // Couleurs pour chaque domaine
    const colors = {
        Fiqh: '#8884d8',
        Ahkam: '#82ca9d',
        History: '#ffc658',
        Quran: '#ff7300',
        Sira: '#E8C7DE'
    };

    // Fonctions de gestion
    const handleApproveRegistration = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(req => req.id !== id),
            totalFormateurs: prev.totalFormateurs + 1
        }));
        setSelectedRegistration(null);
    };

    const handleRejectRegistration = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(req => req.id !== id)
        }));
        setSelectedRegistration(null);
    };

    const handleApproveCourse = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id),
            totalQuizz: prev.totalQuizz + 1
        }));
        setSelectedCourse(null);
    };

    const handleRejectCourse = (id) =>
    {
        setStats(prev => ({
            ...prev,
            pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id)
        }));
        setSelectedCourse(null);
    };

    useEffect(() =>
    {
        const fetchStats = () =>
        {
            setLoading(true);
            setTimeout(() =>
            {
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

    const FilePreviewModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Prévisualisation du fichier</h3>
                    <button
                        onClick={() => setPreviewFile(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {previewFile?.endsWith('.pdf') ? (
                        <iframe
                            src={previewFile}
                            className="w-full h-full min-h-[70vh]"
                            frameBorder="0"
                            title="Prévisualisation PDF"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <FiFileText className="h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">Prévisualisation non disponible pour ce format</p>
                            <a
                                href={previewFile}
                                download
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <FiDownload className="mr-2" /> Télécharger le fichier
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading) return <div className="text-center text-xl">Chargement des statistiques...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <i className="fas fa-user-check text-blue-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Formateurs</p>
                            <p className="text-2xl font-bold">{stats.totalFormateurs}</p>
                            <p className="text-green-500 text-sm mt-1">+20% vs semaine dernière</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                            <i className="fas fa-graduation-cap text-green-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Apprenants</p>
                            <p className="text-2xl font-bold">{stats.totalApprenants}</p>
                            <p className="text-green-500 text-sm mt-1">+10% vs semaine dernière</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-orange-100 p-3 rounded-full mr-4">
                            <i className="fas fa-book text-orange-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Quizz</p>
                            <p className="text-2xl font-bold">{stats.totalQuizz}</p>
                            <p className="text-green-500 text-sm mt-1">+30% vs semaine dernière</p>
                        </div>
                    </div>
                    {userType?.toUpperCase() === 'SUPERVISEUR' && (
                        <div className="bg-white rounded-lg shadow p-6 flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <i className="fas fa-shield-alt text-purple-500 text-xl"></i>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Actions par Modérateurs</p>
                                <p className="text-2xl font-bold">{stats.actionsByModerateurs}</p>
                                <p className="text-green-500 text-sm mt-1">+15% vs semaine dernière</p>
                            </div>
                        </div>
                    )}
                </div>

                
                <div className="flex flex-col lg:flex-row gap-6">
                   
                    <div className="lg:w-[60%] space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-base font-semibold mb-3">Activités récentes</h2>
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

                      
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-base font-semibold mb-3">Utilisateurs par type</h2>
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

                       
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-base font-semibold mb-3">Demandes d'inscription Formateurs</h2>

                            <div className="space-y-3">
                                {(showAll ? stats.pendingRegistrations : stats.pendingRegistrations.slice(0, 2)).map(request => (
                                    <div key={request.id} className="border-b pb-3 last:border-0">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{request.name}</p>
                                                <p className="text-gray-500 text-sm">{request.email}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedRegistration(request)}
                                                className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                            >
                                                Voir demande
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                           
                            {stats.pendingRegistrations.length > 2 && (
                                <div className="mt-4 text-sm text-center text-blue-600 hover:underline cursor-pointer flex justify-center items-center gap-1"
                                    onClick={() => setShowAll(!showAll)}>
                                    {showAll ? (
                                        <>
                                            <FiChevronUp size={16} />
                                            Voir moins
                                        </>
                                    ) : (
                                        <>
                                            <FiChevronDown size={16} />
                                            Voir toute la liste
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                       
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-base font-semibold mb-3">Demandes de publication Cours</h2>

                            <div className="space-y-3">
                                {(showAllCourses ? stats.pendingCourseSubmissions : stats.pendingCourseSubmissions.slice(0, 2)).map(course => (
                                    <div key={course.id} className="border-b pb-3 last:border-0">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{course.title}</p>
                                                <p className="text-gray-500 text-sm">Par {course.formateur}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCourse(course)}
                                                className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15] "
                                            >
                                                Voir demande
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                           
                            {stats.pendingCourseSubmissions.length > 2 && (
                                <div
                                    className="mt-4 text-sm text-center text-blue-600 hover:underline cursor-pointer flex justify-center items-center gap-1"
                                    onClick={() => setShowAllCourses(!showAllCourses)}
                                >
                                    {showAllCourses ? (
                                        <>
                                            <FiChevronUp size={16} />
                                            Voir moins
                                        </>
                                    ) : (
                                        <>
                                            <FiChevronDown size={16} />
                                            Voir toute la liste
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                   
                    <div className="lg:w-[40%]">
                        <div className="bg-white rounded-lg shadow p-4 h-full">
                            <Maps className="h-[400px] w-full" />
                            <div className="mt-4">
                                <h3 className="text-md font-medium mb-2">Top 5 pays</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>🇲🇦 Maroc</li>
                                    <li>🇩🇿 Algérie</li>
                                    <li>🇹🇳 Tunisie</li>
                                    <li>🇸🇦 Arabie Saoudite</li>
                                    <li>🇫🇷 France</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="mt-6">
                    <InscriptionDomaine data={data} colors={colors} />
                </div>
            </div>

          
            {selectedRegistration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Détails du formateur</h3>
                                <button onClick={() => setSelectedRegistration(null)} className="text-gray-500">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Informations personnelles</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Nom complet:</p>
                                            <p className="font-medium">{selectedRegistration.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email:</p>
                                            <p className="font-medium">{selectedRegistration.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Téléphone:</p>
                                            <p className="font-medium">{selectedRegistration.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Expérience:</p>
                                            <p className="font-medium">{selectedRegistration.experience}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href={selectedRegistration.cv}
                                            target="_blank"
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                        >
                                            <FiFileText className="mr-2" /> Voir CV
                                        </a>
                                        <a
                                            href={selectedRegistration.diplomas}
                                            target="_blank"
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                        >
                                            <FiFileText className="mr-2" /> Voir diplômes
                                        </a>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => handleRejectRegistration(selectedRegistration.id)}
                                        className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                    >
                                        Rejeter
                                    </button>
                                    <button
                                        onClick={() => handleApproveRegistration(selectedRegistration.id)}
                                        className="px-4 py-2 bg-[#06895F] text-black rounded hover:bg-green-600"
                                    >
                                        Accepter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Détails du cours</h3>
                                <button onClick={() => setSelectedCourse(null)} className="text-gray-500">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Titre:</p>
                                        <p className="font-medium">{selectedCourse.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Formateur:</p>
                                        <p className="font-medium">{selectedCourse.formateur}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-gray-600">Description:</p>
                                        <p className="font-medium">{selectedCourse.description}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Durée:</p>
                                        <p className="font-medium">{selectedCourse.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Niveau:</p>
                                        <p className="font-medium">{selectedCourse.price}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Fichiers joints</h4>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setPreviewFile(selectedCourse.file)}
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                        >
                                            <FiBook className="mr-2" /> Support de cours
                                        </button>
                                        {selectedCourse.additionalFiles && (
                                            <button
                                                onClick={() => setPreviewFile(selectedCourse.additionalFiles)}
                                                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                            >
                                                <FiFileText className="mr-2" /> Documents supplémentaires
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => handleRejectCourse(selectedCourse.id)}
                                        className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                    >
                                        Rejeter
                                    </button>
                                    <button
                                        onClick={() => handleApproveCourse(selectedCourse.id)}
                                        className="px-4 py-2 bg-[#06895F] text-black rounded hover:bg-green-600"
                                    >
                                        Accepter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {previewFile && <FilePreviewModal />}
        </div>
    );
}
export default Dashboard;
*/
import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiX, FiFileText, FiDownload, FiBook } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import InscriptionDomaine from "./InscriptionDomaine";
import Maps from "./Maps";

const Dashboard = ({ userType }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [showAllCourses, setShowAllCourses] = useState(false);

    const [stats, setStats] = useState({
        totalFormateurs: 10,
        totalApprenants: 150,
        totalQuizz: 25,
        actionsByModerateurs: 5,
        pendingRegistrations: [
            {
                id: 1,
                name: "Nour Hamouti",
                email: "nh@example.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "Hafida",
                date: "2023-05-13"
            },
            {
                id: 2,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 3,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 4,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 5,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            },
            {
                id: 6,
                name: "Nour Hamouti",
                email: "nh@gmail.com",
                phone: "0123456789",
                cv: "/path/to/cvNour.pdf",
                diplomas: "/chemin/vers/diplomes.pdf",
                experience: "5 ans en ecole coranique",
                date: "2023-05-15"
            }
        ],
        pendingCourseSubmissions: [
            {
                id: 1,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "10$",
                date: "2023-05-10"
            },
            {
                id: 2,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "4$",
                date: "2023-05-10"
            },
            {
                id: 3,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "10$",
                date: "2023-05-10"
            },
            {
                id: 4,
                formateur: "Hamza Nemouchi",
                formateurId: 10,
                title: "Introduction au mirath",
                description: "Introduction au lois du mirath",
                file: "/chemin/vers/course.pptx",
                additionalFiles: "Quizz.pdf",
                duration: "8 heures",
                price: "0$",
                date: "2023-05-10"
            }
        ]
    });

    const data = [
        { mois: 'Jan', Fiqh: 65, Ahkam: 45, History: 100, Quran: 25, Sira: 50 },
        { mois: 'Feb', Fiqh: 70, Ahkam: 50, History: 71, Quran: 40, Sira: 25 },
        { mois: 'Mar', Fiqh: 90, Ahkam: 100, History: 60, Quran: 50, Sira: 30 },
        { mois: 'Apr', Fiqh: 50, Ahkam: 70, History: 47, Quran: 10, Sira: 40 },
        { mois: 'Mai', Fiqh: 102, Ahkam: 120, History: 70, Quran: 20, Sira: 70 },
        { mois: 'Juin', Fiqh: 80, Ahkam: 50, History: 80, Quran: 25, Sira: 50 },
        { mois: 'Juil', Fiqh: 100, Ahkam: 75, History: 30, Quran: 55, Sira: 54 },
        { mois: 'Août', Fiqh: 90, Ahkam: 65, History: 50, Quran: 70, Sira: 44 },
        { mois: 'Sep', Fiqh: 120, Ahkam: 90, History: 65, Quran: 100, Sira: 70 },
        { mois: 'Oct', Fiqh: 70, Ahkam: 65, History: 90, Quran: 50, Sira: 10 },
        { mois: 'Nov', Fiqh: 90, Ahkam: 45, History: 100, Quran: 70, Sira: 40 },
        { mois: 'Déc', Fiqh: 50, Ahkam: 90, History: 75, Quran: 55, Sira: 30 },
    ];

    const colors = {
        Fiqh: '#8884d8',
        Ahkam: '#82ca9d',
        History: '#ffc658',
        Quran: '#ff7300',
        Sira: '#E8C7DE'
    };

    const handleApproveRegistration = (id) => {
        setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(req => req.id !== id),
            totalFormateurs: prev.totalFormateurs + 1
        }));
        setSelectedRegistration(null);
    };

    const handleRejectRegistration = (id) => {
        setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(req => req.id !== id)
        }));
        setSelectedRegistration(null);
    };

    const handleApproveCourse = (id) => {
        setStats(prev => ({
            ...prev,
            pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id),
            totalQuizz: prev.totalQuizz + 1
        }));
        setSelectedCourse(null);
    };

    const handleRejectCourse = (id) => {
        setStats(prev => ({
            ...prev,
            pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id)
        }));
        setSelectedCourse(null);
    };

    useEffect(() => {
        const fetchStats = () => {
            setLoading(true);
            setTimeout(() => {
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

    const FilePreviewModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">File preview</h3>
                    <button
                        onClick={() => setPreviewFile(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {previewFile?.endsWith('.pdf') ? (
                        <iframe
                            src={previewFile}
                            className="w-full h-full min-h-[70vh]"
                            frameBorder="0"
                            title="Prévisualisation PDF"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <FiFileText className="h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">Preview not available for this format</p>
                            <a
                                href={previewFile}
                                download
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <FiDownload className="mr-2" /> Download the file
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading) return <div className="text-center text-xl">Loading statistics...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                {/* Première ligne : Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <i className="fas fa-user-check text-blue-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Trainers</p>
                            <p className="text-2xl font-bold">{stats.totalFormateurs}</p>
                            <p className="text-green-500 text-sm mt-1">+20% compared to last week</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                            <i className="fas fa-graduation-cap text-green-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Learners</p>
                            <p className="text-2xl font-bold">{stats.totalApprenants}</p>
                            <p className="text-green-500 text-sm mt-1">+10% compared to last week</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-orange-100 p-3 rounded-full mr-4">
                            <i className="fas fa-book text-orange-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Quizzes</p>
                            <p className="text-2xl font-bold">{stats.totalQuizz}</p>
                            <p className="text-green-500 text-sm mt-1">+30% compared to last week</p>
                        </div>
                    </div>
                    {userType?.toUpperCase() === 'SUPERVISEUR' && (
                        <div className="bg-white rounded-lg shadow p-6 flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <i className="fas fa-shield-alt text-purple-500 text-xl"></i>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Actions by Moderators</p>
                                <p className="text-2xl font-bold">{stats.actionsByModerateurs}</p>
                                <p className="text-green-500 text-sm mt-1">+15% compared to last week</p>
                            </div>
                        </div>
                    )}
                </div>

        
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-[60%] space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-base font-semibold mb-3">Recent Activities</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                                        <i className="fas fa-user-plus"></i>
                                    </div>
                                    <div>
                                        <p>A new learner has registered</p>
                                        <span className="text-gray-500 text-sm">1 hour ago</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                                        <i className="fas fa-edit"></i>
                                    </div>
                                    <div>
                                        <p>A trainer has updated their course</p>
                                        <span className="text-gray-500 text-sm">3 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <InscriptionDomaine data={data} colors={colors} />
                        </div>
                    </div>
                    <div className="lg:w-[40%] space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-base font-semibold mb-3">Users by type</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-blue-600 h-3 rounded-full"
                                            style={{ width: `${(stats.totalFormateurs / 2)}%` }}
                                        ></div>
                                    </div>
                                    <div className="ml-4">{stats.totalFormateurs}</div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-green-600 h-3 rounded-full"
                                            style={{ width: `${(stats.totalApprenants / 2)}%` }}
                                        ></div>
                                    </div>
                                    <div className="ml-4">{stats.totalApprenants}</div>
                                </div>

                                {userType?.toUpperCase() === 'SUPERVISEUR' && (
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-3">
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
                        <div className="bg-white rounded-lg shadow p-4">
                            <Maps className="h-[200px] w-full" />
                            <div className="mt-4">
                                <h3 className="text-md font-medium mb-2">Top 5 countries</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>🇩🇿 Algeria</li>
                                    <li>🇲🇦 Morocco</li>
                                    <li>🇹🇳 Tunisia</li>
                                    <li>🇸🇦 Saudi Arabia</li>
                                    <li>🇫🇷 France</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-base font-semibold mb-3">Trainer registration requests</h2>
                        <AnimatePresence>
                            <motion.div
                                className="space-y-3"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {(showAll ? stats.pendingRegistrations : stats.pendingRegistrations.slice(0, 2)).map((request) => (
                                    <div key={request.id} className="border-b pb-3 last:border-0">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{request.name}</p>
                                                <p className="text-gray-500 text-sm">{request.email}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedRegistration(request)}
                                                className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                            >
                                                View request
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {stats.pendingRegistrations.length > 2 && (
                            <div
                                className="mt-4 text-sm text-center text-black hover:underline cursor-pointer flex justify-center items-center gap-1"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? <><FiChevronUp size={16} /> See less</> : <><FiChevronDown size={16} /> See full list</>}
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-base font-semibold mb-3">Course publication requests</h2>
                        <AnimatePresence>
                            <motion.div
                                className="space-y-3"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {(showAllCourses ? stats.pendingCourseSubmissions : stats.pendingCourseSubmissions.slice(0, 2)).map((course) => (
                                    <div key={course.id} className="border-b pb-3 last:border-0">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{course.title}</p>
                                                <p className="text-gray-500 text-sm">By {course.formateur}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCourse(course)}
                                                className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                            >
                                                View request
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {stats.pendingCourseSubmissions.length > 2 && (
                            <div
                                className="mt-4 text-sm text-center text-black hover:underline cursor-pointer flex justify-center items-center gap-1"
                                onClick={() => setShowAllCourses(!showAllCourses)}
                            >
                                {showAllCourses ? <><FiChevronUp size={16} /> See less</> : <><FiChevronDown size={16} /> See full list</>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedRegistration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Trainer details</h3>
                                <button onClick={() => setSelectedRegistration(null)} className="text-gray-500">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Personal information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Full name:</p>
                                            <p className="font-medium">{selectedRegistration.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email:</p>
                                            <p className="font-medium">{selectedRegistration.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Phone Number :</p>
                                            <p className="font-medium">{selectedRegistration.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href={selectedRegistration.cv}
                                            target="_blank"
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                        >
                                            <FiFileText className="mr-2" /> See experiences 
                                        </a>
                                        <a
                                            href={selectedRegistration.diplomas}
                                            target="_blank"
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                        >
                                            <FiFileText className="mr-2" /> View degrees
                                        </a>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => handleRejectRegistration(selectedRegistration.id)}
                                        className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleApproveRegistration(selectedRegistration.id)}
                                        className="px-4 py-2 bg-[#06895F] text-white rounded hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Course details</h3>
                                <button onClick={() => setSelectedCourse(null)} className="text-gray-500">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Title:</p>
                                        <p className="font-medium">{selectedCourse.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Trainer:</p>
                                        <p className="font-medium">{selectedCourse.formateur}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-gray-600">Description:</p>
                                        <p className="font-medium">{selectedCourse.description}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Duration:</p>
                                        <p className="font-medium">{selectedCourse.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Price:</p>
                                        <p className="font-medium">{selectedCourse.price}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Attached files</h4>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setPreviewFile(selectedCourse.file)}
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                        >
                                            <FiBook className="mr-2" /> Course materials
                                        </button>
                                        {selectedCourse.additionalFiles && (
                                            <button
                                                onClick={() => setPreviewFile(selectedCourse.additionalFiles)}
                                                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                            >
                                                <FiFileText className="mr-2" /> See Quizzes
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => handleRejectCourse(selectedCourse.id)}
                                        className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                    >
                                        Rejeter
                                    </button>
                                    <button
                                        onClick={() => handleApproveCourse(selectedCourse.id)}
                                        className="px-4 py-2 bg-[#06895F] text-white rounded hover:bg-green-600"
                                    >
                                        Accepter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {previewFile && <FilePreviewModal />}
        </div>
    );
};

export default Dashboard;


















/*
           return (
               <div className="p-6 bg-gray-50 min-h-screen">
                   <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                       
   
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                           <div className="bg-white rounded-lg shadow p-6 flex items-start">
                               <div className="bg-blue-100 p-3 rounded-full mr-4">
                                   <i className="fas fa-user-check text-blue-500 text-xl"></i>
                               </div>
                               <div>
                                   <p className="text-gray-500 text-sm">Total Formateurs</p>
                                   <p className="text-2xl font-bold">{stats.totalFormateurs}</p>
                                   <p className="text-green-500 text-sm mt-1">+20% vs semaine dernière</p>
                               </div>
                           </div>
                           <div className="bg-white rounded-lg shadow p-6 flex items-start">
                               <div className="bg-green-100 p-3 rounded-full mr-4">
                                   <i className="fas fa-graduation-cap text-green-500 text-xl"></i>
                               </div>
                               <div>
                                   <p className="text-gray-500 text-sm">Total Apprenants</p>
                                   <p className="text-2xl font-bold">{stats.totalApprenants}</p>
                                   <p className="text-green-500 text-sm mt-1">+10% vs semaine dernière</p>
                               </div>
                           </div>
                           <div className="bg-white rounded-lg shadow p-6 flex items-start">
                               <div className="bg-orange-100 p-3 rounded-full mr-4">
                                   <i className="fas fa-book text-orange-500 text-xl"></i>
                               </div>
                               <div>
                                   <p className="text-gray-500 text-sm">Total Quizz</p>
                                   <p className="text-2xl font-bold">{stats.totalQuizz}</p>
                                   <p className="text-green-500 text-sm mt-1">+30% vs semaine dernière</p>
                               </div>
                           </div>
   
                           {userType?.toUpperCase() === 'SUPERVISEUR' && (
                               <div className="bg-white rounded-lg shadow p-6 flex items-start">
                                   <div className="bg-purple-100 p-3 rounded-full mr-4">
                                       <i className="fas fa-shield-alt text-purple-500 text-xl"></i>
                                   </div>
                                   <div>
                                       <p className="text-gray-500 text-sm">Actions par Modérateurs</p>
                                       <p className="text-2xl font-bold">{stats.actionsByModerateurs}</p>
                                       <p className="text-green-500 text-sm mt-1">+15% vs semaine dernière</p>
                                   </div>
                               </div>
                           )}
                       </div>
                       <div className="flex justify-between items-center mb-4">
                               <h2 className="text-lg font-semibold">Network Activities</h2>
                               <button className="text-sm text-blue-500 hover:text-blue-700">View All</button>
                           </div>
   
                       <InscriptionDomaine data={data} colors={colors} />
                       <div className="bg-white rounded-lg shadow p-6">
                         
   
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                               <div className="bg-white p-6 rounded-lg shadow-md">
                                   <h2 className="text-xl font-semibold mb-4">Demandes d'inscription Formateurs</h2>
                                   <div className="space-y-3">
                                       {stats.pendingRegistrations.map(request => (
                                           <div key={request.id} className="border-b pb-3 last:border-0">
                                               <div className="flex justify-between items-center">
                                                   <div>
                                                       <p className="font-medium">{request.name}</p>
                                                       <p className="text-gray-500 text-sm">{request.email}</p>
                                                   </div>
                                                   <button
                                                       onClick={() => setSelectedRegistration(request)}
                                                       className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15] "
                                                   >
                                                       Voir demande
                                                   </button>
                                               </div>
                                           </div>
                                       ))}
                                   </div>
                               </div>
   
   
                               <div className="bg-white p-6 rounded-lg shadow-md">
                                   <h2 className="text-xl font-semibold mb-4">Demandes de publication Cours</h2>
                                   <div className="space-y-3">
                                       {stats.pendingCourseSubmissions.map(course => (
                                           <div key={course.id} className="border-b pb-3 last:border-0">
                                               <div className="flex justify-between items-center">
                                                   <div>
                                                       <p className="font-medium">{course.title}</p>
                                                       <p className="text-gray-500 text-sm">Par {course.formateur}</p>
                                                   </div>
                                                   <button
                                                       onClick={() => setSelectedCourse(course)}
                                                       className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15] "
                                                   >
                                                       Voir demande
                                                   </button>
                                               </div>
                                           </div>
                                       ))}
                                   </div>
                               </div>
   
                           </div>
                       </div>
   
                       <Maps />
                       {selectedRegistration && (
                           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                               <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                                   <div className="p-6">
                                       <div className="flex justify-between items-start mb-4">
                                           <h3 className="text-xl font-semibold">Détails du formateur</h3>
                                           <button onClick={() => setSelectedRegistration(null)} className="text-gray-500">
                                               <FiX size={24} />
                                           </button>
                                       </div>
   
                                       <div className="space-y-4">
                                           <div>
                                               <h4 className="font-medium text-gray-700 mb-2">Informations personnelles</h4>
                                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                   <div>
                                                       <p className="text-gray-600">Nom complet:</p>
                                                       <p className="font-medium">{selectedRegistration.name}</p>
                                                   </div>
                                                   <div>
                                                       <p className="text-gray-600">Email:</p>
                                                       <p className="font-medium">{selectedRegistration.email}</p>
                                                   </div>
                                                   <div>
                                                       <p className="text-gray-600">Téléphone:</p>
                                                       <p className="font-medium">{selectedRegistration.phone}</p>
                                                   </div>
                                                   <div>
                                                       <p className="text-gray-600">Expérience:</p>
                                                       <p className="font-medium">{selectedRegistration.experience}</p>
                                                   </div>
                                               </div>
                                           </div>
   
                                           <div>
                                               <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                                               <div className="flex flex-wrap gap-3">
                                                   <a
                                                       href={selectedRegistration.cv}
                                                       target="_blank"
                                                       className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                                   >
                                                       <FiFileText className="mr-2" /> Voir CV
                                                   </a>
                                                   <a
                                                       href={selectedRegistration.diplomas}
                                                       target="_blank"
                                                       className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                                   >
                                                       <FiFileText className="mr-2" /> Voir diplômes
                                                   </a>
                                               </div>
                                           </div>
   
                                           <div className="flex justify-end space-x-3 pt-4">
                                               <button
                                                   onClick={() => handleRejectRegistration(selectedRegistration.id)}
                                                   className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                               >
                                                   Rejeter
                                               </button>
                                               <button
                                                   onClick={() => handleApproveRegistration(selectedRegistration.id)}
                                                   className="px-4 py-2 bg-[#06895F] text-black rounded hover:bg-green-600"
                                               >
                                                   Accepter
                                               </button>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )}
   
   
                       {selectedCourse && (
                           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                               <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                                   <div className="p-6">
                                       <div className="flex justify-between items-start mb-4">
                                           <h3 className="text-xl font-semibold">Détails du cours</h3>
                                           <button onClick={() => setSelectedCourse(null)} className="text-gray-500">
                                               <FiX size={24} />
                                           </button>
                                       </div>
   
                                       <div className="space-y-4">
                                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                               <div>
                                                   <p className="text-gray-600">Titre:</p>
                                                   <p className="font-medium">{selectedCourse.title}</p>
                                               </div>
                                               <div>
                                                   <p className="text-gray-600">Formateur:</p>
                                                   <p className="font-medium">{selectedCourse.formateur}</p>
                                               </div>
                                               <div className="md:col-span-2">
                                                   <p className="text-gray-600">Description:</p>
                                                   <p className="font-medium">{selectedCourse.description}</p>
                                               </div>
                                               <div>
                                                   <p className="text-gray-600">Durée:</p>
                                                   <p className="font-medium">{selectedCourse.duration}</p>
                                               </div>
                                               <div>
                                                   <p className="text-gray-600">Niveau:</p>
                                                   <p className="font-medium">{selectedCourse.price}</p>
                                               </div>
                                           </div>
   
                                           <div>
                                               <h4 className="font-medium text-gray-700 mb-2">Fichiers joints</h4>
                                               <div className="flex flex-wrap gap-3">
                                                   <button
                                                       onClick={() => setPreviewFile(selectedCourse.file)}
                                                       className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                                   >
                                                       <FiBook className="mr-2" /> Support de cours
                                                   </button>
                                                   {selectedCourse.additionalFiles && (
                                                       <button
                                                           onClick={() => setPreviewFile(selectedCourse.additionalFiles)}
                                                           className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
                                                       >
                                                           <FiFileText className="mr-2" /> Documents supplémentaires
                                                       </button>
                                                   )}
                                               </div>
                                           </div>
   
                                           <div className="flex justify-end space-x-3 pt-4">
                                               <button
                                                   onClick={() => handleRejectCourse(selectedCourse.id)}
                                                   className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                                   >
                                                   Rejeter
                                               </button>
                                               <button
                                                   onClick={() => handleApproveCourse(selectedCourse.id)}
                                                   className="px-4 py-2 bg-[#06895F] text-black rounded hover:bg-green-600"
                                               >
                                                   Accepter
                                               </button>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )}
   
                       {previewFile && <FilePreviewModal />}
   
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
   */