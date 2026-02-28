import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { features, stats } from "../data/features";

function AnimatedCounter({ end, suffix, isInView }) {
  const [displayCount, setDisplayCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || typeof end !== "number") return;
    hasAnimated.current = true;

    const duration = 2000;
    const start = performance.now();
    let rafId = null;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(end * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [isInView, end]);

  const isDecimal = typeof end === "number" && end % 1 !== 0;
  const displayValue = isDecimal
    ? Number(displayCount).toFixed(1)
    : Math.floor(displayCount);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative bg-[#fafaf9] px-6 py-20 lg:px-8 lg:py-28"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading-accent font-heading text-3xl font-light tracking-wide text-[#1a1a1a] md:text-4xl"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Features & Specifications
        </motion.h2>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-8 border-b border-[#e5e5e5] pb-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.key} className="flex flex-col">
              <span
                className="font-heading text-4xl font-light text-[#b8860b] md:text-5xl"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} isInView={isInView} />
              </span>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex flex-col border border-[#e5e5e5] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4d4d4] hover:shadow-xl"
            >
              <feature.icon
                className="h-8 w-8 text-[#b8860b]"
                aria-hidden
              />
              <h3 className="mt-6 font-heading text-xl font-medium text-[#1a1a1a]">
                {feature.title}
              </h3>
              <p className="mt-3 font-body text-sm text-[#6b7280] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
