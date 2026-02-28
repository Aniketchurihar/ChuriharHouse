import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete, isVisible }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="overflow-hidden text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center">
              {"CHURIHAR HOUSE".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-3xl font-light tracking-[0.3em] text-[#fafaf9] md:text-5xl md:tracking-[0.5em]"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + i * 0.05,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="mx-auto mt-8 h-px w-32 bg-[#b8860b]/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 -z-10 bg-[#0a0a0a]"
            initial={{ y: "0%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
