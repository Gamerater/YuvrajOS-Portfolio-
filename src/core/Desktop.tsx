import React from 'react';
import { motion } from 'framer-motion';
import { WindowManager } from './WindowManager';
import { Dock } from './Dock';
import { ThemeToggle } from '../components/ThemeToggle';

export const Desktop: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-slate-900 dark:to-black transition-colors duration-500"
    >
      {/* Background Layer could go here (WebGL Canvas later) */}
      
      <ThemeToggle />
      <WindowManager />
      <Dock />
    </motion.div>
  );
};