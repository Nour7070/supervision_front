/* HEDI SANS USER TYPE  */
/*
import React, { useState } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ userType, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (userType !== "SUPERVISEUR" && userType !== "MODERATEUR") {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className={`layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header className="header">
        <div className="header-content">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <button className="btn-secondary" onClick={onLogout}>Déconnexion</button>
        </div>
      </header>

      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>
                <i className="icon-users"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {userType === "SUPERVISEUR" && (
              <li>
                <Link to="/moderateurs" onClick={() => setSidebarOpen(false)}>
                  <i className="icon-users"></i>
                  <span>Modérateurs</span>
                </Link>
              </li>
            )}

            {(userType === "SUPERVISEUR" || userType === "MODERATEUR") && (
              <>
                <li>
                  <Link to="/users/formateur" onClick={() => setSidebarOpen(false)}>
                    <i className="icon-book"></i>
                    <span>Formateurs</span>
                  </Link>
                </li>
                <li>
                  <Link to="/users/apprenant" onClick={() => setSidebarOpen(false)}>
                    <i className="icon-graduate"></i>
                    <span>Apprenants</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
*/
import React, { useState, useEffect } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ onLogout }) =>
{
  const [userType, setUserType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() =>
  {
    // Récupérer le userType du localStorage (simulant une connexion)
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const toggleSidebar = () =>
  {
    setSidebarOpen(!sidebarOpen);
  };

  if (userType !== "SUPERVISEUR" && userType !== "MODERATEUR")
  {
    return <Navigate to="/unauthorized" />;
  }
  console.log("userType dans Layout:", userType);

  return (
    <div className={`layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header className={`header ${sidebarOpen ? 'header-open' : 'header-closed'}`}>
        <div className="header-content">
          <button className={`sidebar-toggle ${sidebarOpen ? 'toggle-open' : 'toggle-closed'}`} onClick={toggleSidebar}>
            ☰
          </button>
          <button className="btn-secondary" onClick={onLogout}>Déconnexion</button>
        </div>
      </header>

      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>
                <i className="icon-dashboard"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {userType === "SUPERVISEUR" && (
              <li>
                <Link to="/moderateurs" onClick={() => setSidebarOpen(false)}>
                  <i className="icon-users"></i>
                  <span>Modérateurs</span>
                </Link>
              </li>
            )}

            <li>
              <Link to="/users/formateur" onClick={() => setSidebarOpen(false)}>
                <i className="icon-book"></i>
                <span>Formateurs</span>
              </Link>
            </li>
            <li>
              <Link to="/users/apprenant" onClick={() => setSidebarOpen(false)}>
                <i className="icon-graduate"></i>
                <span>Apprenants</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
