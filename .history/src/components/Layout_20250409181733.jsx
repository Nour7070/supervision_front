import React, { useState, useEffect } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';

const Layout = ({ onLogout }) => {
  const [userType, setUserType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Simuler la récupération du userType depuis le localStorage
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Si l'utilisateur n'est ni Superviseur ni Modérateur, rediriger vers la page "Unauthorized"
  if (userType !== "SUPERVISEUR" && userType !== "MODERATEUR") {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className={`flex ${sidebarOpen ? 'pl-64' : 'pl-20'} transition-all`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity z-10 ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-blue-800 text-white transition-all ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}
      >
        <div className="flex justify-between items-center p-4">
          <button className="text-white" onClick={toggleSidebar}>☰</button>
          <button className="text-white" onClick={onLogout}>Déconnexion</button>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <Link to="/dashboard" className="block p-4 hover:bg-blue-700">
                Dashboard
              </Link>
            </li>
            {userType === "SUPERVISEUR" && (
              <li>
                <Link to="/moderateurs" className="block p-4 hover:bg-blue-700">
                  Modérateurs
                </Link>
              </li>
            )}
            <li>
              <Link to="/users/formateur" className="block p-4 hover:bg-blue-700">
                Formateurs
              </Link>
            </li>
            <li>
              <Link to="/users/apprenant" className="block p-4 hover:bg-blue-700">
                Apprenants
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
