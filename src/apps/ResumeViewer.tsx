import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResumeViewer() {
  const [scale, setScale] = useState(1);
  const resumeUrl = `${import.meta.env.BASE_URL}resume/resume.jpg`;

  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-neutral-900">
      <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-black/50 border-b border-gray-300 dark:border-gray-700">
        <div className="flex gap-2">
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-700 transition">-</button>
          <button onClick={() => setScale(s => Math.min(2.5, s + 0.25))} className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-700 transition">+</button>
        </div>
        <a href={resumeUrl} download className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm">
          Download PDF
        </a>
      </div>
      <div className="flex-1 overflow-auto flex justify-center p-8 custom-scrollbar">
        <motion.div animate={{ scale }} className="origin-top shadow-2xl">
          {/* Ensure you place a resume.jpg in your /public/resume/ folder */}
          <img src={resumeUrl} alt="Resume" className="max-w-[800px] bg-white" />
        </motion.div>
      </div>
    </div>
  );
}