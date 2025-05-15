  import React, { useEffect, useState, useMemo } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import ReactPaginate from 'react-paginate';
  import { FiSearch, FiUserPlus, FiBarChart2, FiChevronUp, FiChevronLeft, FiChevronRight, FiChevronDown, FiTrash2 } from 'react-icons/fi';
  import '../styles/ModerateursListe.css';
  import axios from '../axios';

  const ModerateursListe = ({ userType }) => {
    const [moderateurs, setModerateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [moderatorToDelete, setModeratorToDelete] = useState(null);
    
    useEffect(() => {
      const fetchModerateurs = async () => {
        try {
          const response = await axios.get('/api/moderateurs');
          const formattedData = response.data.map(moderateur => ({
            id: moderateur.id,
            nom: moderateur.prenom && moderateur.nom
              ? `${moderateur.prenom} ${moderateur.nom}`
              : moderateur.username,
            email: moderateur.email
          }));
          setModerateurs(formattedData);
        } catch (err) {
          setError(err.response?.data?.message || 'Erreur lors du chargement des modérateurs');
        } finally {
          setLoading(false);
        }
      };
      fetchModerateurs();
    }, []);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value.toLowerCase());
      setCurrentPage(0); 
    };

    const handleViewStats = (id) => {
      navigate(`/moderateurs/${id}/statistiques`);
    };

    const handleDeleteClick = (moderatorId) => {
      setModeratorToDelete(moderatorId);
      setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
      if (moderatorToDelete) {
        try {
          await axios.delete(`/api/moderateurs/${moderatorToDelete}`);
          setModerateurs(moderateurs.filter(m => m.id !== moderatorToDelete));
          setError(null);
        } catch (err) {
          setError(err.response?.data?.message || 'Erreur lors de la suppression');
        } finally {
          setShowConfirmModal(false);
          setModeratorToDelete(null);
        }
      }
    };
    const filteredModerateurs = useMemo(() => {
      return moderateurs.filter(
        (moderateur) =>
          moderateur.nom.toLowerCase().includes(searchTerm) ||
          moderateur.email.toLowerCase().includes(searchTerm)
      );
    }, [moderateurs, searchTerm]);

    const requestSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    const sortedModerateurs = useMemo(() => {
      let sortableItems = [...filteredModerateurs];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [filteredModerateurs, sortConfig]);

    const offset = currentPage * itemsPerPage;
    const currentItems = sortedModerateurs.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(sortedModerateurs.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };

    if (loading) return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-teal-600">Loading...</div>
      </div>
    );

    if (error) return (
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

    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'url(/images/Screenshot_2181.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center'
            }} 
        />
        <div className="relative z-10 container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold text-[#034732] mb-8 text-center">Moderator Management</h1>

          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4 ">
          <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a moderator..."
                  onChange={handleSearch}
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
            </div>

            <div className="bg-gray-150 border border-black-300 rounded-lg p-2 text-center flex-shrink-0 shadow-sm">
              <span className="font-medium text-gray-800">Total: {filteredModerateurs.length}</span>
            </div>
        </div>

          <div className="overflow-x-auto rounded-xl shadow-lg border-gray-300">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('id')}
                >
                  <div className="flex items-center">
                    ID
                    {sortConfig.key === 'id' && (
                      sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('nom')}
                >
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === 'nom' && (
                      sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((moderateur) => (
                  <tr
                    key={moderateur.id}
                    className="border-b border-gray-100 hover:bg-gray-200 transition-colors duration-150"
                  >
                    <td className="text-center py-3 px-4 font-medium">{moderateur.id}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium">
                          {moderateur.nom.charAt(0)}
                        </div>
                        <span>{moderateur.nom}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 text-black hover:underline">
                      <a href={`mailto:${moderateur.email}`}>{moderateur.email}</a>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        {userType === 'SUPERVISEUR' && (
                          <button
                            className="bg-white text-black border border-gray-300 py-1 px-3 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center"
                            onClick={() => handleDeleteClick(moderateur.id)}
                          >
                            <FiTrash2 size={16} className="mr-1" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No moderator found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={<FiChevronLeft className="h-20 w-5" />}
          nextLabel={<FiChevronRight className="h-20 w-5" />}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center space-x-1 mt-4"
          pageLinkClassName="px-3 py-1 rounded-md text-sm font-medium text-black hover:bg-gray-400"
          activeLinkClassName="bg-gray-200 text-black hover:bg-gray-300"
          forcePage={currentPage}
        />

        {userType === 'SUPERVISEUR' && (
          <div className="mt-6 text-center">
            <Link
              to="/moderateurs/add"
              className="bg-gray-200 text-black py-2 px-6 rounded-lg hover:bg-gray-400 shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center"
            >
              <FiUserPlus className="mr-2" />
              Add a moderator
            </Link>
          </div>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                  <FiTrash2 className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Delete Moderator</h3>
                <p className="text-gray-600 text-center mb-6">
                  This will permanently delete the moderator account. Are you sure?
                </p>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    );
  };

  export default ModerateursListe;