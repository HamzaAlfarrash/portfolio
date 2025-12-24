import { ReactNode, useState, useEffect } from 'react';

interface BackgroundLayoutProps {
  children: ReactNode;
}

export function BackgroundLayout({ children }: BackgroundLayoutProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Fixed background layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 grid-pattern-enhanced opacity-60" />
        
        {/* Animated Gradient Orbs with Parallax */}
        <div 
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl animate-blob opacity-70"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl animate-blob-reverse animation-delay-2000 opacity-60"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[550px] h-[550px] bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-50"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-accent/15 rounded-full blur-2xl animate-blob-reverse animation-delay-3000 opacity-40"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        
        {/* Subtle gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
}
