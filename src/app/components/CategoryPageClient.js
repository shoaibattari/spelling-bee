"use client";

import { useState, useEffect, useRef } from "react";
import CategoryFilter from "@/app/components/CategoryFilter";
import SearchBar from "@/app/components/SearchBar";
import StudentCard from "@/app/components/StudentCard";
import { spellingBeeData } from "@/app/constant/data";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 9;

export default function CategoryPageClient({ categoryName }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef(null);
  const router = useRouter();

  // reset pagination on search or category change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, categoryName]);

  // normalize & filter
  const filtered = spellingBeeData.filter((item) => {
    return (
      item.category?.trim().toLowerCase() ===
        categoryName?.trim().toLowerCase() &&
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  });

  // 👀 Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, []);

  const visibleStudents = filtered.slice(0, visibleCount);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-yellow-800 border-b-4 border-yellow-500 pb-2 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full bg-yellow-500 hover:bg-yellow-700 cursor-pointer transition"
          aria-label="Go back"
        >
          <FiArrowLeft className="text-2xl text-yellow-50" />
        </button>
        <span className="animate-bee"> 🐝</span> {categoryName}
      </h1>

      <CategoryFilter />
      <SearchBar value={search} onChange={setSearch} />

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No students found</p>
      )}

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {visibleStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            highlight={search.length > 0}
          />
        ))}
      </div>

      {/* 🔄 Scroll Loader */}
      {visibleCount < filtered.length && (
        <div ref={loaderRef} className="flex justify-center py-6 text-gray-500">
          Loading more students...
        </div>
      )}
    </div>
  );
}
