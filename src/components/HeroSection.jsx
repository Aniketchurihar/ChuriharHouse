import { useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

const heroImage =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80";

export default function HeroSection() {
  const imageRef = useRef(null);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with Ken Burns effect */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 15, ease: "linear" }}
      >
        <img
          src={heroImage}
          alt="Churihar House exterior"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/75"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {siteConfig.houseName.toUpperCase().split(" ").map((word, i) => (
            <motion.h1
              key={i}
              variants={{
                hidden: { y: 60, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-heading text-5xl font-light tracking-[0.2em] text-white md:text-7xl md:tracking-[0.3em] lg:text-8xl"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              {word}
            </motion.h1>
          ))}
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 font-body text-base font-light tracking-widest text-white/90 md:text-lg"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-block border border-white/70 px-10 py-3.5 text-sm font-medium tracking-[0.25em] text-white transition-all duration-300 hover:border-[#b8860b] hover:bg-[#b8860b]/25 hover:shadow-[0_0_30px_rgba(184,134,11,0.2)]"
        >
          TAKE A TOUR
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-white/70">
          <span className="block h-12 w-px bg-white/50" />
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-xs uppercase tracking-widest"
          >
            Scroll
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
