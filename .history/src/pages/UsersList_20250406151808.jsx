import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../styles/UsersList.css';

const UsersList = ({ userType }) =>
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [contextMenu, setContextMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();
    const itemsPerPage = 5;

    useEffect(() =>
    {
        const fetchUsers = async () =>
        {
            try
            {
                const response = await axios.get(`http://localhost:8081/api/users?role=${userType}`);
                setUsers(response.data);
            } catch (err)
            {
                setError("Erreur lors du chargement des utilisateurs.");
            } finally
            {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userType]);

    const filteredUsers = users.filter(
        user => user.name.toLowerCase().includes(searchTerm)
    );

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

    if (loading) return <p>Chargement des utilisateurs...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="users-list-container">
            <h1>Liste des {userType === "FORMATEUR" ? "Formateurs" : "Apprenants"}</h1>
            <div className="search-stats-container">
                <input
                    type="text"
                    placeholder={`Rechercher un ${userType === "FORMATEUR" ? "formateur" : "apprenant"}...`}
                    onChange={handleSearch}
                    className="search-input"
                />
                <input
                    type="text"
                    value={`Nombre total des ${userType === "FORMATEUR" ? "Formateurs" : "Apprenants"} : ${filteredUsers.length}`}
                    className="search-input"
                    style={{ textAlign: "center", color: "#333", cursor: "default" }}
                    disabled
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.permissions.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"← Précédent"}
                nextLabel={"Suivant →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default UsersList;