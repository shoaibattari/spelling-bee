"use client";

import { AiOutlineCloseCircle } from "react-icons/ai"; // optional: install react-icons
// If you don’t want react-icons, you can use a plain Unicode "×" character.

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pr-10 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-red-400 hover:text-red-600"
        >
          {/* If using react-icons */}
          <AiOutlineCloseCircle size={20} />

          {/* Or plain X without library */}
          {/* <span className="text-lg font-bold">×</span> */}
        </button>
      )}
    </div>
  );
}
