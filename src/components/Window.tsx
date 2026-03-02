import React from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore, type OSWindow } from '../store/useOSStore';

interface WindowProps {
  windowData: OSWindow;
}

export const Window: React.FC<WindowProps> = ({ windowData }) => {
  const { id, title, component, minimized, zIndex } = windowData;
  const { closeWindow, minimizeWindow, focusWindow, activeWindowId } = useOSStore();
  const isActive = activeWindowId === id;

  return (
    <AnimatePresence>
      {!minimized && (
        <Rnd
          default={{
            x: window.innerWidth / 2 - 300,
            y: window.innerHeight / 2 - 200,
            width: 600,
            height: 400,
          }}
          minWidth={300}
          minHeight={200}
          bounds="parent"
          cancel=".no-drag"
          onMouseDown={() => focusWindow(id)}
          style={{ zIndex }}
          className="absolute"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full h-full flex flex-col rounded-xl overflow-hidden backdrop-blur-xl border shadow-2xl transition-colors duration-200 ${
              isActive 
                ? 'bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-600 shadow-black/30' 
                : 'bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 shadow-black/10'
            }`}
          >
            {/* Title Bar - Drag Handle */}
            <div className="h-10 px-4 flex items-center justify-between bg-black/5 dark:bg-white/5 border-b border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing">
              <div className="flex gap-2 no-drag">
                <button 
                  onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                />
                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
                {title}
              </span>
              <div className="w-11" /> {/* Spacer for centering title */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto p-4 no-drag text-gray-800 dark:text-gray-200">
              {component}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
};