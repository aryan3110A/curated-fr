"use client";

import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.2, 1, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
};
