import { NavLink } from 'react-router-dom';
import { XIcon, HomeIcon, ClipboardCheckIcon, UserGroupIcon, UsersIcon, AcademicCapIcon } from '@heroicons/react/outline';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-md text-gray-400 hover:text-white lg:hidden"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-800 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <HomeIcon className="mr-3 h-5 w-5" />
            Accueil
          </NavLink>
          
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-800 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <ClipboardCheckIcon className="mr-3 h-5 w-5" />
            Tâches
          </NavLink>
          
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-800 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <UserGroupIcon className="mr-3 h-5 w-5" />
            Équipes
          </NavLink>
          
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-800 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <UsersIcon className="mr-3 h-5 w-5" />
            Utilisateurs
          </NavLink>
          
          <NavLink
            to="/training"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-800 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <AcademicCapIcon className="mr-3 h-5 w-5" />
            Formation
          </NavLink>
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="/api/placeholder/32/32"
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-300">Jean Dupont</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;