import { useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { photos, categories } from "../data/photos";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const categoryLabels = {
  all: "All",
  exterior: "Exterior",
  elevation: "Elevation",
  "ground-floor": "Ground Floor",
  "first-floor": "First Floor",
  "second-floor": "Second Floor",
  stairs: "Stairs",
  gardens: "Gardens",
};

const IMAGES_PER_PAGE = 6;

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("exterior");
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredPhotos.length / IMAGES_PER_PAGE);
  const visiblePhotos = useMemo(
    () =>
      filteredPhotos.slice(
        currentPage * IMAGES_PER_PAGE,
        (currentPage + 1) * IMAGES_PER_PAGE
      ),
    [filteredPhotos, currentPage]
  );

  const lightboxSlides = filteredPhotos.map(({ src, caption }) => ({
    src,
    title: caption,
  }));

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(0);
  };

  const openLightboxAt = (indexInVisible) => {
    const globalIndex = currentPage * IMAGES_PER_PAGE + indexInVisible;
    setLightboxIndex(globalIndex);
  };

  return (
    <section
      id="gallery"
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
          Gallery
        </motion.h2>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`min-h-[44px] rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1a1a1a] text-white shadow-md"
                  : "bg-white text-[#1a1a1a] hover:bg-[#f5f5f4] border border-[#e5e5e5] hover:border-[#d4d4d4]"
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </motion.div>

        {/* Compact grid - max 6 images visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative mt-12"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {visiblePhotos.map((photo, i) => (
              <button
                key={`${photo.src}-${i}`}
                type="button"
                onClick={() => openLightboxAt(i)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#e5e5e5] ring-1 ring-black/5 transition-shadow duration-300 hover:ring-[#b8860b]/30 hover:shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </button>
            ))}
          </div>

          {/* Carousel navigation */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:hover:text-[#1a1a1a]"
                aria-label="Previous"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-body text-sm text-[#6b7280]">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={currentPage >= totalPages - 1}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:hover:text-[#1a1a1a]"
                aria-label="Next"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </section>
  );
}
