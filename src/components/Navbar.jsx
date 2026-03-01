import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#elevation", label: "Elevation" },
  { href: "#about", label: "About" },
  { href: "#floor-plan", label: "Spaces" },
  { href: "#gallery", label: "Gallery" },
  { href: "#video", label: "Video" },
  { href: "#features", label: "Features" },
  { href: "#360", label: "360 Tour" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/60"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="#"
            className={`font-heading text-xl font-medium tracking-[0.08em] transition-colors duration-300 ${
              isScrolled ? "text-[#1a1a1a]" : "text-white"
            }`}
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Churihar Home
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-colors hover:text-[#b8860b] ${
                  isScrolled ? "text-[#1a1a1a]" : "text-white/90"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#b8860b] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                isScrolled || mobileMenuOpen ? "bg-[#1a1a1a]" : "bg-white"
              } ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                isScrolled || mobileMenuOpen ? "bg-[#1a1a1a]" : "bg-white"
              } ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                isScrolled || mobileMenuOpen ? "bg-[#1a1a1a]" : "bg-white"
              } ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-heading text-2xl text-[#fafaf9]"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
