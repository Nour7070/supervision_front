import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const simulatedUsers = [
    { id: 1, name: "John Doe", permissions: ["Admin", "Manager"] },
    { id: 2, name: "Jane Smith", permissions: ["User", "Editor"] },
    { id: 3, name: "Emily Johnson", permissions: ["Admin"] },
    { id: 4, name: "Michael Brown", permissions: ["Editor"] },
    { id: 5, name: "Sarah Davis", permissions: ["User"] },
    { id: 6, name: "David Wilson", permissions: ["Admin", "Editor"] },
    { id: 7, name: "Sophia Taylor", permissions: ["User"] },
    { id: 8, name: "James Martinez", permissions: ["Manager"] },
    { id: 9, name: "Olivia Anderson", permissions: ["Admin", "User"] },
    { id: 10, name: "William Thomas", permissions: ["Editor"] },
];

const UsersList = ({ userType }) =>
{
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    // Filtrage des utilisateurs selon la recherche
    const filteredUsers = simulatedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    return (
        <div className="p-6 bg-white-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-center text-black-600 mb-6">
                Liste des {userType === "FORMATEUR" ? "Formateurs" : "Apprenants"}
            </h1>

            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder={`Rechercher un ${userType === "FORMATEUR" ? "formateur" : "apprenant"}...`}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <span className="text-white-700">
                    {filteredUsers.length} {userType === "FORMATEUR" ? "formateurs" : "apprenants"}
                </span>
            </div>

            {filteredUsers.length > 0 ? (
                <table className="min-w-full table-auto">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="py-2 px-4 text-left text-white-600">Id</th>
                            <th className="py-2 px-4 text-left text-white-600">Nom</th>
                            <th className="py-2 px-4 text-left text-white-600">Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(user => (
                            <tr key={user.id} className="border-b hover:bg-blue-50">
                                <td className="py-2 px-4 text-white-700">{user.id}</td>
                                <td className="py-2 px-4 text-white-700">{user.name}</td>
                                <td className="py-2 px-4 text-white-700">{user.permissions.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-white-700 mt-4">Aucun utilisateur trouvé.</p>
            )}

            
            <ReactPaginate
                previousLabel={"← Précédent"}
                nextLabel={"Suivant →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center space-x-2 mt-6"}
                pageClassName={"px-4 py-2 bg-white border rounded-md cursor-pointer hover:bg-blue-100"}
                previousClassName={"px-4 py-2 bg-white border rounded-md cursor-pointer hover:bg-blue-100"}
                nextClassName={"px-4 py-2 bg-white border rounded-md cursor-pointer hover:bg-blue-100"}
                activeClassName={"bg-blue-500 text-white"}
            />
        </div>
    );
};

export default UsersList;
