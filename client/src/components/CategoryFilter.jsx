// src/components/CategoryFilter.jsx
"use client";

export default function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Pending", "Recorded", "Edited", "Completed"];

  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`px-3 py-1 rounded border ${
            category === item ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
