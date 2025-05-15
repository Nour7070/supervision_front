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
          { id: 2, nom: ' Guenatri', email: 'LyliaGnt@gmail.com', permissions: ['View'] },
          { id: 3, nom: 'Hamouti Naila', email: 'NailaHm@gmail.com', permissions: ['View', 'Delete'] },
          { id: 4, nom: 'Boudjemaa Nazim', email: 'NailaHm@gmail.com', permissions: ['View', 'Delete'] },
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
