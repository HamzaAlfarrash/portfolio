import { Terminal, Cloud, Database, GitBranch } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const skills = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Designing and implementing scalable cloud solutions on AWS, Azure, and GCP.',
  },
  {
    icon: Terminal,
    title: 'Infrastructure as Code',
    description: 'Automating infrastructure with Terraform, Pulumi, and CloudFormation.',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Building data pipelines and managing distributed database systems.',
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    description: 'Streamlining development workflows with modern DevOps practices.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <ScrollReveal>
              <span className="text-sm font-mono text-primary mb-4 block">
                01. About Me
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-lg mb-6">
                Crafting Cloud Solutions with{' '}
                <span className="text-gradient">Precision & Purpose</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a cloud and software engineer with over 5 years of experience designing, 
                  building, and maintaining production-grade infrastructure. My passion lies in 
                  creating systems that are not just functional, but elegant, scalable, and resilient.
                </p>
                <p>
                  Throughout my career, I've worked with startups and enterprises alike, helping 
                  teams migrate to the cloud, optimize their infrastructure costs, and implement 
                  best practices for security and reliability.
                </p>
                <p>
                  When I'm not architecting cloud solutions, you'll find me contributing to 
                  open-source projects, writing technical blog posts, or exploring the latest 
                  trends in distributed systems.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <ScrollReveal key={skill.title} delay={(index + 1) * 100} direction="up">
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                    <skill.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-semibold mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
