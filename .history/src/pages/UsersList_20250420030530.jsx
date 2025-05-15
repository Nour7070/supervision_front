/*import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FiSearch, FiUser, FiChevronLeft, FiChevronRight, FiBarChart2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
const UsersList = ({ userType }) =>
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() =>
    {
        const fetchUsers = async () =>
        {
            try
            {
                // Conversion du type pour correspondre à votre backend
                const backendUserType = userType === "FORMATEUR" ? "FORMATEUR" : "APPRENANT";
                const response = await axios.get(`http://localhost:8081/api/users/${backendUserType}`);

                // Transformation des données pour correspondre à votre frontend
                const formattedUsers = response.data.map(user => ({
                    id: user.id,
                    name: user.prenom && user.nom
                        ? `${user.prenom} ${user.nom}`
                        : user.username,
                    email: user.email,
                    role: user.userType
                }));

                setUsers(formattedUsers);
            } catch (err)
            {
                setError(err.message);
                console.error("Erreur de chargement:", err);
            } finally
            {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userType]);
*/
    /*const filteredUsers = simulatedUsers.filter(user =>
    {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = user.role === userType;
        return matchesSearch && matchesRole;
    });
*//*
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <div className="animate-pulse text-teal-600">Loading users...</div>
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
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/ph3.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: '0.6',
                }}
            ></div>

            <div className="relative z-10 w-full h-full">
                <div className="max-w-6xl mx-auto ">
                    <div className="text-center pt-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            List of {userType === "FORMATEUR" ? "Trainers" : "Students"}
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Access management
                        </p>
                    </div>

                    <div className="mt-6 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={`Search for a ${userType === "FORMATEUR" ? "trainer" : "student"}...`}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
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
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map(user => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-[#CBE2D7] rounded-full flex items-center justify-center text-black mr-3">
                                                                <FiUser />
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <a
                                                                href={`mailto:${user.email}`}
                                                                className="text-sm text-black hover:underline"
                                                            >
                                                                {user.email}
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleViewStats(user.id)}
                                                            className="px-3 py-1 bg-[#CBE2D7] text-black rounded-md hover:bg-[#938A8A] transition-colors flex items-center gap-1"
                                                        >
                                                            <FiBarChart2 className="inline mr-1" />
                                                            Stats
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
                                <p className="text-gray-500">No user found</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pb-6">
                        <ReactPaginate
                            previousLabel={<FiChevronLeft className="h-5 w-5" />}
                            nextLabel={<FiChevronRight className="h-5 w-5" />}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="flex items-center justify-center space-x-1"
                            pageLinkClassName="px-3 py-1 rounded-md text-sm font-medium text-black hover:bg-[#938A8A]"
                            previousLinkClassName="p-1 rounded-md text-black hover:bg-[#938A8A]"
                            nextLinkClassName="p-1 rounded-md text-black hover:bg-[#938A8A]"
                            activeLinkClassName="bg-[#CBE2D7] text-black hover:bg-[#938A8A]"
                            disabledLinkClassName="text-black cursor-not-allowed hover:bg-transparent"
                            breakLabel="..."
                            breakClassName="px-3 py-1"
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}
export default UsersList;
*/import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from '../axios';

const UserStat = () => {
    const { id, userType } = useParams();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        coursPublies: 0,
        coursEnAttente: 0,
        etudiantsAbonnes: 0,
        coursSuivis: [],
        tauxCompletion: 0,
        formateursSuivis: 0
    });
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userType === "FORMATEUR") {
                    const statsRes = await axios.get(`/api/users/formateurs/${id}/stats`);
                    setStats(prev => ({
                        ...prev,
                        coursPublies: statsRes.data.coursPublies,
                        coursEnAttente: statsRes.data.coursEnAttente,
                        etudiantsAbonnes: statsRes.data.etudiantsAbonnes
                    }));

                    const coursesRes = await axios.get(`/courses/formateurs/${id}/courses`);
                    setCourses(coursesRes.data);
                } else if (userType === "APPRENANT") {
                    const statsRes = await axios.get(`/api/users/apprenants/${id}/stats`);
                    setStats(prev => ({
                        ...prev,
                        coursSuivis: statsRes.data.coursSuivis,
                        tauxCompletion: statsRes.data.tauxCompletion,
                        formateursSuivis: statsRes.data.formateursSuivis
                    }));

                    const coursesRes = await axios.get(`/api/users/apprenants/${id}/courses`);
                    setCourses(coursesRes.data);
                }
            } catch (err) {
                console.error("Erreur:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userType]);

    if (loading) return <div className="p-4">Chargement...</div>;

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center mb-4 text-blue-600"
            >
                <FiArrowLeft className="mr-2" />
                Retour
            </button>

            <h1 className="text-2xl font-bold mb-6">
                Statistiques du {userType === "FORMATEUR" ? "Formateur" : "Apprenant"}
            </h1>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {userType === "FORMATEUR" ? (
                    <>
                        <StatBox title="Cours Publiés" value={stats.coursPublies} />
                        <StatBox title="Cours en Attente" value={stats.coursEnAttente} />
                        <StatBox title="Étudiants Inscrits" value={stats.etudiantsAbonnes} />
                    </>
                ) : (
                    <>
                        <StatBox title="Cours Suivis" value={stats.coursSuivis.length || 0} />
                        <StatBox title="Taux de Complétion" value={stats.tauxCompletion + "%"} />
                        <StatBox title="Formateurs Suivis" value={stats.formateursSuivis} />
                    </>
                )}
            </div>

            {/* Liste des cours */}
            <h2 className="text-xl font-semibold mb-4">Liste des Cours</h2>
            <div className="space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="p-4 border rounded-lg">
                        <h3 className="font-bold">{course.titre}</h3>
                        <p className="text-gray-600">{course.description || 'Pas de description'}</p>
                        {course.status && (
                            <span className={`text-sm px-2 py-1 rounded ${
                                course.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {course.status}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Composant pour afficher une stat
const StatBox = ({ title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default UserStat;
