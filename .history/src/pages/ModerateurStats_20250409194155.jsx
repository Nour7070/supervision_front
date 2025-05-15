import React, { useState, useEffect } from 'react';

const ModerateurStats = () =>
{
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    // Simuler une récupération de données
    setTimeout(() =>
    {
      // Simuler une réponse réussie
      const simulatedData = {
        nom: "Jean Dupont",
        email: "jean.dupont@example.com",
        actions: [
          "Validation de cours ID 101",
          "Rejet de cours ID 102",
          "Modification de permissions de modérateur",
        ],
        cours: [
          { nom: "Mathématiques avancées", statut: "Validé", enseignant: "Mme. Martin" },
          { nom: "Physique quantique", statut: "Rejeté", enseignant: "M. Dubois" },
        ],
        plaintes: [
          { description: "Plainte sur la qualité du contenu du cours", statut: "Résolue" },
          { description: "Plainte sur un bug de la plateforme", statut: "En attente" },
        ],
      };
      setStats(simulatedData);
      setLoading(false);
    }, 1500); // Simuler un délai de 1,5 secondes

    // Gestion des erreurs simulées
    setTimeout(() =>
    {
      setError(null); // Simuler l'absence d'erreur
    }, 2000); // Pas d'erreur après 2 secondes
  }, []);

  if (loading) return <p className="text-center text-white-500">Chargement des statistiques...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Statistiques de {stats.nom}</h1>
      <p className="text-lg text-center mb-4"><strong>Email :</strong> {stats.email}</p>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Actions Récentes</h2>
        <ul className="list-disc pl-6">
          {stats.actions && stats.actions.length > 0 ? (
            stats.actions.map((action, index) => (
              <li key={index} className="text-white-700">{action}</li>
            ))
          ) : (
            <li className="text-white-500">Aucune action récente</li>
          )}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Cours Validés / Refusés</h2>
        <ul className="list-disc pl-6">
          {stats.cours && stats.cours.length > 0 ? (
            stats.cours.map((cours, index) => (
              <li key={index} className="text-white-700">
                <strong>{cours.nom}</strong> - {cours.statut} <br />
                <span className="text-sm text-white-500">Enseignant : {cours.enseignant}</span>
              </li>
            ))
          ) : (
            <li className="text-white-500">Aucun cours validé ou refusé</li>
          )}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Plaintes Gérées</h2>
        <ul className="list-disc pl-6">
          {stats.plaintes && stats.plaintes.length > 0 ? (
            stats.plaintes.map((plainte, index) => (
              <li key={index} className="text-white-700">
                {plainte.description} - <strong>{plainte.statut}</strong>
              </li>
            ))
          ) : (
            <li className="text-white-500">Aucune plainte en cours</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ModerateurStats;
*/