/*import React, { useEffect, useState } from "react";
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
        // Simuler des données pour les demandes
        const simulatedDemandes = [
          {
            id: 1,
            titre: "Cours de JavaScript",
            description: "Un cours complet sur JavaScript pour débutants.",
            quizz: "Quizz JavaScript 101",
          },
          {
            id: 2,
            titre: "Cours de React",
            description: "Un cours avancé sur React pour développeurs expérimentés.",
            quizz: "Quizz React Avancé",
          },
        ];
        setDemandes(simulatedDemandes);
        setLoading(false);
      } catch (err)
      {
        setError("Erreur lors du chargement des demandes.");
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [id]);

  const handleAccept = async (coursId) =>
  {
    try
    {
      // Simuler l'acceptation du cours
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
      // Simuler le rejet du cours
      alert(`Cours ID ${coursId} rejeté`);
      setDemandes(demandes.filter((cours) => cours.id !== coursId));
    } catch (err)
    {
      alert("Erreur lors du rejet du cours.");
    }
  };

  if (loading) return <p className="text-center text-white-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Demandes de publication pour Formateur ID {id}</h1>
      <div className="space-y-4">
        {demandes.length === 0 ? (
          <p className="text-center text-white-500">Aucune demande en attente.</p>
        ) : (
          demandes.map((cours) => (
            <div key={cours.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold">{cours.titre}</h2>
              <p className="text-white-700 mb-2">{cours.description}</p>
              <p className="text-white-600">
                <strong>Quizz associé :</strong> {cours.quizz || "Aucun quizz disponible"}
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  onClick={() => handleAccept(cours.id)}
                >
                  Accepter
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  onClick={() => handleReject(cours.id)}
                >
                  Rejeter
                </button>
                {cours.quizz && (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    onClick={() => setSelectedQuizz(cours.id)}
                  >
                    Voir le Quizz
                  </button>
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
