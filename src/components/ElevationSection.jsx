import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { elevationImages } from "../data/elevation";

const PLACEHOLDER_COUNT = 4;

export default function ElevationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasImages = elevationImages.length > 0;

  return (
    <section
      id="elevation"
      ref={ref}
      className="relative bg-[#0a0a0a] px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(184,134,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading-accent font-heading text-3xl font-light tracking-wide text-white md:text-4xl"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Elevation Design
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {hasImages ? (
            elevationImages.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden ${elevationImages.length === 1 ? "sm:col-span-2" : ""}`}
              >
                <img
                  src={src}
                  alt={`Churihar Home elevation ${i + 1}`}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))
          ) : (
            Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center border border-white/15 bg-white/[0.03]"
              >
                <span className="font-body text-xs uppercase tracking-widest text-white/30">
                  Coming Soon
                </span>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
