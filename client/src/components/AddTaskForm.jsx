// src/components/AddTaskForm.jsx
"use client";

import { useState } from "react";

export default function AddTaskForm({ onSubmit }) {
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [extraFields, setExtraFields] = useState([]);

  const handleExtraFieldChange = (index, field, value) => {
    const updatedFields = [...extraFields];
    updatedFields[index][field] = value;
    setExtraFields(updatedFields);
  };

  const handleAddField = () => {
    setExtraFields([...extraFields, { what: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = extraFields.filter((_, i) => i !== index);
    setExtraFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link) return;

    const newTask = {
      link,
      details,
      extraFields: extraFields.filter((f) => f.what && f.value),
      status: "pending",
    };

    onSubmit(newTask);
    setLink("");
    setDetails("");
    setExtraFields([]);

  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 border rounded shadow mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium">Link</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="input"
          placeholder="https://..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Details (optional)</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="input"
          rows={2}
          placeholder="Add any extra note..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Extra Fields</label>
        {extraFields.map((field, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={field.what}
              onChange={(e) => handleExtraFieldChange(index, "what", e.target.value)}
              className="input"
              placeholder="What"
            />
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleExtraFieldChange(index, "value", e.target.value)}
              className="input"
              placeholder="Value"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="text-red-500 hover:text-red-700 text-sm border border-gray-300 rounded px-2.5"
              title="Remove"
            >
              ❌
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField} className="btn-outline mt-1">
          ➕ Add more fields
        </button>
      </div>

      <button type="submit" className="btn-blue">
        Add Task
      </button>
    </form>
  );
}
