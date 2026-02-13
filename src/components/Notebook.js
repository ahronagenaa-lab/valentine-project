"use client";
import React, { forwardRef, useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Heart, Music, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- REUSABLE COMPONENTS ---
const CoverPage = forwardRef((props, ref) => (
  <div 
    className={`bg-[#f4ecd8] h-full w-full flex flex-col items-center justify-center relative shadow-2xl border-stone-300 ${props.className}`} 
    ref={ref} 
    data-density="hard"
  >
    {props.children}
  </div>
));
CoverPage.displayName = "CoverPage";

const PaperPage = forwardRef((props, ref) => (
  <div 
    className={`bg-[#fdfbf7] h-full w-full flex flex-col relative shadow-inner border border-stone-200 overflow-hidden ${props.className}`} 
    ref={ref}
  >
    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none" />
    <div className="relative z-20 h-full flex flex-col items-center justify-center p-10">
      {props.children}
    </div>
  </div>
));
PaperPage.displayName = "PaperPage";

export default function Notebook() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const audioRef = useRef(null);

  const [transitionHearts] = useState(() => 
    Array.from({ length: 30 }).map((_, i) => ({ 
      id: i,
      left: Math.random() * 100 + "%",
      size: Math.random() * 40 + 20,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 1,
    }))
  );

  useEffect(() => {
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
    <div className="relative flex justify-center items-center min-h-screen bg-[#1a1a1a] overflow-hidden p-4">
      <audio ref={audioRef} src="/audio/paru-paro.mp3" loop />

      {/* --- INTRO TRANSITION --- */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div 
            key="revealer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#fff5f7]"
          >
            {transitionHearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-rose-300 pointer-events-none"
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "linear" }}
                style={{ left: heart.left }}
              >
                <Heart size={heart.size} fill="currentColor" />
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="z-10 flex flex-col items-center"
            >
              <img 
                src="/images/reveal.gif" 
                className="w-96 h-96 rounded-3xl border-8 border-white shadow-2xl object-cover -rotate-3"
                alt="Cute Surprise"
              />
              <motion.h2 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-10 font-handwriting text-7xl text-rose-500 drop-shadow-md text-center"
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
        className="relative flex items-center justify-center perspective-[2000px] w-full max-w-[1200px]"
      >
        <HTMLFlipBook
          width={550} height={800} 
          size="stretch"
          minWidth={400} maxWidth={600} minHeight={600} maxHeight={850}
          showCover={true} usePortrait={false} flippingTime={1000}
          className="shadow-2xl" style={{ margin: "0 auto" }}
        >
          {/* FRONT COVER */}
          <CoverPage className="rounded-r-xl border-r-8">
              <div className="border-8 border-double border-stone-400/50 p-10 m-6 h-[92%] w-[90%] flex flex-col items-center justify-center bg-[#fffefb]">
                <img src="/images/carnations.png" className="w-64 h-auto mb-6 drop-shadow-lg" alt="Flowers" />
                <div className="flex flex-col items-center text-center">
                  <h1 className="font-handwriting text-4xl text-stone-700 mb-2 leading-tight">
                    My Valentine, Bebe, Bebi, Beybi, KC, Biyaya
                  </h1>
                  <div className="w-24 h-1.5 bg-rose-300 mb-4" />
                  <p className="font-serif text-stone-500 italic text-base tracking-[0.2em] uppercase">
                    For My Favorite Person
                  </p>
                </div>
              </div>
          </CoverPage>

          {/* PAGE 1: LEFT INNER COVER */}
          <PaperPage className="rounded-l-sm border-r-0 bg-[#f8f5e6]">
              <div className="h-full flex flex-col items-center justify-center text-center p-10">
                 <Heart size={80} className="text-rose-300 mb-8" fill="currentColor" />
                 <p className="font-handwriting text-4xl text-stone-600 leading-relaxed px-4">
                   "Naaalala kita sa kantang ito, sana pakinggan mo"
                 </p>
              </div>
          </PaperPage>

          {/* PAGE 2: MUSIC PLAYER */}
          <PaperPage className="rounded-r-sm border-l-0">
              <h3 className="font-handwriting text-3xl text-stone-600 mb-8 text-center px-4">
                Paru-paro by IV of Spades
              </h3>
              <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                 <motion.div 
                    animate={{ rotate: isPlaying ? 360 : 0 }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full bg-zinc-900 border-8 border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden"
                 >
                    <div className="w-24 h-24 bg-rose-400 rounded-full flex items-center justify-center shadow-inner z-10 border-8 border-zinc-900">
                      <Music size={40} className="text-white" />
                    </div>
                 </motion.div>
              </div>
              <button onClick={toggleMusic} className="px-12 py-5 bg-stone-800 text-white rounded-full font-serif text-lg tracking-widest shadow-xl hover:bg-rose-500 transition-all active:scale-95">
                {isPlaying ? "Pause Music" : "Play Music"}
              </button>
          </PaperPage>

          {/* PAGE 3: THE LETTER */}
          <PaperPage>
            <div className="text-left p-4 overflow-y-auto h-full scrollbar-hide">
              <h2 className="font-handwriting text-3xl text-rose-500 mb-4">Hi Bebe,</h2>
              <p className="font-handwriting text-[1.25rem] text-stone-700 leading-[1.6]">
                Happy Valentine's Day, Bebe! I hope you know that I love you with all my heart. 
                As much as I want to celebrate this day with you, I know that you are busy din sa school works. 
                Naiintindihan ko 'yun, bebe kaya sana huwag mong isipin na mapapalayo ang loob ko kapag hindi tayo nagkakausap kasi hindi 'yun mangyayari, okiii? 
                <br /><br />
                I may not be there with you pero sana naaabot ka ng pagmamahal ko mula dine sa Sta. Maria hehehe. 
                I also want to say na super swerte ko na nakilala kita kasi you make me feel loved, seen and valued and that's enough for me, my Biyaya (Blessing from the root word Bea). 
                Huhuys alam kong kuya Kim na naman pero yaena wala e mahal kita HAHAHAHAHAHA. 
                <br /><br />
                I just hope that we get through this rough patch sa buhay natin and maipagpatuloy itong namamagitan sa'tin. 
                I may not be able to give you something tangible rn, but my heart belongs to you and only you. I love you very much, bebe!
                <br /><br />
                Happy Valentine's Day ulit, my Bebe! Miss na miss na kita.
                <br /><br />
                Yours truly,
                <br />
                Ahron
              </p>
            </div>
          </PaperPage>

          {/* PAGE 4: PHOTO AND CAPTION */}
          <PaperPage>
             <div className="bg-white p-4 shadow-2xl -rotate-1 border border-stone-200 w-[90%] mb-6 mt-8">
                <img src="/images/us-photo.jpg" alt="Us" className="w-full h-auto object-cover max-h-[450px]" />
             </div>
             <div className="text-center px-6">
                <p className="font-handwriting text-[1.2rem] text-stone-600 leading-snug">
                  I love this picture of us so much, bebe! I miss you very much
                </p>
                <Heart size={32} className="text-rose-400 mt-4 mx-auto" fill="currentColor" />
             </div>
          </PaperPage>

          {/* PAGE 5: BACK COVER */}
          <CoverPage className="rounded-l-xl border-l-8">
            <div className="flex flex-col items-center">
              <Heart size={60} className="text-stone-300 mb-6" />
            </div>
          </CoverPage>

        </HTMLFlipBook>
      </motion.div>
    </div>
  );
}