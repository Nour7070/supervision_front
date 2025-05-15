/*
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

    const filteredUsers = simulatedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
*/
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FiSearch, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const simulatedUsers = [
    { id: 1, name: "", email:""},
    { id: 2, name: "Jane Smith",  },
    
];

const UsersList = ({ userType }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const filteredUsers = simulatedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Liste des {userType === "FORMATEUR" ? "Formateurs" : "Apprenants"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Gestion des accès et permissions
                    </p>
                </div>

                {/* Search and Stats */}
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Rechercher un ${userType === "FORMATEUR" ? "formateur" : "apprenant"}...`}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <span className="font-medium text-gray-700">
                            {filteredUsers.length} {filteredUsers.length > 1 ? 
                            (userType === "FORMATEUR" ? "formateurs" : "apprenants") : 
                            (userType === "FORMATEUR" ? "formateur" : "apprenant")}
                        </span>
                    </div>
                </div>

                {/* Table */}
                {filteredUsers.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentItems.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                                                        <FiUser />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-2">
                                                    {user.permissions.map((perm, index) => (
                                                        <span 
                                                            key={index} 
                                                            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                                        >
                                                            {perm}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
                        <p className="text-gray-500">Aucun utilisateur trouvé</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6">
                    <ReactPaginate
                        previousLabel={<FiChevronLeft className="h-5 w-5" />}
                        nextLabel={<FiChevronRight className="h-5 w-5" />}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName="flex items-center justify-center space-x-1"
                        pageLinkClassName="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        previousLinkClassName="p-1 rounded-md text-gray-700 hover:bg-gray-100"
                        nextLinkClassName="p-1 rounded-md text-gray-700 hover:bg-gray-100"
                        activeLinkClassName="bg-blue-500 text-white hover:bg-blue-600"
                        disabledLinkClassName="text-gray-400 cursor-not-allowed hover:bg-transparent"
                        breakLabel="..."
                        breakClassName="px-3 py-1"
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersList;