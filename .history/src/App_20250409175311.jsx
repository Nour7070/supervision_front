// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Dashboard from './components/dashboard/Dashboard';
import CourseValidations from './components/validations/CourseValidations';
import FormateurValidations from './components/validations/FormateurValidations';
// import Moderateurs from './pages/Moderateurs';
// import Users from './pages/Users';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-white-100">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/validations" element={<CourseValidations />} />
              <Route path="/formateurs" element={<FormateurValidations />} />
              {/* <Route path="/moderateurs" element={<Moderateurs />} /> */}
              {/* <Route path="/utilisateurs" element={<Users />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
