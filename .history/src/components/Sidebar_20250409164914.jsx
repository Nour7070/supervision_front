import { NavLink } from 'react-router-dom';
import { 
  XIcon, 
  HomeIcon, 
  ClipboardCheckIcon, 
  UserGroupIcon, 
  UsersIcon, 
  AcademicCapIcon 
} from '@heroicons/react/outline';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <div className="flex items-center">
            <span className="text-xl font-bold">SuperAdmin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-5 px-2 space-y-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <HomeIcon className="mr-3 h-5 w-5" />
            Tableau de bord
          </NavLink>
          
          <NavLink 
            to="/validations" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <ClipboardCheckIcon className="mr-3 h-5 w-5" />
            Validation des cours
          </NavLink>
          
          <NavLink 
            to="/formateurs" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <AcademicCapIcon className="mr-3 h-5 w-5" />
            Validation des formateurs
          </NavLink>
          
          <NavLink 
            to="/moderateurs" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <UserGroupIcon className="mr-3 h-5 w-5" />
            Gestion des modérateurs
          </NavLink>
          
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Utilisateurs
            </div>
          </div>
          
          <NavLink 
            to="/users/FORMATEUR" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <UsersIcon className="mr-3 h-5 w-5" />
            Formateurs
          </NavLink>
          
          <NavLink 
            to="/users/APPRENANT" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <UsersIcon className="mr-3 h-5 w-5" />
            Apprenants
          </NavLink>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;