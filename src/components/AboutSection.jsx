import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const aboutImage =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-[#e5e5e5] bg-[#fafaf9]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <h2
            className="section-heading-accent font-heading text-3xl font-light tracking-wide text-[#1a1a1a] md:text-4xl"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            About
          </h2>
          <p className="mt-8 font-body text-[#6b7280] leading-[1.75]">
            Three floors: ground floor hall, mini theatre, garden; first floor
            double-height hall, bedrooms with balconies; terrace garden, gazebo,
            sunset viewpoint on the second floor.
          </p>
          <p className="mt-5 font-body text-[#6b7280] leading-[1.75]">
            Floating staircase connecting all levels. Pooja room, home office,
            and guest rooms complete the layout.
          </p>
        </motion.div>

        {/* Image with clip-path reveal */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={
            isInView
              ? { clipPath: "inset(0 0% 0 0)" }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 aspect-[4/3] overflow-hidden lg:order-2"
        >
          <img
            src={aboutImage}
            alt="Churihar House interior"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px w-full bg-[#e5e5e5]" aria-hidden />
      </div>
    </section>
  );
}
