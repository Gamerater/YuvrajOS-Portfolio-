import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

const BOOT_LOGS = [
  "Initializing YuvrajOS...",
  "Loading Neural Core...",
  "Mounting System Directories...",
  "Establishing Interface Layer...",
  "System Ready."
];

export const BootLoader: React.FC = () => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const bootSystem = useOSStore((state) => state.bootSystem);

  useEffect(() => {
    if (currentLogIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setCurrentLogIndex((prev) => prev + 1);
      }, 700); // 700ms per log
      return () => clearTimeout(timer);
    } else {
      // Small delay after final log before booting
      const finalTimer = setTimeout(() => {
        bootSystem();
      }, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentLogIndex, bootSystem]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 bg-black text-green-500 font-mono p-8 flex flex-col justify-end z-[9999]"
    >
      <div className="max-w-3xl space-y-2">
        <AnimatePresence>
          {BOOT_LOGS.slice(0, currentLogIndex).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm md:text-base tracking-wider"
            >
              {`> ${log}`}
            </motion.div>
          ))}
        </AnimatePresence>
        {currentLogIndex < BOOT_LOGS.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-green-500 inline-block align-middle ml-2"
          />
        )}
      </div>
    </motion.div>
  );
};