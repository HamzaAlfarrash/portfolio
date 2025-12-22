import { ArrowDown, Cloud, Server, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.png';
import { useParallax } from '@/hooks/useParallax';

export function HeroSection() {
  const parallaxSlow = useParallax(0.15);
  const parallaxMedium = useParallax(0.25);
  const parallaxFast = useParallax(0.35);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating elements with parallax */}
      <div 
        className="absolute top-1/4 left-1/4 opacity-20 animate-float"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      >
        <Cloud className="w-16 h-16 text-primary" />
      </div>
      <div 
        className="absolute top-1/3 right-1/4 opacity-20 animate-float"
        style={{ animationDelay: '1s', transform: `translateY(${parallaxMedium}px)` }}
      >
        <Server className="w-12 h-12 text-accent" />
      </div>
      <div 
        className="absolute bottom-1/3 left-1/3 opacity-20 animate-float"
        style={{ animationDelay: '2s', transform: `translateY(${parallaxFast}px)` }}
      >
        <Code2 className="w-14 h-14 text-primary" />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />

      <div className="section-container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Floating Profile Photo with Glow */}
          <div 
            className="relative inline-block mb-8 opacity-0 animate-fade-in"
            style={{ transform: `translateY(${parallaxSlow * 0.5}px)` }}
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-full blur-2xl animate-pulse opacity-60" />
            {/* Inner glow */}
            <div className="absolute inset-0 bg-primary/25 rounded-full blur-xl scale-110" />
            {/* Floating shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-primary/20 rounded-full blur-xl" />
            {/* Photo container */}
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
              <img 
                src={profilePhoto} 
                alt="Hamza Alfarrash" 
                className="w-full h-full object-cover object-center scale-110"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-mono text-primary">Available for new opportunities</span>
          </div>

          {/* Heading */}
          <h1 className="heading-xl mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="block text-foreground">Hi, I'm</span>
            <span className="text-gradient-animated">Hamza Alfarrash</span>
          </h1>

          {/* Tagline */}
          <p className="body-lg max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Building scalable cloud infrastructure and elegant software solutions. 
            Transforming complex challenges into simple, reliable systems.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Tech stack */}
          <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <p className="text-sm text-muted-foreground mb-4">Technologies I work with</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Python', 'Go', 'TypeScript'].map(tech => (
                <span key={tech} className="px-4 py-2 text-sm font-mono bg-secondary rounded-lg text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
