import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskDashboard = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/tasks', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} mx-auto max-w-4xl`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Welcome, {user.username || user.email}
        </h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your tasks efficiently
        </p>
      </div>

      <TaskForm onTaskAdded={fetchTasks} />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className={`w-8 h-8 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'} rounded-full animate-spin`}></div>
        </div>
      ) : (
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      )}
    </div>
  );
};

export default TaskDashboard;
