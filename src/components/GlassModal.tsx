import { ReactNode } from "react";
import { motion } from "framer-motion";

export function GlassModal({ children }: { children: ReactNode }) {
  return <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.22 }} className="glass relative max-h-[88vh] w-[min(680px,calc(100vw-24px))] overflow-y-auto rounded-lg p-6 text-white shadow-2xl md:p-8">{children}</motion.div>;
}
