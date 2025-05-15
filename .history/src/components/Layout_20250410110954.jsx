/*
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
*/

/* Hda green #034732;
  Hada yellow  #FACC15;*/

import React, { useState , useEffect } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import { FiHome, FiSettings, FiUsers, FiFileText, FiMenu, FiX, FiBell, FiSearch, FiLogOut } from 'react-icons/fi';

const Layout = ({ onLogout }) => {
  const [userType, setUserType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Simuler la récupération du userType
   useEffect(() => {
     const storedUserType = localStorage.getItem('userType');
     setUserType(storedUserType);
   }, []);

   if (userType !== "SUPERVISEUR" && userType !== "MODERATEUR") {
     return <Navigate to="/unauthorized" />;
   }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`hidden md:flex md:flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-20'} bg-[#034732] transition-all duration-300 flex-col`}>
        <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-[#034732]">
          {sidebarOpen ? (
            <h1 className="text-white text-xl font-bold">Mon App</h1>
          ) : (
            <span className="text-white text-xl font-bold">MA</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg group"
            >
              <span className="text-xl"><FiHome /></span>
              {sidebarOpen && (
                <span className="ml-3 transition-all duration-200">Dashboard</span>
              )}
            </Link>

            {userType === "SUPERVISEUR" && (
              <Link
                to="/moderateurs"
                className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#089B6D] rounded-lg group"
              >
                <span className="text-xl"><FiUsers /></span>
                {sidebarOpen && (
                  <span className="ml-3 transition-all duration-200">Modérateurs</span>
                )}
              </Link>
            )}

            <Link
              to="/users/formateur"
              className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg group"
            >
              <span className="text-xl"><FiFileText /></span>
              {sidebarOpen && (
                <span className="ml-3 transition-all duration-200">Formateurs</span>
              )}
            </Link>

            <Link
              to="/users/apprenant"
              className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg group"
            >
              <span className="text-xl"><FiUsers /></span>
              {sidebarOpen && (
                <span className="ml-3 transition-all duration-200">Apprenants</span>
              )}
            </Link>

            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg group mt-4"
            >
              <span className="text-xl"><FiLogOut /></span>
              {sidebarOpen && (
                <span className="ml-3 transition-all duration-200">Déconnexion</span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#034732] transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform duration-300`}>
        <div className="flex items-center justify-between h-16 px-4 bg-[#07885F]">
          <h1 className="text-white text-xl font-bold">Mon App</h1>
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="text-white p-1 rounded-md hover:bg-[#07885F]"
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="px-2 py-4">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiHome className="text-xl" />
            <span className="ml-3">Dashboard</span>
          </Link>

          {userType === "SUPERVISEUR" && (
            <Link
              to="/moderateurs"
              className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <FiUsers className="text-xl" />
              <span className="ml-3">Modérateurs</span>
            </Link>
          )}

          <Link
            to="/users/formateur"
            className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiFileText className="text-xl" />
            <span className="ml-3">Formateurs</span>
          </Link>

          <Link
            to="/users/apprenant"
            className="flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiUsers className="text-xl" />
            <span className="ml-3">Apprenants</span>
          </Link>

          <button
            onClick={() => {
              onLogout();
              setMobileSidebarOpen(false);
            }}
            className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-[#07885F] rounded-lg mt-4"
          >
            <FiLogOut className="text-xl" />
            <span className="ml-3">Déconnexion</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden text-gray-500 p-1 rounded-md hover:bg-gray-100"
              >
                <FiMenu size={24} />
              </button>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:block ml-2 text-gray-500 p-1 rounded-md hover:bg-gray-100"
              >
                <FiMenu size={24} />
              </button>
              <div className="relative ml-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Rechercher..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <FiBell size={20} />
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-[#FACC15] flex items-center justify-center text-white font-medium">
                  {userType?.charAt(0)}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">
                  {userType === "SUPERVISEUR" ? "Superviseur" : "Modérateur"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;