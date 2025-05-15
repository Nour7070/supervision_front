// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import
  {
    XIcon,
    HomeIcon,
    ClipboardCheckIcon,
    UserGroupIcon,
    UsersIcon,
    AcademicCapIcon,
  } from '@heroicons/react/outline';

function Sidebar({ sidebarOpen, setSidebarOpen })
{
  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-48 bg-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-md text-gray-600 hover:text-black lg:hidden"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-5 px-2">
        <div className="space-y-1">
          <SidebarLink to="/" icon={HomeIcon} label="Accueil" />
          <SidebarLink to="/tasks" icon={ClipboardCheckIcon} label="Tâches" />
          <SidebarLink to="/teams" icon={UserGroupIcon} label="Équipes" />
          <SidebarLink to="/users" icon={UsersIcon} label="Utilisateurs" />
          <SidebarLink to="/training" icon={AcademicCapIcon} label="Formation" />
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white-300 flex items-center justify-center text-gray-800 text-sm font-medium">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Jean Dupont</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon: Icon, label })
{
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive
          ? 'bg-white-100 text-blue-600'
          : 'text-gray-700 hover:bg-white-50 hover:text-black'
        }`
      }
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </NavLink>
  );
}

export default Sidebar;