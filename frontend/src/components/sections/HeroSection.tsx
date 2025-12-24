import { ArrowDown, Cloud, Server, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.png';
import { useParallax } from '@/hooks/useParallax';
import { useTilt } from '@/hooks/useTilt';
import { useTypewriter } from '@/hooks/useTypewriter';

export function HeroSection() {
  const parallaxSlow = useParallax(0.15);
  const parallaxMedium = useParallax(0.25);
  const parallaxFast = useParallax(0.35);
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt(15);
  
  const tagline = "Building scalable cloud infrastructure and elegant software solutions. Transforming complex challenges into simple, reliable systems.";
  const { displayedText, isComplete } = useTypewriter(tagline, 30, 800);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Hero-specific gradient fade for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      
      {/* Floating elements with parallax */}
      <div 
        className="absolute top-1/4 left-1/4 opacity-15 animate-float"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      >
        <Cloud className="w-16 h-16 text-primary" />
      </div>
      <div 
        className="absolute top-1/3 right-1/4 opacity-15 animate-float"
        style={{ animationDelay: '1s', transform: `translateY(${parallaxMedium}px)` }}
      >
        <Server className="w-12 h-12 text-accent" />
      </div>
      <div 
        className="absolute bottom-1/3 left-1/3 opacity-15 animate-float"
        style={{ animationDelay: '2s', transform: `translateY(${parallaxFast}px)` }}
      >
        <Code2 className="w-14 h-14 text-primary" />
      </div>

      <div className="section-container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Floating Profile Photo with Glow */}
          <div className="flex justify-center mb-8">
            <div 
              className="relative opacity-0 animate-fade-in"
              style={{ 
                transform: `translateY(${parallaxSlow * 0.5}px) perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                transition: 'transform 0.15s ease-out'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
          </div>


          {/* Heading */}
          <h1 className="heading-xl mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="block text-foreground">Hi, I'm</span>
            <span className="text-gradient-animated">Hamza Alfarrash</span>
          </h1>

          {/* Tagline with typewriter effect */}
          <p className="body-lg max-w-2xl mx-auto mb-10 min-h-[4rem] opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {displayedText}
            {!isComplete && <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />}
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
