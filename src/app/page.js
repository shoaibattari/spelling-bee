"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, spellingBeeData } from "./constant/data";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const totalStudents = spellingBeeData.length;

  const categoryCount = (categoryName) =>
    spellingBeeData.filter((s) => s.category === categoryName).length;

  // ----------- Animated Counts with SAME SPEED -----------
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedCategoryCounts, setAnimatedCategoryCounts] = useState({});

  useEffect(() => {
    const duration = 1500; // total animation time in ms
    const fps = 30; // updates per second
    const intervalTime = Math.floor(duration / fps);
    let currentStep = 0;
    const steps = fps;

    const categoryTargets = {};
    categories.forEach((cat) => {
      categoryTargets[cat.slug] = categoryCount(cat.name);
    });

    const totalTarget = totalStudents;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedTotal(Math.round(totalTarget * progress));

      const newCounts = {};
      categories.forEach((cat) => {
        newCounts[cat.slug] = Math.round(categoryTargets[cat.slug] * progress);
      });
      setAnimatedCategoryCounts(newCounts);

      if (currentStep >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/all?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-[url('/bg.jpeg')] bg-cover bg-cente bg-no-repeat bg-linear-to-br from-yellow-50 to-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="animate-bee"> 🐝</span> Spelling Bee Competition
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Search students, filter by category & download entry passes
        </p>

        {/* SEARCH */}
        <div className="mt-8 max-w-xl mx-auto flex flex-wrap gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 p-3 border rounded-xl bg-white border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 w-full md:w-fit bg-yellow-500 text-white rounded-xl cursor-pointer hover:bg-yellow-600 transition duration-300"
          >
            Search
          </button>
        </div>

        {/* STATS */}
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <Link
            href="/all"
            className="px-6 py-4 w-full md:w-fit bg-yellow-100 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <p className="text-sm text-gray-700">Total Registrations</p>
            <p className="text-2xl font-bold text-yellow-800">
              {animatedTotal}
            </p>
          </Link>

          {categories.map((cat) => (
            <Link
              href={`/${cat.slug}`}
              key={cat.slug}
              className="px-6 py-4 rounded-xl w-full md:w-fit shadow text-center transition duration-300
                         bg-yellow-200 hover:bg-yellow-300 hover:text-yellow-900 hover:shadow-lg"
            >
              <p className="text-sm font-semibold">{cat.name}</p>
              <p className="text-2xl font-bold">
                {animatedCategoryCounts[cat.slug] || 0}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/all"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white rounded-xl transition"
          >
            View All Students
          </Link>

          <Link
            href={`/${categories[0].slug}`}
            className="px-6 py-3 border bg-white border-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-white transition cursor-pointer"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          Competition Categories
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="p-6 rounded-2xl border shadow hover:shadow-lg
                         bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
                         transition text-center text-white"
            >
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-xl font-bold mt-2">
                {animatedCategoryCounts[cat.slug] || 0} Students
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-sm bg-black text-gray-50">
        <p>
          App Created:{" "}
          <a
            className="font-semibold underline"
            href="https://wa.me/+923313416850"
            target="_blank"
          >
            Shoaib Abdul Sattar Khosa{" "}
          </a>
        </p>
        <p>© {new Date().getFullYear()} Spelling Bee Competition</p>
      </footer>
    </div>
  );
}
