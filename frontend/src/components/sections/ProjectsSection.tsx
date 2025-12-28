import { getProjects } from '@/lib/api';
import { ProjectCard } from '@/components/ProjectCard';
import { ScrollReveal } from '@/components/ScrollReveal';

const projects = getProjects();

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-sm font-mono text-primary mb-4 block">
              03. Projects
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="heading-lg mb-4">
              Featured <span className="text-gradient">Work</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="body-lg max-w-2xl mx-auto">
              A selection of projects I've built, from cloud infrastructure to full-stack applications.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
