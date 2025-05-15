import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FiSearch, FiUser, FiChevronLeft, FiChevronRight, FiBarChart2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const UsersList = ({ userType }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);
    
                let response;
                if (userType === "FORMATEUR") {
                    response = await axios.get("/api/users/db/formateurs/approved");
                } else {
                    response = await axios.get(`/api/users/db/apprenants`);
                }
    
                const formattedUsers = response.data.map(user => ({
                    id: user.id,
                    name: [user.prenom, user.nom].filter(Boolean).join(' ') || user.username || 'Nom inconnu',
                    email: user.email || 'Email non fourni',
                    role: user.userType
                }));
    
                setUsers(formattedUsers);
            } catch (err) {
                console.error("Erreur API:", {
                    url: err.config?.url,
                    status: err.response?.status,
                    data: err.response?.data
                });
                setError("Impossible de charger les données. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, [userType]);
    const filteredUsers = users.filter(user => 
        user?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false
    );

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleViewStats = (userId) => {
        navigate(`/users/${userType}/${userId}/stats`);
    };

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-teal-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg max-w-md mx-auto">
                {error}
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-2 text-blue-500 hover:underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <div className="fixed inset-0 z-0 bg-cover bg-center opacity-60 w-screen h-screen" 
     style={{ 
         backgroundImage: 'url(/images/Screenshot_2181.jpg)',
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center',
         left: 0,
         right: 0
     }} />
            
            <div className="relative z-10 w-full h-full">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center pt-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#034732]">
                            {userType === "FORMATEUR" ? "List of Trainers" : "List of Students"}
                        </h1>
                        <p className="text-gray-500 mt-2">Management</p>
                    </div>
                    <div className="mt-6 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={`Search for a ${userType === "FORMATEUR" ? "trainer" : "student"}...`}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <span className="font-medium text-gray-700">
                                {filteredUsers.length} {filteredUsers.length > 1 ? 
                                (userType === "FORMATEUR" ? "trainers" : "students") : 
                                (userType === "FORMATEUR" ? "trainer" : "student")}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 px-4">
                        {filteredUsers.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                {userType === "FORMATEUR" && (
                                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map(user => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-black mr-3">
                                                                <FiUser />
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <a href={`mailto:${user.email}`} className="text-sm text-black hover:underline">
                                                            {user.email}
                                                        </a>
                                                    </td>
                                                    {userType === "FORMATEUR" && (
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button
                                                               onClick={() => handleViewStats(user.id)}
                                                               className="px-3 py-1 bg-gray-200 text-black rounded-md hover:bg-[#938A8A] transition-colors flex items-center gap-1 text-sm"
                                                              >
                                                               <FiBarChart2 className="inline mr-1" />
                                                               <span className="hidden xs:inline">Statistics</span>
                                                         </button>
                                                     </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
                                <p className="text-gray-500">
                                    {loading ? 'Loading...' : 'No user found'}
                                </p>
                            </div>
                        )}
                    </div>

                    {filteredUsers.length > itemsPerPage && (
                        <div className="mt-6 pb-6">
                            <ReactPaginate
                                previousLabel={<FiChevronLeft className="h-5 w-5" />}
                                nextLabel={<FiChevronRight className="h-5 w-5" />}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName="flex items-center justify-center space-x-1"
                                pageLinkClassName="px-3 py-1 rounded-md text-sm font-medium text-black hover:bg-[#938A8A]"
                                activeLinkClassName="bg-gray-200 text-black hover:bg-[#938A8A]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersList;