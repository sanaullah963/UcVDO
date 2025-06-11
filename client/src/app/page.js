// src/app/page.jsx
"use client";

import { useEffect, useState } from 'react';
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import { addTask, fetchTasks, updateTaskStatus } from "../lib/api";

export default function Page() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tasks, setTasks] = useState([]); // temp array to simulate DB

  useEffect(() => {
      loadTasks();
    }, []);
  const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };

  const handleTaskSubmit = (task) => {
 
  addTask(task).then((newTask) => {
    setTasks([newTask, ...tasks]);
  })
  };

  const handleStatusChange =async (id, newStatus) => {
    const updated = await updateTaskStatus(id, newStatus);
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ?
          updated
          : task
      )
    );
  };


  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = category === "All" || task.status === category;
    const matchesSearch = task.link.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <SearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />
      <AddTaskForm onSubmit={handleTaskSubmit} />
      <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
    </main>
  );
}
