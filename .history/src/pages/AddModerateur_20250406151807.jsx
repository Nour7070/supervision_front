import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddModerateur.css';

const AddModerateur = () =>
{
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError('');

        try
        {
            const response = await axios.post('http://localhost:8081/api/moderateurs', {
                nom,
                prenom,
                email,
                password
            });

            alert('Modérateur ajouté avec succès !');
            setNom('');
            setPrenom('');
            setEmail('');
            setPassword('');
        } catch (err)
        {
            setError(err.response?.data?.message || 'Erreur lors de l\'ajout du modérateur.');
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <div className="add-moderateur-container">
            <h1>Ajouter un Modérateur</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Ajout en cours...' : 'Ajouter'}
                </button>
                <button type="button" className="btn-primary" onClick={() => navigate(-1)} disabled={loading}>
                    {loading ? 'Loading...' : 'Back'}
                </button>
            </form>
        </div>
    );
};

export default AddModerateur;
