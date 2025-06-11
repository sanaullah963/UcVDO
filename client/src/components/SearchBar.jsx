// src/components/SearchBar.jsx
"use client";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border px-3 py-2 rounded w-full sm:w-auto"
      />
      {/* search button */}
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button> */}
    </div>
  );
}
