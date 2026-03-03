import React from 'react';
import { motion } from 'framer-motion';
import type { ProjectData } from '../utils/projectLoader';

export const ProjectCard: React.FC<{ project: ProjectData }> = React.memo(({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="flex flex-col bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl overflow-hidden shadow-xl"
    >
      {project.image ? (
        <div className="h-40 w-full bg-gray-800 overflow-hidden">
          <img src={import.meta.env.BASE_URL + project.image} alt={project.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
          <span className="text-4xl opacity-50">📂</span>
        </div>
      )}
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-md border border-blue-500/30">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2 mt-auto">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 text-center py-1.5 text-sm bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity">
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 text-center py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';