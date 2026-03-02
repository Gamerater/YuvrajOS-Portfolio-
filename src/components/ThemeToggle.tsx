import React from 'react';
import { useOSStore } from '../store/useOSStore';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useOSStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[9999] p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg text-gray-800 dark:text-gray-200 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  );
};