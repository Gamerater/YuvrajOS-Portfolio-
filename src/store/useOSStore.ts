import { create } from 'zustand';
import type { ReactNode } from 'react';

export interface OSWindow {
  id: string;
  title: string;
  component: ReactNode;
  minimized: boolean;
  zIndex: number;
}

interface OSState {
  isBooted: boolean;
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  openWindows: OSWindow[];
  activeWindowId: string | null;
  
  // Actions
  bootSystem: () => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  openWindow: (window: Omit<OSWindow, 'zIndex' | 'minimized'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

// Helper to initialize theme and apply it to the DOM immediately
const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('yuvrajos-theme') as 'light' | 'dark' | null;
  const theme = saved || 'dark'; // Default to dark for neural vibe
  if (theme === 'dark') document.documentElement.classList.add('dark');
  return theme;
};

export const useOSStore = create<OSState>((set, get) => ({
  isBooted: false,
  theme: getInitialTheme(),
  soundEnabled: true,
  openWindows: [],
  activeWindowId: null,

  bootSystem: () => set({ isBooted: true }),

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('yuvrajos-theme', newTheme);
    
    // Toggle Tailwind's dark class on the HTML root
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ theme: newTheme });
  },

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  openWindow: (newWindow) => {
    const { openWindows } = get();
    // If window is already open, just focus it
    if (openWindows.find((w) => w.id === newWindow.id)) {
      get().focusWindow(newWindow.id);
      return;
    }

    // Calculate highest z-index to place new window on top
    const maxZ = openWindows.length > 0 
      ? Math.max(...openWindows.map((w) => w.zIndex)) 
      : 0;

    set({
      openWindows: [
        ...openWindows,
        { ...newWindow, minimized: false, zIndex: maxZ + 1 },
      ],
      activeWindowId: newWindow.id,
    });
  },

  closeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.filter((w) => w.id !== id),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),

  minimizeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.map((w) => 
      w.id === id ? { ...w, minimized: true } : w
    ),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),

  focusWindow: (id) => {
    const { openWindows, activeWindowId } = get();
    if (activeWindowId === id) return; // Already focused

    const maxZ = Math.max(...openWindows.map((w) => w.zIndex));
    
    set({
      activeWindowId: id,
      openWindows: openWindows.map((w) => 
        w.id === id 
          ? { ...w, zIndex: maxZ + 1, minimized: false } 
          : w
      ),
    });
  },
}));