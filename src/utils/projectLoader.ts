export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
}

export const fetchCategoryProjects = async (category: string): Promise<ProjectData[]> => {
  try {
    // import.meta.env.BASE_URL ensures this works on GitHub pages subpaths
    const baseUrl = import.meta.env.BASE_URL;
    const indexRes = await fetch(`${baseUrl}projects/${category}/index.json`);
    
    if (!indexRes.ok) throw new Error(`Category ${category} not found`);
    
    const fileNames: string[] = await indexRes.json();
    
    // Fetch all project JSONs concurrently for maximum speed
    const projects = await Promise.all(
      fileNames.map(async (fileName) => {
        const res = await fetch(`${baseUrl}projects/${category}/${fileName}`);
        return await res.json() as ProjectData;
      })
    );
    
    return projects;
  } catch (error) {
    console.error(`Error loading projects for ${category}:`, error);
    return [];
  }
};