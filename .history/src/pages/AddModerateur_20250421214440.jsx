/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft , FiEye ,FiEyeOff } from 'react-icons/fi';

const AddModerateur = () =>
{
    const [formData, setFormData] = useState({
        Name: '',
        prenom: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () =>
    {
        setShowPassword(!showPassword);
    };
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
                    prenom: '',
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
                                name="prenom"
                                value={formData.prenom}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"} // <-- Basé sur l'état
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:border-gray-700 focus:ring-1 focus:ring-gray-400 focus:outline-none transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                onClick={togglePasswordVisibility} // <-- Utilisation de la fonction
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                                ) : (
                                    <FiEye className="text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                                )}
                            </button>
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
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from '../axios';

const AddModerateur = () => {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        username: '',
        email: '',
        password: ''
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Préparation des données pour le backend
            const moderateurData = {
                prenom: formData.prenom,
                nom: formData.nom,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                userType: "MODERATEUR" // Champ requis par votre backend
            };

            const response = await axios.post(
                'http://localhost:8081/api/moderateurs', 
                moderateurData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Type': 'SUPERVISEUR' 
                    }
                }
            );

            if (response.status === 200) {
                alert('Modérateur ajouté avec succès !');
                navigate('/moderateurs');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'ajout du modérateur');
        } finally {
            setLoading(false);
        }
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
                    {/* First Name */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">First Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
                                focus:border-gray-700 focus:ring-1 focus:ring-gray-400
                                focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">Last Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
                                focus:border-gray-700 focus:ring-1 focus:ring-gray-400
                                focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Username (nouveau champ) */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-black mb-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border-1 border-gray-900 rounded-lg
                                focus:border-gray-700 focus:ring-1 focus:ring-gray-400
                                focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:border-gray-700 focus:ring-1 focus:ring-gray-400 focus:outline-none transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                                ) : (
                                    <FiEye className="text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 space-y-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-200 text-black py-2.5 rounded-lg hover:bg-[#938A8A] transition-all shadow-md flex items-center justify-center"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Add moderator'}
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