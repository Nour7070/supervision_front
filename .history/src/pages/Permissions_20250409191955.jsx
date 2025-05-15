/*import React, { useEffect, useState } from 'react';

const Permissions = () =>
{
    const [roles, setRoles] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        // Simuler une récupération des données
        setTimeout(() =>
        {
            const simulatedData = {
                "Admin": ["Gérer les utilisateurs", "Voir les rapports", "Modifier les paramètres"],
                "Formateur": ["Créer des cours", "Voir les performances des étudiants", "Gérer les quiz"],
                "Modérateur": ["Valider les cours", "Gérer les plaintes", "Modifier les permissions"],
                "Apprenant": ["Accéder aux cours", "Répondre aux quiz", "Consulter les résultats"],
            };

            setRoles(simulatedData);
            setLoading(false);
        }, 1500); // Simuler un délai de 1,5 seconde

        // Gestion des erreurs simulées
        setTimeout(() =>
        {
            setError(null); // Simuler l'absence d'erreur
        }, 2000);
    }, []);

    if (loading) return <p className="text-center text-white-500">Chargement des permissions...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Gestion des Permissions</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-teal-500 text-white">
                            <th className="py-2 px-4 text-left">Rôle</th>
                            <th className="py-2 px-4 text-left">Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(roles).map(([role, permissions], index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">{role}</td>
                                <td className="py-2 px-4">{permissions.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Permissions;
