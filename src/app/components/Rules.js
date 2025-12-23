"use client";

import Image from "next/image";
import { rules } from "@/app/constant/data";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const Rules = () => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-800 border-b-4 border-yellow-500 pb-2 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full bg-yellow-500 hover:bg-yellow-700 transition"
          aria-label="Go back"
        >
          <FiArrowLeft className="text-2xl text-yellow-50" />
        </button>
        Spelling Bee Rules
        <span className="animate-bee">🐝</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.slug}
            className="p-4 rounded-xl border shadow-sm relative transition-all duration-300
              flex flex-col justify-between h-full
              bg-yellow-100 border-yellow-400 hover:bg-yellow-200 hover:shadow-lg"
          >
            {/* Title */}
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2 text-yellow-800">
              <span className="animate-bee">🐝</span> {rule.name}
            </h2>

            {/* Image */}
            <div className="relative w-full h-80 md:h-155 rounded-lg overflow-hidden mb-3 border">
              <Image
                src={rule.image}
                alt={rule.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Button */}
            <button
              onClick={() => router.push(`/${rule.slug}`)}
              className="mt-2 w-full bg-yellow-600 text-white py-2 rounded-lg cursor-pointer
                         hover:bg-yellow-700 hover:scale-105 transition-all duration-300"
            >
              Get Your Entry Pass
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
