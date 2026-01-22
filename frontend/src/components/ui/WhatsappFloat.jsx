import { motion } from "framer-motion";

export default function WhatsappFloat() {
  return (
    <motion.a
      href="https://wa.me/7367049049"
      target="_blank"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-xl flex items-center gap-2"
    >
      💬
      <span className="hidden md:block font-semibold">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
