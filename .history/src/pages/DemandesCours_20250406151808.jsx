import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Quizz from "./Quizz";
import "../styles/DemandesCours.css";

const DemandesCours = () =>
{
  const { id } = useParams();
  const [demandes, setDemandes] = useState([]);
  const [selectedQuizz, setSelectedQuizz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    const fetchDemandes = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:8081/api/demandes/formateur/${id}`);
        setDemandes(response.data);
      } catch (err)
      {
        setError("Erreur lors du chargement des demandes.");
      } finally
      {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [id]);

  const handleAccept = async (coursId) =>
  {
    try
    {
      await axios.post(`http://localhost:8081/api/demandes/${coursId}/accepter`);
      alert(`Cours ID ${coursId} accepté`);
      setDemandes(demandes.filter((cours) => cours.id !== coursId));
    } catch (err)
    {
      alert("Erreur lors de l'acceptation du cours.");
    }
  };

  const handleReject = async (coursId) =>
  {
    try
    {
      await axios.post(`http://localhost:8081/api/demandes/${coursId}/rejeter`);
      alert(`Cours ID ${coursId} rejeté`);
      setDemandes(demandes.filter((cours) => cours.id !== coursId));
    } catch (err)
    {
      alert("Erreur lors du rejet du cours.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="demandes-container">
      <h1>Demandes de publication pour Formateur ID {id}</h1>
      <div className="demandes-list">
        {demandes.length === 0 ? (
          <p>Aucune demande en attente.</p>
        ) : (
          demandes.map((cours) => (
            <div key={cours.id} className="demande-card">
              <h2>{cours.titre}</h2>
              <p>{cours.description}</p>
              <p><strong>Quizz associé :</strong> {cours.quizz || "Aucun quizz disponible"}</p>
              <div className="actions">
                <button className="accept-btn" onClick={() => handleAccept(cours.id)}>Accepter</button>
                <button className="reject-btn" onClick={() => handleReject(cours.id)}>Rejeter</button>
                {cours.quizz && (
                  <button className="quizz-btn" onClick={() => setSelectedQuizz(cours.id)}>Voir le Quizz</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedQuizz && <Quizz coursId={selectedQuizz} onClose={() => setSelectedQuizz(null)} />}
    </div>
  );
};

export default DemandesCours;
