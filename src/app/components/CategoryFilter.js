"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, spellingBeeData } from "../constant/data";

export default function CategoryFilter() {
  const pathname = usePathname(); // get current path
  const totalStudents = spellingBeeData.length;

  // Target counts for each category + "All"
  const categoryTargets = {};
  categories.forEach((cat) => {
    categoryTargets[cat.slug] = spellingBeeData.filter(
      (s) => s.category?.trim().toLowerCase() === cat.name?.trim().toLowerCase()
    ).length;
  });

  // State for animated counts
  const [animatedCounts, setAnimatedCounts] = useState({
    all: 0,
    ...Object.fromEntries(categories.map((cat) => [cat.slug, 0])),
  });

  useEffect(() => {
    const duration = 1000; // total animation time in ms
    const fps = 30; // updates per second
    const intervalTime = Math.floor(duration / fps);
    let step = 0;
    const steps = fps;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedCounts({
        all: Math.round(totalStudents * progress),
        ...Object.fromEntries(
          categories.map((cat) => [
            cat.slug,
            Math.round(categoryTargets[cat.slug] * progress),
          ])
        ),
      });

      if (step >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/all"
        className={`px-3 py-1 border rounded flex items-center gap-2 transition
          ${
            pathname === "/all"
              ? "bg-yellow-300 border-yellow-500"
              : "bg-yellow-100 hover:bg-yellow-200"
          }`}
      >
        All
        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
          {animatedCounts.all}
        </span>
      </Link>

      {categories.map((cat) => {
        const isActive = pathname === `/${cat.slug}`;
        return (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className={`px-3 py-1 border rounded flex items-center gap-2 transition
              ${
                isActive
                  ? "bg-yellow-300 border-yellow-500"
                  : "bg-yellow-50 hover:bg-yellow-200"
              }`}
          >
            {cat.name}
            <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">
              {animatedCounts[cat.slug]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
