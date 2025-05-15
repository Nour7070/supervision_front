//bg-[#CBE2D7] ancien background de la tete de la table
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate , Navigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FiSearch, FiUserPlus, FiBarChart2, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import '../styles/ModerateursListe.css';
import axios from '../axios';

const ModerateursListe = ({ userType }) =>
{
  const [moderateurs, setModerateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  
  useEffect(() =>
  {
    const fetchModerateurs = async () =>
    {
      try
      {
        const response = await axios.get('/api/moderateurs');

        const formattedData = response.data.map(moderateur => ({
          id: moderateur.id,
          nom: moderateur.prenom && moderateur.nom
            ? `${moderateur.prenom} ${moderateur.nom}`
            : moderateur.username,
          email: moderateur.email
        }));

        setModerateurs(formattedData);
      } catch (err)
      {
        setError(err.response?.data?.message || 'Erreur lors du chargement des modérateurs');
      } finally
      {
        setLoading(false);
      }
    };

    fetchModerateurs();
  }, []);

  const handleContextMenu = (event, moderator) =>
  {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY, moderator });
  };

  const handleCloseMenu = (event) =>
  {
    if (contextMenu && !event.target.closest('.context-menu'))
    {
      setContextMenu(null);
    }
  };

  useEffect(() =>
  {
    document.addEventListener('click', handleCloseMenu);
    return () => document.removeEventListener('click', handleCloseMenu);
  }, [contextMenu]);

  const handleSearch = (event) =>
  {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(0); 
  };

  const handleViewStats = (id) =>
  {
    navigate(`/moderateurs/${id}/statistiques`);
  };

  const filteredModerateurs = useMemo(() =>
  {
    return moderateurs.filter(
      (moderateur) =>
        moderateur.nom.toLowerCase().includes(searchTerm) ||
        moderateur.email.toLowerCase().includes(searchTerm)
    );
  }, [moderateurs, searchTerm]);

  const requestSort = (key) =>
  {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending')
    {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedModerateurs = useMemo(() =>
  {
    let sortableItems = [...filteredModerateurs];
    if (sortConfig !== null)
    {
      sortableItems.sort((a, b) =>
      {
        if (a[sortConfig.key] < b[sortConfig.key])
        {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key])
        {
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

  const handlePageClick = ({ selected }) =>
  {
    setCurrentPage(selected);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-teal-600">Chargement des modérateurs...</div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg max-w-md mx-auto">
      {error}
      <button
        onClick={() => window.location.reload()}
        className="mt-2 text-blue-500 hover:underline"
      >
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black">Moderator Management</h1>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a moderator..."
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="bg-gray-150  border border-black-300 rounded-lg p-2 text-center flex-shrink-0 shadow-sm">
          <span className="font-medium text-gray-800">Total: {filteredModerateurs.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
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
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((moderateur) => (
                <tr
                  key={moderateur.id}
                  onContextMenu={(event) => handleContextMenu(event, moderateur)}
                  className="border-b border-gray-100 hover:bg-[#E5F0EB] transition-colors duration-150"
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
                    <button
                      className="bg-gray-200 text-black py-1 px-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-1"
                      onClick={() => handleViewStats(moderateur.id)}
                    >
                      <FiBarChart2 size={16} />
                      <span>Stats</span>
                    </button>
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

      {contextMenu && (
        <div
          className="context-menu absolute bg-white border border-gray-200 shadow-lg rounded-lg z-50"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          {userType === 'SUPERVISEUR' && (
            <>
              <div className="border-t border-gray-200"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Modify
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-500">
                Delete
              </button>
            </>
          )}
        </div>
      )}

      <ReactPaginate
        previousLabel={'← Précédent'}
        nextLabel={'Suivant →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center mt-6'}
        pageClassName={'mx-1'}
        pageLinkClassName={'px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-400'}
        activeClassName={'bg-gray-200 text-black'}
        activeLinkClassName={'bg-gray-200 text-black px-4 py-2 rounded-lg'}
        previousClassName={'mr-2'}
        previousLinkClassName={'bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-400'}
        nextClassName={'ml-2'}
        nextLinkClassName={'bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-400'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        forcePage={currentPage} previous
      />

      {userType === 'SUPERVISEUR' && (
        <div className="mt-6 text-center">
          <Link
            to="/moderateurs/add"
            className="bg-gray-200 text-black py-2 px-6 rounded-lg hover:bg-gay-400 shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center"
          >
            <FiUserPlus className="mr-2" />
            Add a moderator
            <Navigate to="/moderateurs" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ModerateursListe;