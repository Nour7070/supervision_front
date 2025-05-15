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
  const [searchTerm, setSearchTerm] = useState("");
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
        const response = await axios.get('https://api.example.com/moderateurs');
        setModerateurs(response.data);
      } catch (err)
      {
        setError("Erreur lors du chargement des modérateurs.");
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
    document.addEventListener("click", handleCloseMenu);
    return () => document.removeEventListener("click", handleCloseMenu);
  }, [contextMenu]);

  const handleSearch = (event) =>
  {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleViewStats = (id) =>
  {
    navigate(`/moderateurs/${id}/statistiques`);
  };

  const filteredModerateurs = moderateurs.filter((moderateur) =>
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

  if (loading) return <p>Chargement des modérateurs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="moderateurs-liste-container">
      <h1>Liste des Modérateurs</h1>

      <div className="search-stats-container">
        <input
          type="text"
          placeholder="Rechercher un modérateur..."
          onChange={handleSearch}
          className="search-input"
        />
        <input
          type="text"
          value={`Nombre total des modérateurs : ${filteredModerateurs.length}`}
          className="search-input"
          style={{ textAlign: "center", color: "#333", cursor: "default" }}
          disabled
        />
      </div>

      <table className="moderateurs-table">
        <thead>
          <tr>
            <th style={{ backgroundColor: "#008081", color: "white" }}>Id</th>
            <th style={{ backgroundColor: "#008081", color: "white" }}>Nom</th>
            <th style={{ backgroundColor: "#008081", color: "white" }}>Permissions</th>
            <th style={{ backgroundColor: "#008081", color: "white" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((moderateur) => (
            <tr key={moderateur.id} onContextMenu={(event) => handleContextMenu(event, moderateur)}>
              <td>{moderateur.id}</td>
              <td>{moderateur.nom}</td>
              <td>{moderateur.email}</td>
              <td>{moderateur.permissions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {contextMenu && (
        <div className="context-menu" style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}>
          <button className="stats-btn" onClick={() => handleViewStats(contextMenu.moderator.id)}>Voir Statistiques</button>
        </div>
      )}

      <ReactPaginate
        previousLabel={"← Précédent"}
        nextLabel={"Suivant →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      {userType === 'SUPERVISEUR' && (
        <div className="add-moderateur-btn">
          <Link to="/moderateurs/add">Ajouter un modérateur</Link>
        </div>
      )}
    </div>
  );
};

export default ModerateursListe;
