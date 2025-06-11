'use client';
import { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTaskStatus } from '../lib/api';

export default function TaskSection() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    link: '',
    details: '',
    extraFields: [],
  });

  // Fetch tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await addTask(formData);
    setTasks([newTask, ...tasks]);
    setFormData({ link: '', details: '', extraFields: [] });
    console.log(newTask);
  };

  const handleStatusChange = async (id, status) => {
    const updated = await updateTaskStatus(id, status);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <div className="p-4">
      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Details"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          className="border p-2 w-full"
        />
        {/* Render extraFields */}
        {formData.extraFields.map((field, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="What"
              value={field.what}
              onChange={(e) => {
                const updated = [...formData.extraFields];
                updated[index].what = e.target.value;
                setFormData({ ...formData, extraFields: updated });
              }}
              className="border p-2"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) => {
                const updated = [...formData.extraFields];
                updated[index].value = e.target.value;
                setFormData({ ...formData, extraFields: updated });
              }}
              className="border p-2"
            />
            <button
              type="button"
              onClick={() => {
                const updated = formData.extraFields.filter((_, i) => i !== index);
                setFormData({ ...formData, extraFields: updated });
              }}
              className="text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setFormData({
              ...formData,
              extraFields: [...formData.extraFields, { what: '', value: '' }],
            });
          }}
          className="text-blue-500"
        >
          + Add more fields
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Submit
        </button>
      </form>

      {/* Display Tasks */}
      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="border p-3 rounded shadow">
            <div className="flex justify-between">
              <span>{task.link}</span>
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(task.link)}>📋</button>
                <a href={task.link} target="_blank" rel="noreferrer">🔗</a>
              </div>
            </div>
            {task.details && <p>{task.details}</p>}
            {task.extraFields.length > 0 && (
              <ul className="text-sm text-gray-600">
                {task.extraFields.map((f, idx) => (
                  <li key={idx}>{f.what}: {f.value}</li>
                ))}
              </ul>
            )}
            <div className="mt-2">
              <p>Status: {task.status}</p>
              {task.status !== 'completed' && (
                <div className="flex gap-2 mt-1">
                  {task.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusChange(task._id, 'recorded')} className="text-blue-600">Recorded</button>
                      <button onClick={() => handleStatusChange(task._id, 'edited')} className="text-yellow-600">Edited</button>
                      <button onClick={() => handleStatusChange(task._id, 'completed')} className="text-green-600">Complete</button>
                    </>
                  )}
                  {task.status === 'recorded' && (
                    <>
                      <button onClick={() => handleStatusChange(task._id, 'edited')} className="text-yellow-600">Edited</button>
                      <button onClick={() => handleStatusChange(task._id, 'completed')} className="text-green-600">Complete</button>
                    </>
                  )}
                  {task.status === 'edited' && (
                    <button onClick={() => handleStatusChange(task._id, 'completed')} className="text-green-600">Complete</button>
                  )}
                </div>
              )}
              {task.completedAt && (
                <p className="text-sm text-gray-500">Completed on: {new Date(task.completedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
