import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`py-4 px-6 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">TaskHub</Link>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Hello</span>
              <button 
                onClick={handleLogout}
                className={`px-4 py-2 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`px-4 py-2 rounded ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;