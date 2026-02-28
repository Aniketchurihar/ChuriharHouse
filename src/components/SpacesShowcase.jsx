import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { spaces } from "../data/spaces";
import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const floorOrder = ["Ground", "First", "Highlight", "Second"];

export default function SpacesShowcase() {
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spacesByFloor = floorOrder.map((floor) => ({
    floor,
    items:
      floor === "Highlight"
        ? spaces.filter((s) => s.floor === "Highlight" || s.designHighlight === true)
        : spaces.filter((s) => s.floor === floor),
  }));

  const openModal = (space) => {
    setSelectedSpace(space);
    setSlideIndex(0);
  };

  const closeModal = () => setSelectedSpace(null);

  const goPrev = () => {
    if (!selectedSpace) return;
    setSlideIndex((i) => (i <= 0 ? selectedSpace.images.length - 1 : i - 1));
  };

  const goNext = () => {
    if (!selectedSpace) return;
    setSlideIndex((i) => (i >= selectedSpace.images.length - 1 ? 0 : i + 1));
  };

  return (
    <section
      id="floor-plan"
      ref={ref}
      className="border-t border-[#e5e5e5] bg-[#0a0a0a] px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading-accent font-heading text-3xl font-light tracking-wide text-white md:text-4xl"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Explore Our Spaces
        </motion.h2>

        {spacesByFloor.map(
          (group, gi) =>
            group.items.length > 0 && (
              <motion.div
                key={group.floor}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * gi }}
                className="mt-16 first:mt-16"
              >
                <h3
                  className={`mb-8 font-heading text-xl font-medium tracking-wide ${
                    group.floor === "Highlight" ? "text-[#b8860b]" : "text-white/80"
                  }`}
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {group.floor === "Highlight"
                    ? "Design Highlight"
                    : `${group.floor} Floor`}
                </h3>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((space, i) => (
                    <motion.button
                      key={space.id}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      onClick={() => openModal(space)}
                      className="group w-full overflow-hidden border border-white/10 bg-white/5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={space.images[0].src}
                          alt={space.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <h4
                          className="absolute bottom-0 left-0 right-0 p-4 font-heading text-lg font-medium text-white"
                          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                        >
                          {space.name}
                        </h4>
                      </div>
                      <p className="p-4 font-body text-sm text-white/70">
                        {space.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )
        )}
      </div>

      {/* Expand modal with image slider */}
      <AnimatePresence>
        {selectedSpace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-[#1a1a1a] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/60 text-white transition-colors hover:bg-[#b8860b] hover:border-[#b8860b]"
                aria-label="Close"
              >
                <FaXmark className="h-5 w-5" />
              </button>

              {/* Image slider */}
              <div className="relative aspect-video shrink-0 overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slideIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={selectedSpace.images[slideIndex].src}
                    alt={`${selectedSpace.name} - ${selectedSpace.images[slideIndex].caption}`}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* Prev / Next */}
                {selectedSpace.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/50 text-white transition-colors hover:bg-[#b8860b] hover:border-[#b8860b]"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/50 text-white transition-colors hover:bg-[#b8860b] hover:border-[#b8860b]"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Slide counter */}
                <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 font-body text-xs text-white/90">
                  {slideIndex + 1} / {selectedSpace.images.length}
                </div>
              </div>

              {/* Info around the image */}
              <div className="flex flex-1 flex-col overflow-y-auto p-6 lg:p-8">
                <span className="font-body text-xs uppercase tracking-widest text-[#b8860b]">
                  {selectedSpace.floor} Floor
                </span>
                <h3
                  className="mt-2 font-heading text-2xl font-medium text-white"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {selectedSpace.name}
                </h3>
                <p className="mt-2 font-body text-sm font-medium text-white/90">
                  {selectedSpace.images[slideIndex].caption}
                </p>
                <p className="mt-3 font-body text-white/70 leading-relaxed">
                  {selectedSpace.images[slideIndex].info}
                </p>
                <p className="mt-4 border-t border-white/10 pt-4 font-body text-sm text-white/60">
                  {selectedSpace.description}
                </p>

                {/* Dots */}
                {selectedSpace.images.length > 1 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedSpace.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlideIndex(i)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          i === slideIndex ? "bg-[#b8860b]" : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
