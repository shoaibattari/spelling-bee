"use client";

import { useState } from "react";
import CategoryFilter from "@/app/components/CategoryFilter";
import SearchBar from "@/app/components/SearchBar";
import StudentCard from "@/app/components/StudentCard";
import { spellingBeeData } from "@/app/constant/data";

export default function CategoryPageClient({ categoryName }) {
  const [search, setSearch] = useState("");

  // normalize for safer comparison
  const filtered = spellingBeeData.filter((item) => {
    return (
      item.category?.trim().toLowerCase() ===
        categoryName?.trim().toLowerCase() &&
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-yellow-800 border-b-2 border-yellow-300 pb-2">
      <span className="animate-bee"> 🐝</span> {categoryName}
      </h1>

      <CategoryFilter />
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No students found</p>
        )}

        {filtered.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            highlight={search.length > 0}
          />
        ))}
      </div>
    </div>
  );
}
