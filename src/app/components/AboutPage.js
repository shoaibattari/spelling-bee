"use client";

import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[url('/bg.jpeg')] bg-cover bg-no-repeat bg-center p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-700 transition"
          aria-label="Go back"
        >
          <FiArrowLeft className="text-white text-2xl" />
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-800 flex items-center gap-2">
          <span className="animate-bee">🐝</span> About
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-200">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          Welcome to the Spelling Bee Competition!
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          The Spelling Bee Competition is organized by{" "}
          <strong className="text-yellow-500">Okhai Memon Jamat (OMJ) </strong>
          in collaboration with{" "}
          <strong className="text-yellow-500">
            Okhai Memon Youth Services (OMYS)
          </strong>
          . This initiative aims to promote literacy, learning, and healthy
          competition among students.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Participants can register for different categories, explore rules, and
          download their entry passes. Our goal is to create an engaging
          platform where students can improve their spelling skills while having
          fun.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We thank all the volunteers, coordinators, and sponsors who make this
          event possible.
        </p>

        {/* CTA */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            onClick={() => router.push("/all")}
            className="px-6 py-3 bg-yellow-500 w-full md:w-fit hover:bg-yellow-600 text-white rounded-xl transition"
          >
            View All Students
          </button>
          <button
            onClick={() => router.push("/rules")}
            className="px-6 py-3 border bg-white  w-full md:w-fit border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl transition"
          >
            View Rules
          </button>
        </div>
      </div>
    </div>
  );
}
