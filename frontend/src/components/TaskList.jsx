import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const TaskList = ({ tasks, refreshTasks }) => {
  const { user } = useContext(AuthContext);

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

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <span
            onClick={() => handleToggle(task._id, task.completed)}
            className={`cursor-pointer ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </span>
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
