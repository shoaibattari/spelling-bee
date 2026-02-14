"use client";

import { useState, useEffect } from "react";
import { useBeeData } from "@/hooks/useBeeData";
import { INITIAL_DATA } from "../constant/participantsData";
import Image from "next/image";

export default function Admin() {
  const [participants, setParticipants] = useBeeData();
  const [selectedCategory, setSelectedCategory] = useState("Junior Bee");

  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTimerId, setActiveTimerId] = useState(null);

  const categories = ["Junior Bee", "Rising Bee", "Skilled Bee", "Master Bee"];

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const startTimer = (id) => {
    setActiveTimerId(id);
    setTimeLeft(60);
    setIsTimerRunning(true);
  };

  const handleScore = (id, round, qIdx, type) => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const newRound = [...p[round]];
        newRound[qIdx] = newRound[qIdx] === type ? null : type;

        const updated = { ...p, [round]: newRound };

        let score = 0;
        ["r1", "r2", "r3"].forEach((r) => {
          updated[r].forEach((q) => {
            if (q === "C") score += 2;
            if (q === "W") score -= 1;
          });
        });

        return { ...updated, total: score };
      })
    );
  };
  if (!participants || participants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-10 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">
            Data Not Found
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            System mein koi participants nahi hain. Shuru karne ke liye initial
            data load karein.
          </p>
          <button
            onClick={() => setParticipants(INITIAL_DATA)}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-yellow-500/10 active:scale-95"
          >
            Load Participants Data
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 py-4 px-5 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/omj-logo.png"
                width={44}
                height={44}
                alt="OMJ"
                className="rounded-full bg-white p-1"
              />
              <h1 className="text-xl font-bold uppercase tracking-wide">
                Spelling Bee <span className="text-yellow-400">Admin</span>
              </h1>
            </div>

            <button
              onClick={() =>
                confirm("Reset all scores?") && setParticipants(INITIAL_DATA)
              }
              className="bg-red-900/70 hover:bg-red-800 px-5 py-2 rounded-lg text-sm font-medium border border-red-700/50 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        </header>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center sm:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors
                ${
                  selectedCategory === cat
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Participants */}
        <div className="space-y-8">
          {participants
            .filter((p) => p.category === selectedCategory)
            .map((p) => (
              <div
                key={p.id}
                className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden"
              >
                {/* Participant header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 border-b border-gray-800">
                  <h2 className="text-base sm:text-3xl font-bold uppercase tracking-tight">
                    {p.name}
                  </h2>

                  <div className="flex items-center gap-5 flex-wrap">
                    <div
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border font-mono font-bold text-lg ${
                        activeTimerId === p.id && timeLeft <= 10
                          ? "bg-red-950 border-red-700 text-red-300"
                          : "bg-gray-950 border-gray-700"
                      }`}
                    >
                      <span className="w-12 text-center">
                        {activeTimerId === p.id ? timeLeft : 60}s
                      </span>
                      <button
                        onClick={() =>
                          isTimerRunning && activeTimerId === p.id
                            ? setIsTimerRunning(false)
                            : startTimer(p.id)
                        }
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1.5 rounded text-xs font-bold uppercase cursor-pointer"
                      >
                        {isTimerRunning && activeTimerId === p.id
                          ? "STOP"
                          : "START"}
                      </button>
                    </div>

                    <div className="bg-gray-950 px-5 py-2.5 rounded-lg border border-yellow-900/40 min-w-[90px] text-center">
                      <div className="text-xs text-yellow-500/70 uppercase tracking-wide">
                        Points
                      </div>
                      <div className="text-3xl font-bold text-yellow-400 font-mono">
                        {p.total}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rounds grid */}
                <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Round 1 */}
                  <div className="bg-gray-950/50 p-4 rounded-lg border border-gray-800">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-3 pb-2 border-b border-gray-800">
                      Round 01
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-2.5">
                      {p.r1.map((val, i) => (
                        <ScoreButton
                          key={i}
                          num={i + 1}
                          val={val}
                          onC={() => handleScore(p.id, "r1", i, "C")}
                          onW={() => handleScore(p.id, "r1", i, "W")}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Round 2 */}
                  <div className="bg-gray-950/50 p-4 rounded-lg border border-gray-800">
                    <div className="text-xs font-bold text-blue-400/80 uppercase mb-3 pb-2 border-b border-gray-800">
                      Round 02
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-2.5">
                      {p.r2.map((val, i) => (
                        <ScoreButton
                          key={i}
                          num={i + 1}
                          val={val}
                          onC={() => handleScore(p.id, "r2", i, "C")}
                          onW={() => handleScore(p.id, "r2", i, "W")}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rapid Fire */}
                  <div className="lg:col-span-2 bg-gray-950/60 p-4 rounded-lg border border-orange-900/30">
                    <div className="text-xs font-bold text-orange-400 uppercase mb-3 pb-2 border-b border-orange-900/20 flex items-center gap-2">
                      <span>⚡ Rapid Fire</span>
                      <span className="text-orange-300/70 text-xs">
                        (50 Questions)
                      </span>
                    </div>
                    <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 xl:grid-cols-24 gap-2.5">
                      {p.r3.map((val, i) => (
                        <ScoreButton
                          key={i}
                          num={i + 1}
                          val={val}
                          onC={() => handleScore(p.id, "r3", i, "C")}
                          onW={() => handleScore(p.id, "r3", i, "W")}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function ScoreButton({ num, val, onC, onW }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[8px] font-bold text-gray-600 font-mono">
        {num}
      </span>
      <div className="flex flex-col gap-1 p-1 bg-black/60 rounded-lg border border-gray-800">
        <button
          onClick={onC}
          className={`w-7 h-6 rounded-md transition-all cursor-pointer flex items-center justify-center ${
            val === "C"
              ? "bg-green-500 shadow-lg shadow-green-500/40"
              : "bg-gray-800 hover:bg-green-900"
          }`}
        >
          <span className="text-[10px] font-bold text-white">
            {val === "C" ? "✓" : ""}
          </span>
        </button>
        <button
          onClick={onW}
          className={`w-7 h-6 rounded-md transition-all cursor-pointer flex items-center justify-center ${
            val === "W"
              ? "bg-red-500 shadow-lg shadow-red-500/40"
              : "bg-gray-800 hover:bg-red-900"
          }`}
        >
          <span className="text-[10px] font-bold text-white">
            {val === "W" ? "✕" : ""}
          </span>
        </button>
      </div>
    </div>
  );
}
