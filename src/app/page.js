"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "../components/Intro"; 
import Notebook from "../components/Notebook";

export default function Home() {
  const [showNotebook, setShowNotebook] = useState(false);

  return (
    <main className="bg-[#222] min-h-screen w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!showNotebook ? (
          <Intro 
            key="intro-screen" 
            onComplete={() => setShowNotebook(true)} 
          />
        ) : (
          <motion.div
            key="notebook-screen"
            className="w-full h-full flex items-center justify-center"
            initial={{ 
              clipPath: "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')",
              scale: 0 
            }}
            animate={{ 
              clipPath: "circle(150% at 50% 50%)", 
              scale: 1 
            }}
            transition={{ 
              duration: 1.5, 
              ease: [0.4, 0, 0.2, 1] 
            }}
          >
            {/* You can swap this out for a specific GIF if you prefer */}
            <Notebook />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}