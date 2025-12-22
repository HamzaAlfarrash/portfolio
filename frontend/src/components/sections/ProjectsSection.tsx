import { useState, useEffect } from 'react';
import { fetchProjects, type Project } from '@/lib/api';
import { ProjectCard } from '@/components/ProjectCard';
import { Loader2 } from 'lucide-react';

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const data = await fetchProjects();
      if (data.length === 0) {
        setError('Unable to load projects. Please check if the API is running.');
      }
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary mb-4 block opacity-0 animate-fade-in">
            03. Projects
          </span>
          <h2 className="heading-lg mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            A selection of projects I've built, from cloud infrastructure to full-stack applications.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm text-muted-foreground">
              Make sure the API server is running at <code className="font-mono text-primary">http://127.0.0.1:8000</code>
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
