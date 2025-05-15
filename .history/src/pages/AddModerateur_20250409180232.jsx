import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddModerateur = () =>
{
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simuler l'ajout d'un modérateur avec des données statiques
        setTimeout(() =>
        {
            if (nom && prenom && email && password)
            {
                alert('Modérateur ajouté avec succès !');
                setNom('');
                setPrenom('');
                setEmail('');
                setPassword('');
            } else
            {
                setError('Tous les champs sont requis.');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Ajouter un Modérateur</h1>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Nom</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Prénom</label>
                        <input
                            type="text"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Ajout en cours...' : 'Ajouter'}
                    </button>
                    <button
                        type="button"
                        className="w-full mt-4 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition-colors"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        {loading ? 'Chargement...' : 'Retour'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddModerateur;
