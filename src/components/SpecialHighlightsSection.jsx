import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  {
    id: "stairs",
    name: "Floating Stairs",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    description: "Floating staircase connecting all three levels.",
  },
  {
    id: "double-height-hall",
    name: "Double Height Hall",
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    description: "Double-height living space with natural light.",
  },
  {
    id: "gazebo",
    name: "Gazebo",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    description: "Outdoor gazebo on the second floor with terrace garden access.",
  },
];

export default function SpecialHighlightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="highlights"
      ref={ref}
      className="bg-[#fafaf9] px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading-accent font-heading text-3xl font-light tracking-wide text-[#1a1a1a] md:text-4xl"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Special Highlights
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="overflow-hidden border border-[#e5e5e5] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <h3
                  className="absolute bottom-4 left-4 right-4 font-heading text-xl font-medium text-white"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {item.name}
                </h3>
              </div>
              <p className="p-6 font-body text-sm text-[#6b7280] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
