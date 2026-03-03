import React from 'react';
import { motion } from 'framer-motion';
import { WindowManager } from './WindowManager';
import { Dock } from './Dock';
import { ThemeToggle } from '../components/ThemeToggle';
import { NeuralWallpaper } from './NeuralWallpaper';

export const Desktop: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full overflow-hidden transition-colors duration-500 bg-black"
    >
      {/* 1. Base Layer: The Neural WebGL Background */}
      <NeuralWallpaper />
      
      {/* 2. System UI Layers */}
      <ThemeToggle />
      <WindowManager />
      <Dock />
    </motion.div>
  );
};