// src/components/TaskList.jsx
'use client';
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onStatusChange }) {

  if (!tasks.length) return <p className="text-gray-500">No tasks found.</p>;
  return (
    <div>
      <p className="text-end text-xl font-semibold"> Total : {tasks?.length}</p>

      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
