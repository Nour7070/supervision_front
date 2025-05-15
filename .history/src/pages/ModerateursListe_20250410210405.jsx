/*
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../styles/ModerateursListe.css';

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

  useEffect(() =>
  {
    const fetchModerateurs = async () =>
    {
      try
      {

        const simulatedModerateurs = [
          { id: 1, nom: 'Bouhail Med Ryad', email: 'RyadBhl@gmail.com', permissions: ['View', 'Edit'] },
          { id: 2, nom: 'Guenatri Lylia', email: 'LyliaGnt@gmail.com', permissions: ['View'] },
          { id: 3, nom: 'Hamouti Naila', email: 'NailaHm@gmail.com', permissions: ['View', 'Delete'] },
          { id: 4, nom: 'Boudjemaa Nazim', email: 'NazimBdj@gmail.com', permissions: ['View', 'Delete'] },
          { id: 5, nom: 'Boubakir Mouna', email: 'MounaBoub@gmail.com', permissions: ['View', 'Edit'] },
          { id: 6, nom: 'Kechkar Fizia', email: 'FiziaKech@gmail.com', permissions: ['View'] },
          { id: 7, nom: 'Chergui Feriel', email: 'FerielCh@gmail.com', permissions: ['View', 'Delete'] },
          { id: 8, nom: 'Ben Salima', email: 'SaliBen@gmail.com', permissions: ['View', 'Delete'] },
        ];
        setModerateurs(simulatedModerateurs);
      } catch (err)
      {
        setError('Erreur lors du chargement des modérateurs.');
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
  };

  const handleViewStats = (id) =>
  {
    navigate(`/moderateurs/${id}/statistiques`);
  };

  const filteredModerateurs = moderateurs.filter(
    (moderateur) =>
      moderateur.nom.toLowerCase().includes(searchTerm) ||
      moderateur.email.toLowerCase().includes(searchTerm)
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredModerateurs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredModerateurs.length / itemsPerPage);

  const handlePageClick = ({ selected }) =>
  {
    setCurrentPage(selected);
  };

  if (loading) return <p className="text-center text-white-500">Chargement des modérateurs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des Modérateurs</h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Rechercher un modérateur..."
          onChange={handleSearch}
          className="border border-white-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          value={`Nombre total des modérateurs : ${filteredModerateurs.length}`}
          className="border border-white-300 rounded-lg p-2 w-1/4 text-center bg-white-100 cursor-default"
          disabled
        />
      </div>

      <table className="min-w-full bg-white border border-white-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="bg-teal-600 text-white py-2 px-4">Id</th>
            <th className="bg-teal-600 text-white py-2 px-4">Nom</th>
            <th className="bg-teal-600 text-white py-2 px-4">Email</th>
            <th className="bg-teal-600 text-white py-2 px-4">Permissions</th>
            <th className="bg-teal-600 text-white py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((moderateur) => (
            <tr
              key={moderateur.id}
              onContextMenu={(event) => handleContextMenu(event, moderateur)}
              className="hover:bg-white-100"
            >
              <td className="text-center py-2 px-4">{moderateur.id}</td>
              <td className="text-center py-2 px-4">{moderateur.nom}</td>
              <td className="text-center py-2 px-4">{moderateur.email}</td>
              <td className="text-center py-2 px-4">{moderateur.permissions.join(', ')}</td>
              <td className="text-center py-2 px-4">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewStats(moderateur.id)}
                >
                  Voir Statistiques
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {contextMenu && (
        <div
          className="context-menu absolute bg-white border border-white-300 shadow-lg rounded-lg"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => handleViewStats(contextMenu.moderator.id)}
          >
            Voir Statistiques
          </button>
        </div>
      )}

      <ReactPaginate
        previousLabel={'← Précédent'}
        nextLabel={'Suivant →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center mt-6'}
        activeClassName={'bg-teal-600 text-white px-4 py-2 rounded-lg'}
        previousClassName={'bg-teal-500 text-white px-4 py-2 rounded-lg'}
        nextClassName={'bg-teal-500 text-white px-4 py-2 rounded-lg'}
      />

      {userType === 'SUPERVISEUR' && (
        <div className="mt-6 text-center">
          <Link to="/moderateurs/add" className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700">
            Ajouter un modérateur
          </Link>
        </div>
      )}
    </div>
  );
};

export default ModerateursListe;
*/
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FiSearch, FiUserPlus, FiBarChart2, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import '../styles/ModerateursListe.css';

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
        const simulatedModerateurs = [
          { id: 1, nom: 'Bouhail Med Ryad', email: 'RyadBhl@gmail.com' },
          { id: 2, nom: 'Guenatri Lylia', email: 'LyliaGnt@gmail.com' },
          { id: 3, nom: 'Hamouti Naila', email: 'NailaHm@gmail.com' },
          { id: 4, nom: 'Boudjemaa Nazim', email: 'NazimBdj@gmail.com' },
          { id: 5, nom: 'Boubakir Mouna', email: 'MounaBoub@gmail.com' },
          { id: 6, nom: 'Kechkar Fizia', email: 'FiziaKech@gmail.com' },
          { id: 7, nom: 'Chergui Feriel', email: 'FerielCh@gmail.com' },
          { id: 8, nom: 'Ben Salima', email: 'SaliBen@gmail.com' },
        ];
        setModerateurs(simulatedModerateurs);
      } catch (err)
      {
        setError('Erreur lors du chargement des modérateurs.');
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
    setCurrentPage(0); // Reset to first page when searching
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

        <div
          style={{
            background: 'linear-gradient(to right, #FACC15, #FBBF24)',
            borderColor: '#FDE68A',
            borderWidth: '1px',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
          }}
          className="cursor-default flex-shrink-0"
        >
          <span className="font-medium text-gray-800">Total: {filteredModerateurs.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-[#FACC15] from-teal-600 to-teal-500 text-white">
              <th
                className="py-3 px-4 cursor-pointer"
                onClick={() => requestSort('id')}
              >
                <div className="flex items-center justify-center">
                  ID
                  {sortConfig.key === 'id' && (
                    sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer"
                onClick={() => requestSort('nom')}
              >
                <div className="flex items-center justify-center">
                  Nom
                  {sortConfig.key === 'nom' && (
                    sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((moderateur) => (
                <tr
                  key={moderateur.id}
                  onContextMenu={(event) => handleContextMenu(event, moderateur)}
                  className="border-b border-gray-100 hover:bg-teal-50 transition-colors duration-150"
                >
                  <td className="text-center py-3 px-4 font-medium">{moderateur.id}</td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-medium">
                        {moderateur.nom.charAt(0)}
                      </div>
                      <span>{moderateur.nom}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4 text-blue-600 hover:underline">
                    <a href={`mailto:${moderateur.email}`}>{moderateur.email}</a>
                  </td>
                  <td className="text-center py-3 px-4">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1 px-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-1"
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
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
            onClick={() => handleViewStats(contextMenu.moderator.id)}
          >
            Voir Statistiques
          </button>
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
        pageLinkClassName={'px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100'}
        activeClassName={'bg-teal-600 text-white'}
        activeLinkClassName={'bg-teal-600 text-white px-4 py-2 rounded-lg'}
        previousClassName={'mr-2'}
        previousLinkClassName={'bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600'}
        nextClassName={'ml-2'}
        nextLinkClassName={'bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        forcePage={currentPage}
      />

      {userType === 'SUPERVISEUR' && (
        <div className="mt-6 text-center">
          <Link
            to="/moderateurs/add"
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-2 px-6 rounded-lg hover:from-teal-700 hover:to-teal-600 shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center"
          >
            <FiUserPlus className="mr-2" />
            Add a moderator
          </Link>
        </div>
      )}
    </div>
  );
};

export default ModerateursListe;