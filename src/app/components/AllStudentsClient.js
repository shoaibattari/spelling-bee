"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { spellingBeeData } from "../constant/data";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import StudentCard from "../components/StudentCard";

export default function AllStudentsClient() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(querySearch);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  const filtered = spellingBeeData.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-yellow-800 border-b-2 border-yellow-300 pb-2 flex items-center gap-2">
        <span className="animate-bee">🐝</span> Spelling Bee – All Students
      </h1>

      <CategoryFilter />
      <SearchBar value={search} onChange={setSearch} />

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No students found</p>
      )}

      <div className="grid md:grid-cols-3 gap-4 mt-4">
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
