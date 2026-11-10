import { motion } from 'framer-motion';

/**
 * Fade-and-rise scroll reveal wrapper (triggers once, near viewport entry).
 */
export default function ScrollReveal({ children, delay = 0, y = 28, once = true, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
