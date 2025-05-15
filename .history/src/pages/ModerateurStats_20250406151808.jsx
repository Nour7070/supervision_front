import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ModerateurStat.css';

const ModerateurStats = () =>
{
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    const fetchStats = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:8081/api/moderateurs/${id}/stats`);
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
  }, [id]);

  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="stats-container">
      <h1>Statistiques de {stats.nom}</h1>
      <p><strong>Email :</strong> {stats.email}</p>

      <h2>Actions Récentes</h2>
      <ul>
        {stats.actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>

      <h2>Cours Validés / Refusés</h2>
      <ul>
        {stats.cours.map((cours, index) => (
          <li key={index}>
            <strong>{cours.nom}</strong> - {cours.statut} <br />
            <span className="enseignant">Enseignant : {cours.enseignant}</span>
          </li>
        ))}
      </ul>

      <h2>Plaintes Gérées</h2>
      <ul>
        {stats.plaintes.map((plainte, index) => (
          <li key={index}>{plainte.description} - <strong>{plainte.statut}</strong></li>
        ))}
      </ul>
    </div>
  );
};

export default ModerateurStats;
