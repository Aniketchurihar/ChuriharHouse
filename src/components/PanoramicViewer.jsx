import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { panoramas } from "../data/panoramas";

export default function PanoramicViewer() {
  const [activeRoom, setActiveRoom] = useState(panoramas[0]);
  const viewerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (viewerRef.current && activeRoom) {
      viewerRef.current.setPanorama?.(activeRoom.src);
    }
  }, [activeRoom]);

  return (
    <section
      id="360"
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
          360° Virtual Tour
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 font-body text-sm text-[#6b7280]"
        >
          Click and drag to explore · Touch and drag on mobile
        </motion.p>

        {/* Room selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-2 overflow-x-auto pb-2"
        >
          {panoramas.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => setActiveRoom(room)}
              className={`min-h-[44px] shrink-0 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeRoom.id === room.id
                  ? "bg-[#1a1a1a] text-white shadow-md"
                  : "bg-white text-[#1a1a1a] hover:bg-[#f5f5f4] border border-[#e5e5e5]"
              }`}
            >
              {room.name}
            </button>
          ))}
        </motion.div>

        {/* Viewer container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative mt-8 overflow-hidden border border-[#e5e5e5] shadow-lg"
        >
          <ReactPhotoSphereViewer
            ref={viewerRef}
            src={activeRoom.src}
            height="500px"
            width="100%"
            navbar={["zoom", "fullscreen"]}
            containerClass="!rounded-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
