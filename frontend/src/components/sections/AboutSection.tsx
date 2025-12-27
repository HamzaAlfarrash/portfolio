import { Terminal, Cloud, Database, GitBranch } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const skills = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Building serverless solutions with AWS CDK, Lambda, API Gateway, S3, and DynamoDB.',
  },
  {
    icon: Terminal,
    title: 'Full-Stack Development',
    description: 'Creating applications with Java Spring Boot, React, TypeScript, and Python.',
  },
  {
    icon: Database,
    title: 'Automation & Testing',
    description: 'Implementing CI/CD pipelines and automated testing workflows.',
  },
  {
    icon: GitBranch,
    title: 'DevOps & Observability',
    description: 'Configuring monitoring, logging, and deployment automation.',
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
                  I'm a Computer Engineering student at McGill University, graduating in May 2026, with a strong focus on building cloud-native systems that solve real-world problems at scale.
                </p>
                <p>
                  During my internship at AWS Professional Services, I designed and developed CloudAsset, a serverless digital asset management platform that reduced manual processing time by 95%, saving teams over 20 hours per week. This experience shaped how I approach system design—prioritizing scalability, simplicity, and measurable impact. I'll be returning to AWS Professional Services full-time in July, continuing to build cloud-native solutions in client-facing environments.
                </p>
                <p>
                  Alongside my technical work, I've taken on leadership roles that involved leading and coordinating teams of up to 30 individuals, with an emphasis on ownership, clear communication, and execution under real constraints.
                </p>
                <p>
                  I'm deeply motivated by continuous learning and impact, with current interests in cloud architecture, machine learning, and agentic AI systems. Outside of engineering, I enjoy staying active through sports and keeping up with emerging trends in AI and distributed systems.
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
