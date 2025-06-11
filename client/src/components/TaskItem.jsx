// src/components/TaskItem.jsx
"use client";
import { useState } from "react";
import { baseURL } from "../lib/api";

export default function TaskItem({ task, onStatusChange }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(task.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // delete task
  const handelDeleteTask = async (id) => {
    try {
      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

        console.log("Task deleted successfully");
      } else {
        console.error("Failed to delete task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderStatusButtons = () => {
    if (task.status === "Completed") return null;

    if (task.status === "Pending") {
      return (
        <>
          <button
            onClick={() => onStatusChange(task._id, "Recorded")}
            className="btn-blue"
          >
            Recorded
          </button>
          <button
            onClick={() => onStatusChange(task._id, "Edited")}
            className="btn-yellow"
          >
            Edited
          </button>
          <button
            onClick={() => onStatusChange(task._id, "Completed")}
            className="btn-green"
          >
            Complete
          </button>
        </>
      );
    }

    if (task.status === "Recorded") {
      return (
        <>
          <button
            onClick={() => onStatusChange(task._id, "Edited")}
            className="btn-yellow"
          >
            Edited
          </button>
          <button
            onClick={() => onStatusChange(task._id, "Completed")}
            className="btn-green"
          >
            Complete
          </button>
        </>
      );
    }

    if (task.status === "Edited") {
      return (
        <button
          onClick={() => onStatusChange(task._id, "Completed")}
          className="btn-green"
        >
          Complete
        </button>
      );
    }

    return null;
  };

  return (
    <div className="border p-2 rounded shadow bg-white mb-4">
      {/* Link Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        
        <a
          href={task.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline truncate max-w-[60%]"
        >
          {task.link}
        </a>
        <div className="flex gap-2">
          <button
            onClick={() => handelDeleteTask(task._id)}
            className="btn-outline hover:bg-red-600 cursor-pointer bg-red-500"
          >
            Delete
          </button>
          <button onClick={handleCopy} className="btn-outline cursor-pointer ">
            {copied ? "Copied" : "Copy"}
          </button>
          <a href={task.link} target="_blank" className="btn-outline">
            Open
          </a>
        </div>
      </div>

      {/* Details */}
      {task.details && <p className="mt-2 text-gray-700">{task.details}</p>}

      {/* Extra Fields */}
      {task.extraFields && task.extraFields.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {task.extraFields.map((field, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">{field.what}:</span> {field.value}
            </div>
          ))}
        </div>
      )}

      {/* Status Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold">Status : {task.status}</span>
        {renderStatusButtons()}
      </div>

      {/* Completion Date */}
      {task.status === "Completed" && task.completedAt && (
        <p className="text-xs text-gray-500 mt-2">
          Completed on: {new Date(task.completedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
