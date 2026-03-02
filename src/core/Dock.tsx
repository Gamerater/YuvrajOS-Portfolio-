import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

export const Dock: React.FC = () => {
  const openWindow = useOSStore((state) => state.openWindow);

  const handleLaunchTest = () => {
    openWindow({
      id: 'system-monitor',
      title: 'Neural Monitor',
      component: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="text-4xl">🧠</div>
          <h2 className="text-xl font-bold">Neural Engine Active</h2>
          <p className="opacity-70">Core systems are functioning within normal parameters.</p>
        </div>
      )
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9000]">
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
        
        {/* Dummy App Icon */}
        <motion.button
          whileHover={{ scale: 1.2, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLaunchTest}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg flex items-center justify-center text-white text-xl border border-white/20"
        >
          ⚙️
        </motion.button>
        
        {/* Placeholder for future apps */}
        <motion.button
          whileHover={{ scale: 1.2, y: -10 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 shadow-lg flex items-center justify-center text-white text-xl border border-white/20 opacity-50 cursor-not-allowed"
        >
          📁
        </motion.button>

      </div>
    </div>
  );
};