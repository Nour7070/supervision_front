import { useState } from 'react';
import { BellIcon, MenuIcon } from '@heroicons/react/outline';

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-500 focus:outline-none hover:text-gray-700 transition-colors"
              aria-label="Ouvrir le menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 ml-2 md:ml-0">
              Plateforme de Supervision
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" />
              </button>
              
              {/* Dropdown des notifications */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Aucune notification pour le moment
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                Superviseur
              </span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;