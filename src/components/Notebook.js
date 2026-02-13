"use client";
import React, { forwardRef, useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Heart, Music, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- REUSABLE COMPONENTS ---
const CoverPage = forwardRef((props, ref) => (
  <div className="bg-[#f4ecd8] h-full w-full flex flex-col items-center justify-center relative shadow-2xl border-r-4 border-stone-300 rounded-r-md" ref={ref} data-density="hard">
    {props.children}
  </div>
));
CoverPage.displayName = "CoverPage";

const PaperPage = forwardRef((props, ref) => (
  <div className={`bg-[#fdfbf7] h-full w-full flex flex-col relative shadow-inner border border-stone-200 overflow-hidden ${props.className}`} ref={ref}>
    <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none" />
    <div className="relative z-20 h-full flex flex-col items-center justify-center p-8">
      {props.children}
    </div>
  </div>
));
PaperPage.displayName = "PaperPage";

export default function Notebook() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false); // Controls the transition
  const audioRef = useRef(null);

  // Generate 20 random hearts for the floating effect
  const [transitionHearts] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      size: Math.random() * 30 + 15,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 1,
    }))
  );

  useEffect(() => {
    // Show the GIF/Hearts for 3 seconds, then reveal the book
    const timer = setTimeout(() => setIsRevealed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#222] overflow-hidden">
      <audio ref={audioRef} src="/audio/paru-paro.mp3" loop />

      {/* --- CREATIVE TRANSITION LAYER --- */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div 
            key="revealer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#fff5f7]"
          >
            {/* FLOATING HEARTS (Only during transition) */}
            {transitionHearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-rose-300 pointer-events-none"
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                transition={{ 
                  duration: heart.duration, 
                  delay: heart.delay, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ left: heart.left }}
              >
                <Heart size={heart.size} fill="currentColor" />
              </motion.div>
            ))}

            {/* THE GIF AND MESSAGE */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="z-10 flex flex-col items-center"
            >
              <img 
                src="/images/reveal.gif" // Change "reveal.gif" to your actual filename
                className="w-72 h-72 rounded-3xl border-8 border-white shadow-2xl object-cover -rotate-3"
                alt="Cute Surprise"
              />
              <motion.h2 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-8 font-handwriting text-6xl text-rose-500 drop-shadow-md text-center"
              >
                I Love You, Bebe!
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE NOTEBOOK --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="relative flex items-center justify-center p-10 perspective-[1500px]"
      >
        <HTMLFlipBook
          width={450} height={650} size="fixed"
          minWidth={450} maxWidth={450} minHeight={650} maxHeight={650}
          showCover={true} usePortrait={false} flippingTime={1000}
          className="shadow-2xl" style={{ margin: "0 auto" }}
        >
          {/* FRONT COVER */}
          <CoverPage>
              <div className="border-4 border-double border-stone-400/50 p-6 m-4 h-[90%] w-[90%] flex flex-col items-center justify-center bg-[#fffefb]">
                <img src="/images/carnations.png" className="w-48 h-auto mb-8 drop-shadow-lg" alt="Flowers" />
                <h1 className="font-handwriting text-5xl text-stone-700 mb-2">My Valentine</h1>
                <div className="w-16 h-1 bg-rose-300 mb-6" />
                <p className="font-serif text-stone-500 italic text-sm tracking-widest uppercase">For My Favorite Person</p>
              </div>
              <p className="absolute bottom-6 text-xs text-stone-400 font-sans tracking-widest uppercase animate-pulse">Click to Open</p>
          </CoverPage>

          {/* PAGE 1: LEFT INNER COVER */}
          <PaperPage className="rounded-l-sm border-r-0 bg-[#f8f5e6]">
              <div className="h-full flex flex-col items-center justify-center opacity-40">
                 <Heart size={100} className="text-stone-300 mb-4" />
                 <p className="font-handwriting text-2xl text-stone-400">Our Story Begins...</p>
              </div>
          </PaperPage>

          {/* PAGE 2: MUSIC PLAYER */}
          <PaperPage className="rounded-r-sm border-l-0">
              <h3 className="font-handwriting text-3xl text-rose-600 mb-8">Our Song</h3>
              <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                 <motion.div 
                    animate={{ rotate: isPlaying ? 360 : 0 }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full bg-zinc-900 border-4 border-zinc-800 shadow-xl flex items-center justify-center overflow-hidden"
                 >
                    <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center shadow-inner z-10 border-4 border-zinc-900">
                      <Music size={24} className="text-white" />
                    </div>
                 </motion.div>
              </div>
              <button onClick={toggleMusic} className="px-8 py-3 bg-stone-800 text-white rounded-full font-serif text-sm tracking-wide shadow-lg hover:bg-rose-500 transition-all">
                {isPlaying ? "Pause Music" : "Play 'Paru-Paro'"}
              </button>
          </PaperPage>

          {/* PAGE 3: MESSAGE */}
          <PaperPage>
            <div className="text-center p-4">
              <h2 className="font-handwriting text-4xl text-rose-500 mb-6">Dear Bebe,</h2>
              <p className="font-handwriting text-2xl text-stone-600 leading-relaxed">
                Thank you for being the most wonderful part of my life. 
                I cherish every moment with you.
              </p>
              <Heart size={32} className="text-rose-400 mt-8 mx-auto" fill="currentColor" />
            </div>
          </PaperPage>

          {/* PAGE 4: PHOTO */}
          <PaperPage>
             <div className="bg-white p-3 shadow-lg -rotate-2 border border-stone-200">
                <img src="/images/us-photo.jpg" alt="Us" className="w-full h-auto object-cover" />
             </div>
             <p className="mt-8 font-handwriting text-2xl text-stone-500">Captured Moments</p>
          </PaperPage>

          {/* PAGE 5: BACK COVER */}
          <div className="bg-[#f4ecd8] h-full w-full flex items-center justify-center border-l-4 border-stone-300 rounded-l-md shadow-2xl" data-density="hard">
            <span className="font-serif text-stone-400 text-sm tracking-widest uppercase">Forever & Always</span>
          </div>

        </HTMLFlipBook>
      </motion.div>
    </div>
  );
}