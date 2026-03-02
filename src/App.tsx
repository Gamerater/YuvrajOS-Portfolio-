import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOSStore } from './store/useOSStore';
import { BootLoader } from './core/BootLoader';
import { Desktop } from './core/Desktop';

const App: React.FC = () => {
  const isBooted = useOSStore((state) => state.isBooted);

  return (
    <div className="w-screen h-screen overflow-hidden text-gray-900 dark:text-gray-100 font-sans">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootLoader key="bootloader" />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;