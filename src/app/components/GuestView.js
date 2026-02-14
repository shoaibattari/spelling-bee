"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBeeData } from "@/hooks/useBeeData";
import Image from "next/image";

export default function GuestView() {
  const [participants] = useBeeData();
  const [selectedCategory, setSelectedCategory] = useState("Junior Bee");

  const categories = ["Junior Bee", "Rising Bee", "Skilled Bee", "Master Bee"];

  const filteredSorted = participants
    .filter((p) => p.category === selectedCategory)
    .sort((a, b) => b.total - a.total);

  const hasStarted =
    filteredSorted.length > 0 && filteredSorted.some((p) => p.total > 0);

  return (
    <main className="min-h-screen bg-[#0f172a] p-3 md:p-10 text-white relative overflow-hidden font-sans select-none">
      {/* Honeycomb Background Influence */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='60' viewBox='0 0 52 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26 0l26 15v30L26 60 0 45V15z' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: "80px",
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Branding Section */}
        <div className="flex justify-between items-center mb-10 px-4 opacity-80">
          <Image
            src="/omj-logo.png"
            width={60}
            height={60}
            alt="OMJ"
            className="drop-shadow-lg"
          />
          <div className="text-center">
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
              The Okhai Memon Jamat & OMYS Presents
            </p>
            <div className="h-0.5 w-20 bg-yellow-600 mx-auto"></div>
          </div>
          <Image
            src="/omys-logo.png"
            width={60}
            height={60}
            alt="OMYS"
            className="drop-shadow-lg"
          />
        </div>

        {/* Hero Title */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl md:text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-tighter leading-none"
          >
            SPELLING BEE
          </motion.h1>
          <p className="text-white/60 font-bold text-sm md:text-xl uppercase tracking-[0.5em] mt-2">
            GRAND FINALE 2026
          </p>
        </div>

        {/* Category Tabs - Styled like Poster Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-black transition-all duration-300 text-[11px] uppercase tracking-widest border-2 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-b from-yellow-400 to-yellow-600 text-black border-yellow-200 shadow-[0_10px_25px_rgba(234,179,8,0.4)] scale-105"
                  : "bg-slate-900/80 text-slate-400 border-slate-800 backdrop-blur-md hover:border-yellow-600/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scoreboard */}
        <div className="space-y-4 px-2 max-w-4xl mx-auto min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {!hasStarted ? (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-2 text-center bg-[#1e293b]/40 border-2 border-dashed border-slate-800 rounded-[3rem] backdrop-blur-sm"
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="mb-8"
                >
                  <Image
                    src={"/bee.png"}
                    width={160}
                    height={160}
                    alt="bee"
                    className="drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]"
                  />
                </motion.div>
                <h2 className="text-3xl font-black text-yellow-500 uppercase italic tracking-tighter">
                  Ready to Buzz?
                </h2>
                <p className="text-slate-500 text-xs mt-3 font-bold uppercase tracking-[0.3em]">
                  Competition about to start...
                </p>
              </motion.div>
            ) : (
              filteredSorted.map((p, index) => (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative flex items-center justify-between p-5 md:p-8 rounded-[2rem] border-2 transition-all ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-600/30 via-slate-900 to-slate-900 border-yellow-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                      : "bg-[#1e293b]/60 border-slate-800/80 backdrop-blur-md"
                  }`}
                >
                  {/* Participant Info */}
                  <div className="flex items-center gap-5 md:gap-10 min-w-0">
                    <div className="flex flex-col items-center">
                      <span
                        className={`text-2xl md:text-5xl font-black italic ${
                          index === 0
                            ? "text-yellow-500"
                            : index === 1
                            ? "text-slate-300"
                            : index === 2
                            ? "text-orange-400"
                            : "text-slate-700"
                        }`}
                      >
                        {index === 0 ? "🏆" : `#${index + 1}`}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={`font-black text-base md:text-2xl uppercase tracking-tighter ${
                          index === 0 ? "text-white" : "text-slate-200"
                        }`}
                      >
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0
                              ? "bg-yellow-500 animate-pulse"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest italic">
                          {index === 0 ? "Leading the Hive" : "Contender"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Score */}
                  <motion.div
                    key={p.total}
                    initial={{ scale: 1.5, filter: "brightness(2)" }}
                    animate={{ scale: 1, filter: "brightness(1)" }}
                    className={`text-3xl md:text-6xl font-black font-mono drop-shadow-2xl ${
                      index === 0 ? "text-yellow-500" : "text-white"
                    }`}
                  >
                    {p.total}
                  </motion.div>

                  {/* Top Rank Decorative Bar */}
                  {index === 0 && (
                    <div className="absolute top-0 right-20 bottom-0 w-32 bg-yellow-500/5 skew-x-12 pointer-events-none"></div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
