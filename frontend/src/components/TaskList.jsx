import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/api';

const TaskList = ({ tasks, refreshTasks }) => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const [expandedTask, setExpandedTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      refreshTasks();
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await api.put(
        `/tasks/${id}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      refreshTasks();
    } catch (err) {
      console.error('Error updating task', err);
    }
  };

  const toggleExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className={`${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Tasks ({filteredTasks.length})</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 rounded ${filter === 'all' ? 
              (darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white') : 
              (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`
            }
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')} 
            className={`px-3 py-1 rounded ${filter === 'active' ? 
              (darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white') : 
              (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`
            }
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={`px-3 py-1 rounded ${filter === 'completed' ? 
              (darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white') : 
              (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`
            }
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className={`p-4 text-center rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          No tasks found. Add some tasks to get started!
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className={`p-4 rounded-lg shadow-md transition-all duration-200 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task._id, task.completed)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span
                    onClick={() => toggleExpand(task._id)}
                    className={`cursor-pointer flex-grow ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                    {task.description && (
                      <span className="text-xs ml-2 text-gray-500">
                        {expandedTask === task._id ? '▲' : '▼'}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className={`px-3 py-1 rounded ${
                      darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {expandedTask === task._id && task.description && (
                <div className={`mt-2 p-2 rounded text-sm ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {task.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
