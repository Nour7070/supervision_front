/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddModerateur = () =>
{
    const [Name, setName] = useState('');
    const [FirstName, setFirstName] = useState('');
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
            if (Name && FirstName && email && password)
            {
                alert('Modérateur ajouté avec succès !');
                setName('');
                setFirstName('');
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
        <div className="flex items-center justify-center min-h-screen bg-white-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Ajouter un Modérateur</h1>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-white-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-700 font-medium mb-2">PréName</label>
                        <input
                            type="text"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 border border-white-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-white-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-white-300 rounded-md"
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
                        className="w-full mt-4 bg-white-400 text-white py-2 rounded-md hover:bg-white-500 transition-colors"
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
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

const AddModerateur = () =>
{
    const [formData, setFormData] = useState({
        Name: '',
        FirstName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError('');


        setTimeout(() =>
        {
            if (Object.values(formData).every(field => field.trim()))
            {
                alert('Modérateur ajouté avec succès !');
                setFormData({
                    Name: '',
                    FirstName: '',
                    email: '',
                    password: ''
                });
            } else
            {
                setError('Tous les champs sont requis.');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 mr-4 transition-colors"
                    >
                        <FiArrowLeft className="text-gray-600" size={20} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Add a moderator</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">Last Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
                                focus:border-gray-700 focus:ring-1 focus:ring-gray-400
                                focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">First Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
                                focus:border-gray-700 focus:ring-1 focus:ring-gray-400
                                focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
            focus:border-gray-700 focus:ring-1 focus:ring-gray-400
            focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                name="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
            focus:border-gray-700 focus:ring-1 focus:ring-gray-400
            focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-2 space-y-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#CBE2D7] text-black py-2.5 rounded-lg hover:bg-[#938A8A] transition-all shadow-md flex items-center justify-center"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    In progress...
                                </span>
                            ) : 'Add the moderator'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                            className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModerateur;