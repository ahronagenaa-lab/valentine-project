"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onComplete }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%", 
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 8,        
      size: Math.random() * 20 + 15,   
      rotation: Math.random() * 360,
      sway: Math.random() * 100 - 50,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <motion.div 
      // This exit animation makes the transition feel deliberate and smooth
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-[#fff5f7]"
    >
      {/* --- FLOATING PETALS --- */}
      {petals.map((petal) => (
        <motion.img
          key={petal.id}
          src="/images/petal.png"
          alt="petal"
          className="absolute pointer-events-none z-0"
          style={{ width: petal.size, left: petal.left, top: "-10%" }}
          initial={{ y: -50, opacity: 0, rotate: petal.rotation }}
          animate={{ 
            y: "110vh", 
            opacity: [0, 1, 1, 0], 
            rotate: petal.rotation + 720,
            x: [0, petal.sway, 0] 
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose-400 mb-6"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-8xl font-handwriting text-rose-600 text-center drop-shadow-sm"
        >
          Happy Valentine's Day, Bebe!
        </motion.h1>

        <motion.p
          className="mt-6 text-rose-400 font-serif italic text-lg md:text-xl tracking-wide"
        >
          I made something special for you...
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#e11d48" }}
          whileTap={{ scale: 0.9 }}
          onClick={onComplete}
          className="mt-16 px-12 py-4 bg-rose-500 text-white rounded-full font-serif italic text-2xl shadow-2xl transition-all cursor-pointer flex items-center gap-4"
        >
          Open My Heart ❤️
        </motion.button>
      </div>
    </motion.div>
  );
}