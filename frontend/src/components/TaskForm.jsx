import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post(
        '/tasks',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTitle('');
      setDescription('');
      setShowDescription(false);
      onTaskAdded(); // refresh task list
    } catch (err) {
      console.error('Error creating task', err);
    }
  };

  return (
    <div className={`mb-6 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Enter a task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`flex-grow p-2 rounded-l border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 text-gray-800'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowDescription(!showDescription)}
            className={`px-2 ${
              darkMode 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            title="Add description"
          >
            {showDescription ? '▲' : '▼'}
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-r ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Add
          </button>
        </div>
        
        {showDescription && (
          <textarea
            placeholder="Enter description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 rounded border mt-2 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 text-gray-800'
            }`}
            rows="3"
          />
        )}
      </form>
    </div>
  );
};

export default TaskForm;
