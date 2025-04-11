
import React, { useEffect, useRef } from 'react';

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Create floating particles
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      direction: number;
      lastUpdate: number;
      opacity: number;
      opacityDirection: number;
    }[] = [];

    const colors = [
      'rgba(96, 165, 250, 0.7)', // blue
      'rgba(14, 165, 233, 0.7)', // cyan
      'rgba(139, 92, 246, 0.7)', // purple
      'rgba(249, 115, 22, 0.7)', // orange
      'rgba(38, 198, 218, 0.7)', // teal (primary color)
    ];

    // Initialize particles
    const createParticles = () => {
      const particleCount = Math.min(Math.floor(canvas.width / 8), 35);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          radius: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.7 + 0.1,
          direction: Math.random() * Math.PI * 2,
          lastUpdate: Date.now(),
          opacity: Math.random() * 0.5 + 0.2,
          opacityDirection: Math.random() > 0.5 ? 0.003 : -0.003,
        });
      }
    };

    createParticles();

    // Draw connections between particles that are close to each other
    const drawConnections = () => {
      const maxDistance = 100;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(38, 198, 218, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const now = Date.now();
      
      // Draw connections first (behind particles)
      drawConnections();
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position based on time passed
        const deltaTime = now - particle.lastUpdate;
        particle.x += Math.cos(particle.direction) * particle.speed * (deltaTime / 16);
        particle.y += Math.sin(particle.direction) * particle.speed * (deltaTime / 16);
        particle.lastUpdate = now;
        
        // Update opacity for pulsing effect
        particle.opacity += particle.opacityDirection;
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.opacityDirection *= -1;
        }
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.offsetWidth) {
          particle.direction = Math.PI - particle.direction;
        }
        if (particle.y < 0 || particle.y > canvas.offsetHeight) {
          particle.direction = -particle.direction;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        const color = particle.color.replace(/[\d\.]+\)$/g, `${particle.opacity})`);
        ctx.fillStyle = color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full rounded-xl z-10 pointer-events-none" 
      style={{ opacity: 0.9 }}
    />
  );
};

export default HeroAnimation;
