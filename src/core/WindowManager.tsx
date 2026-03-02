import React from 'react';
import { useOSStore } from '../store/useOSStore';
import { Window } from '../components/Window';

export const WindowManager: React.FC = () => {
  const openWindows = useOSStore((state) => state.openWindows);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* pointer-events-none on wrapper prevents it from blocking clicks to the desktop background.
        The Rnd component internally restores pointer-events.
      */}
      {openWindows.map((windowData) => (
        <Window key={windowData.id} windowData={windowData} />
      ))}
    </div>
  );
};