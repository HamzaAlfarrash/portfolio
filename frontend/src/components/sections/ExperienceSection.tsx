import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const companyLogos: Record<string, string> = {
  'Amazon Web Services (AWS)': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'Leap Event Technology': 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1455112230/jlnqfqjpk0f0kh9o2pcd.png',
};

const experiences = [
  {
    title: 'Associate Cloud Consultant',
    company: 'Amazon Web Services (AWS)',
    period: '2026 - Present',
    description: 'Leading cloud infrastructure initiatives and architecting scalable solutions for enterprise clients.',
    achievements: [
      'Reduced cloud costs by 40% through infrastructure optimization',
      'Implemented zero-downtime deployment strategies',
      'Led migration of legacy systems to Kubernetes',
    ],
  },
  {
    title: 'Cloud Consultant Intern',
    company: 'Amazon Web Services (AWS)',
    period: '2025 - 2025',
    description: 'Built and maintained cloud infrastructure supporting millions of daily active users.',
    achievements: [
      'Designed and implemented multi-region disaster recovery',
      'Automated infrastructure provisioning with Terraform',
      'Reduced deployment time from hours to minutes',
    ],
  },
  {
    title: 'QA Analyst Intern',
    company: 'Leap Event Technology',
    period: '2024 - 2025',
    description: 'Developed full-stack applications and contributed to DevOps practices.',
    achievements: [
      'Built microservices architecture from monolith',
      'Implemented CI/CD pipelines with GitHub Actions',
      'Mentored junior developers on best practices',
    ],
  },
];

interface ExperienceCardProps {
  exp: typeof experiences[0];
  index: number;
}

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const logoUrl = companyLogos[exp.company];
  
  return (
    <div
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${exp.company} logo`}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <Briefcase className="w-4 h-4" />
        )}
        <span>{exp.company}</span>
      </div>
      <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
      <div className="flex items-center gap-2 text-sm text-primary mb-4">
        <Calendar className="w-4 h-4" />
        <span>{exp.period}</span>
      </div>
      <p className="text-muted-foreground mb-4">{exp.description}</p>
      <ul className="space-y-2">
        {exp.achievements.map((achievement) => (
          <li key={achievement} className="flex items-start gap-2 text-sm">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
            <span className="text-muted-foreground">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface CompanyLogoProps {
  company: string;
  isVisible: boolean;
  fromLeft: boolean;
  delay: number;
}

function CompanyLogo({ company, isVisible, fromLeft, delay }: CompanyLogoProps) {
  const logoUrl = companyLogos[company];
  
  return (
    <div
      className={`w-32 h-32 rounded-2xl bg-card border border-border flex items-center justify-center p-5 transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${fromLeft ? '-translate-x-12' : 'translate-x-12'} translate-y-4 scale-75`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${company} logo`}
          className="w-full h-full object-contain"
        />
      ) : (
        <Briefcase className="w-14 h-14 text-primary" />
      )}
    </div>
  );
}

export function ExperienceSection() {
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(experiences.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleLogos((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }
            });
          },
          { threshold: 0.2, rootMargin: '-100px' }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section id="experience" className="section-padding bg-card/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary mb-4 block opacity-0 animate-fade-in">
            02. Experience
          </span>
          <h2 className="heading-lg opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Professional <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={exp.title + exp.company}
                className="relative mb-16 last:mb-0"
                ref={(el) => (itemRefs.current[index] = el)}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-6 w-3 h-3 bg-primary rounded-full -translate-x-1.5 md:-translate-x-1.5 z-10" />

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                  {isEven ? (
                    <>
                      {/* Logo on LEFT, Card on RIGHT */}
                      <div className="flex justify-center items-center pr-8">
                        <CompanyLogo
                          company={exp.company}
                          isVisible={visibleLogos[index]}
                          fromLeft={true}
                          delay={index * 200}
                        />
                      </div>
                      <div className="pl-8">
                        <ExperienceCard exp={exp} index={index} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Card on LEFT, Logo on RIGHT */}
                      <div className="pr-8">
                        <ExperienceCard exp={exp} index={index} />
                      </div>
                      <div className="flex justify-center items-center pl-8">
                        <CompanyLogo
                          company={exp.company}
                          isVisible={visibleLogos[index]}
                          fromLeft={false}
                          delay={index * 200}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile layout - all cards on right side */}
                <div className="md:hidden pl-6">
                  <ExperienceCard exp={exp} index={index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
