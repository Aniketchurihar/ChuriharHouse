import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Configure your video: use a YouTube embed URL, Vimeo URL, or path to self-hosted MP4
const videoConfig = {
  type: "youtube", // "youtube" | "vimeo" | "html5"
  youtubeId: "B1R3bVVwmTA", // Replace with your walkthrough video ID
  // vimeoId: "123456789", // For Vimeo
  // mp4Src: "/videos/tour.mp4", // For self-hosted
  // posterSrc: "/images/video-poster.jpg", // Poster for mobile
};

export default function VideoSection() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [isPlaying, setIsPlaying] = useState(false);
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Autoplay (muted) when in view on desktop; tap-to-play on mobile
  useEffect(() => {
    if (!videoRef.current || isTouchDevice) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, isTouchDevice]);

  return (
    <section
      id="video"
      ref={ref}
      className="relative bg-[#0a0a0a] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-heading text-2xl font-light tracking-[0.3em] text-white/95 md:text-3xl"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          VIDEO TOUR
        </motion.p>
        <div className="mx-auto mb-12 h-px w-24 bg-gradient-to-r from-transparent via-[#b8860b]/60 to-transparent" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-video w-full overflow-hidden ring-1 ring-white/10"
        >
          {videoConfig.type === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoConfig.youtubeId}?autoplay=0&rel=0`}
              title="Home tour video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : videoConfig.type === "html5" ? (
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                src={videoConfig.mp4Src}
                poster={videoConfig.posterSrc}
                muted
                playsInline
                loop
                className="h-full w-full object-cover"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }}
              />
              {isTouchDevice && !isPlaying && (
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = false;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  aria-label="Play video"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-white">
                    <svg
                      className="ml-1 h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
