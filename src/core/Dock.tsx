import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

// Lazy load applications
const TerminalApp = lazy(() => import('../apps/TerminalApp'));
const DataLab = lazy(() => import('../apps/DataLab'));
const ResumeViewer = lazy(() => import('../apps/ResumeViewer'));

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center text-gray-500 animate-pulse">
    Loading Module...
  </div>
);

export const Dock: React.FC = () => {
  const openWindow = useOSStore((state) => state.openWindow);

  const launchApp = (id: string, title: string, Component: React.LazyExoticComponent<any>) => {
    openWindow({
      id,
      title,
      component: (
        <Suspense fallback={<LoadingFallback />}>
          <Component />
        </Suspense>
      ),
    });
  };

  const dockItems = [
    { id: 'terminal', title: 'Neural Terminal', icon: '💻', Component: TerminalApp },
    { id: 'data-lab', title: 'Data Lab', icon: '🧬', Component: DataLab },
    { id: 'resume', title: 'Dossier (Resume)', icon: '📄', Component: ResumeViewer },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9000]">
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
        
        {dockItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => launchApp(item.id, item.title, item.Component)}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg flex items-center justify-center text-white text-2xl border border-white/20 relative group"
          >
            {item.icon}
            {/* Tooltip */}
            <span className="absolute -top-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.title}
            </span>
          </motion.button>
        ))}

      </div>
    </div>
  );
};