import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const UsersList = ({ userType }) =>
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 5;

    useEffect(() =>
    {
        // Simuler la récupération des utilisateurs après 1 seconde
        setTimeout(() =>
        {
            const simulatedData = [
                { id: 1, name: 'John Doe', permissions: ['Créer Cours', 'Gérer Étudiants'] },
                { id: 2, name: 'Jane Smith', permissions: ['Voir Cours', 'Participer aux Cours'] },
                { id: 3, name: 'Samuel Lee', permissions: ['Créer Cours', 'Gérer Cours'] },
                { id: 4, name: 'Eva Green', permissions: ['Voir Cours', 'Participer aux Cours'] },
                { id: 5, name: 'Max Ford', permissions: ['Gérer Étudiants', 'Voir Cours'] },
                { id: 6, name: 'Sophia White', permissions: ['Participer aux Cours', 'Créer Cours'] },
                { id: 7, name: 'Liam Brown', permissions: ['Gérer Étudiants', 'Voir Cours'] },
                { id: 8, name: 'Olivia Johnson', permissions: ['Créer Cours', 'Participer aux Cours'] }
            ];

            setUsers(simulatedData);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    const handleSearch = (event) => setSearchTerm(event.target.value);

    if (loading) return <p className="text-center text-xl">Chargement des utilisateurs...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Liste des {userType === "FORMATEUR" ? "Formateurs" : "Apprenants"}</h1>

            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder={`Rechercher un ${userType === "FORMATEUR" ? "formateur" : "apprenant"}...`}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-lg w-1/3"
                />
                <input
                    type="text"
                    value={`Total des ${userType === "FORMATEUR" ? "Formateurs" : "Apprenants"}: ${filteredUsers.length}`}
                    className="px-4 py-2 border rounded-lg w-1/3 text-center cursor-default bg-gray-100"
                    disabled
                />
            </div>

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-6 py-3 border-b">ID</th>
                        <th className="px-6 py-3 border-b">Nom</th>
                        <th className="px-6 py-3 border-b">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-3 border-b">{user.id}</td>
                            <td className="px-6 py-3 border-b">{user.name}</td>
                            <td className="px-6 py-3 border-b">{user.permissions.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"← Précédent"}
                nextLabel={"Suivant →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center space-x-2 mt-4"}
                activeClassName={"bg-blue-500 text-white px-4 py-2 rounded-lg"}
                previousClassName={"px-4 py-2 bg-gray-200 rounded-lg"}
                nextClassName={"px-4 py-2 bg-gray-200 rounded-lg"}
            />
        </div>
    );
};

export default UsersList;
