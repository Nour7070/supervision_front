import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserStat.css';

const UserStats = () =>
{
    const { userType, id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchStats = async () =>
        {
            try
            {
                const response = await axios.get(`http://localhost:8081/api/users/${id}/stats`);
                setStats(response.data);
            } catch (err)
            {
                setError("Erreur lors du chargement des statistiques.");
            } finally
            {
                setLoading(false);
            }
        };

        fetchStats();
    }, [userType, id]);

    if (loading) return <p>Chargement des statistiques...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="user-stats-container">
            <h1> Statistiques de {stats.name}</h1>
            <img src={stats.photo} alt={stats.name} className="user-photo" />
            <p><strong>Email :</strong> {stats.email}</p>
            <p><strong>Âge :</strong> {stats.age} ans</p>
            <p><strong>Date d'intégration :</strong> {stats.dateIntegration}</p>

            {userType === "FORMATEUR" ? (
                <div className="stats-grid">
                    <div className="stat-card"><h2>Cours publiés</h2><p>{stats.coursPublies}</p></div>
                    <div className="stat-card"><h2>Cours en attente</h2><p>{stats.coursEnAttente}</p></div>
                    <div className="stat-card"><h2>Étudiants abonnés</h2><p>{stats.etudiantsAbonnes}</p></div>
                    <div className="stat-card"><h2>Quizz publiés</h2><p>{stats.quizzPublies}</p></div>
                    <div className="stat-card"><h2>Plaintes reçues</h2><p>{stats.plaintes}</p></div>
                </div>
            ) : (
                <div className="stats-grid">
                    <div className="stat-card"><h2>Cours suivis</h2><p>{stats.coursSuivis}</p></div>
                    <div className="stat-card"><h2>Cours terminés</h2><p>{stats.coursTermines}</p></div>
                    <div className="stat-card"><h2>Quizz réussis</h2><p>{stats.quizzReussis}</p></div>
                    <div className="stat-card"><h2>Quizz échoués</h2><p>{stats.quizzEchoues}</p></div>
                    <div className="stat-card"><h2>Plaintes déposées</h2><p>{stats.plaintesDeposees}</p></div>
                </div>
            )}
        </div>
    );
};

export default UserStats;
