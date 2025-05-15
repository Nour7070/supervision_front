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
import { FiX, FiFileText, FiUser, FiBook, FiDownload } from 'react-icons/fi';

const Dashboard = ({ userType }) =>
{
    const [previewFile, setPreviewFile] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
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
                phone: "0612345678",
                cv: "/path/to/cv.pdf",
                diplomas: "/path/to/diplomas.pdf",
                experience: "5 ans en développement web",
                date: "2023-05-15"
            }
        ],
        pendingCourseSubmissions: [
            {
                id: 1,
                formateur: "Samira Ben",
                formateurId: 101,
                title: "Introduction à React",
                description: "Cours complet sur les bases de React",
                file: "/path/to/course.pptx",
                additionalFiles: "/path/to/exercices.zip",
                duration: "8 heures",
                level: "Débutant",
                date: "2023-05-10"
            }
        ]
    });

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
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Tableau de bord</h1>
                {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> }*/
                /*
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {renderStat('Total Formateurs', stats.totalFormateurs, 'fa-user-check', 'white')}
                    {renderStat('Total Apprenants', stats.totalApprenants, 'fa-graduation-cap', 'green')}
                    {renderStat('Total Quizz', stats.totalQuizz, 'fa-book', 'orange')}
                    {userType?.toUpperCase() === 'SUPERVISEUR' && (
                        renderStat('Actions par Modérateurs', stats.actionsByModerateurs, 'fa-shield-alt', 'purple')
                    )}
                </div>

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
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Rejeter
                                    </button>
                                    <button
                                        onClick={() => handleApproveRegistration(selectedRegistration.id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
                                        <p className="font-medium">{selectedCourse.level}</p>
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
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Rejeter
                                    </button>
                                    <button
                                        onClick={() => handleApproveCourse(selectedCourse.id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
    );
};

export default Dashboard;
*/
import React, { useState } from 'react';
import { FiMenu, FiX, FiDownload, FiFileText, FiUser, FiBook } from 'react-icons/fi';

const IslamicDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Données statistiques
  const stats = {
    imageTime: { value: 123.50, total: 2500, change: 20 },
    textFiles: { value: 4567, change: 10 },
    collections: { value: 2315, change: 30 },
    connections: { value: 7325, change: 30 }
  };

  // Génération des IDs clients
  const customers = Array.from({length: 100}, (_, i) => ({
    id: 100 + i,
    name: `Client ${i + 1}`,
    status: i % 4 === 0 ? 'Premium' : 'Standard'
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Sidebar (version simplifiée) */}
      <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#034732] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300`}>
        <div className="p-4 flex justify-between items-center border-b border-[#113C30]">
          <h1 className="text-xl font-bold">E-Learning Islamic</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <FiX size={24} />
          </button>
        </div>
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-[#113C30]' : 'hover:bg-[#113C30]'}`}
          >
            Dashboard
          </button>
          {/* Ajoutez d'autres onglets ici */}
        </nav>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Contenu principal */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 mb-6 rounded-lg flex justify-between items-center">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-700"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-[#034732]">Centrelelia Aldai</h1>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#034732] flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Section Welcome */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#034732] mb-2">Welcome, John Duc</h2>
          <p className="text-gray-600">Learn everything related to Islam in our platform</p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Carte On Image Time */}
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#FFD700]">
            <h3 className="text-lg font-semibold mb-2">On Image Time</h3>
            <p className="text-3xl font-bold text-[#034732]">{stats.imageTime.value}</p>
            <p className="text-gray-500">
              {stats.imageTime.total.toLocaleString()} 
              <span className="text-green-500 ml-2">(+{stats.imageTime.change}%)</span>
            </p>
          </div>

          {/* Carte Text Files */}
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#2E86AB]">
            <h3 className="text-lg font-semibold mb-2">Text Files</h3>
            <p className="text-3xl font-bold text-[#034732]">{stats.textFiles.value.toLocaleString()}</p>
            <p className="text-gray-500">
              <span className="text-green-500">(+{stats.textFiles.change}%)</span>
            </p>
          </div>

          {/* Carte Collections */}
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#A23B72]">
            <h3 className="text-lg font-semibold mb-2">Collections</h3>
            <p className="text-3xl font-bold text-[#034732]">{stats.collections.value.toLocaleString()}</p>
            <p className="text-gray-500">
              <span className="text-green-500">(+{stats.collections.change}%)</span>
            </p>
          </div>

          {/* Carte Connections */}
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#F18F01]">
            <h3 className="text-lg font-semibold mb-2">Connections</h3>
            <p className="text-3xl font-bold text-[#034732]">{stats.connections.value.toLocaleString()}</p>
            <p className="text-gray-500">
              <span className="text-green-500">(+{stats.connections.change}%)</span>
            </p>
          </div>
        </div>

        {/* Section Customers */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#034732]">Customers</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search SunshineID..."
                className="p-2 border rounded"
              />
              <select className="p-2 border rounded bg-white">
                <option>Filter</option>
                <option>Premium</option>
                <option>Standard</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {customers.slice(0, 50).map(customer => (
              <div key={customer.id} className="border p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                <p className="font-medium text-[#034732]">SunshineID:</p>
                <p className="text-lg font-bold">{customer.id}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${customer.status === 'Premium' ? 'bg-[#FFD700] text-[#034732]' : 'bg-gray-200'}`}>
                  {customer.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-500">Showing 1-50 of {customers.length} customers</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded">Previous</button>
              <button className="px-3 py-1 bg-[#034732] text-white rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamicDashboard;