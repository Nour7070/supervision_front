import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserStat = () => {
    const { userType, id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Charger les données réelles depuis l'API
        const fetchStats = async () => {
            try {
                setLoading(true);
                let url = '';
                if (userType === 'FORMATEUR') {
                    url = `/api/stats/formateurs/${id}`;
                } else if (userType === 'APPRENANT') {
                    url = `/api/stats/apprenants/${id}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError('Erreur lors du chargement des statistiques.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
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
