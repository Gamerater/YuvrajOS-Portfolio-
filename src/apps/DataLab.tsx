import { useEffect, useState } from 'react';
import { fetchCategoryProjects, type ProjectData } from '../utils/projectLoader';
import { ProjectCard } from '../components/ProjectCard';

export default function DataLab() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryProjects('data-lab').then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center animate-pulse">Initializing Data Lab Modules...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>
  );
}