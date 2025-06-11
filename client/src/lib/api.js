// src/lib/api.js

// export const baseURL = 'http://localhost:5000/api';
export const baseURL = 'https://uc-vdo-server.vercel.app/api';
// /api

export const fetchTasks = async () => {
  const res = await fetch(`${baseURL}/tasks`);
  return await res.json();
};

// add new task
export const addTask = async (taskData) => {
  const res = await fetch(`${baseURL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return await res.json();
};

export const updateTaskStatus = async (id, status) => {
  const res = await fetch(`${baseURL}/tasks/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};
