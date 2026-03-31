import { motion } from "framer-motion";

export default function AccessDenied() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center px-6"
      >
        <h1 className="font-heading text-4xl md:text-5xl text-primary-light mb-4">
          Private Viewing
        </h1>
        <p className="text-primary-light/60 text-lg max-w-md mx-auto">
          This site is accessible by invitation only. Please use the link shared with you.
        </p>
      </motion.div>
    </div>
  );
}
