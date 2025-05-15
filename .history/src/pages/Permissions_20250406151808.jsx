import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Permissions.css';

const Permissions = () =>
{
    const [roles, setRoles] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchPermissions = async () =>
        {
            try
            {
                const response = await axios.get('http://localhost:8081/api/permissions');
                setRoles(response.data);
            } catch (err)
            {
                setError("Erreur lors du chargement des permissions.");
            } finally
            {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, []);

    if (loading) return <p>Chargement des permissions...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="permissions-container">
            <h1>Gestion des Permissions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rôle</th>
                        <th>Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(roles).map(([role, permissions], index) => (
                        <tr key={index}>
                            <td>{role}</td>
                            <td>{permissions.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Permissions;
