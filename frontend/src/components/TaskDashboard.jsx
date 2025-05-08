import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <TaskForm onTaskAdded={fetchTasks} />

      <TaskList tasks={tasks} refreshTasks={fetchTasks} />
    </div>
  );
};

export default TaskDashboard;
