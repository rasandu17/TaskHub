import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post(
        '/tasks',
        { title },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTitle('');
      onTaskAdded(); // refresh task list
    } catch (err) {
      console.error('Error creating task', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow border p-2 rounded shadow"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
