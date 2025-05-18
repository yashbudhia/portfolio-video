"use client";

import React, { useEffect, useRef } from 'react';

interface FluidBackgroundSectionProps {
  className?: string;
  intensity?: number; // Controls the intensity of the fluid effect (1-10)
  color?: string; // Base color of the fluid
}

export default function FluidBackgroundSection({
  className = "",
  intensity = 5,
  color = "#ffffff"
}: FluidBackgroundSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Fluid simulation parameters
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(intensity * 2, 5), 20); // Scale with intensity
    const maxForce = intensity * 2;
    const smoothing = 100 - intensity * 5;

    // Create focal points for the fluid to move around
    const focalPoints = [
      { x: canvas.width * 0.3, y: canvas.height * 0.3, strength: 1 },
      { x: canvas.width * 0.7, y: canvas.height * 0.7, strength: 1.2 },
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseColor: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.baseColor = color;
        this.alpha = Math.random() * 0.2 + 0.05;
      }

      update() {
        // Apply forces from focal points
        for (const point of focalPoints) {
          const dx = point.x - this.x;
          const dy = point.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0) {
            // Apply force towards focal point with smoothing
            this.speedX += (dx / distance) * (maxForce / (distance + smoothing)) * point.strength;
            this.speedY += (dy / distance) * (maxForce / (distance + smoothing)) * point.strength;

            // Apply circular motion around focal points when close
            if (distance < 100) {
              const angle = Math.atan2(dy, dx);
              const tangentX = Math.cos(angle + Math.PI / 2);
              const tangentY = Math.sin(angle + Math.PI / 2);

              this.speedX += tangentX * 0.2 * point.strength;
              this.speedY += tangentY * 0.2 * point.strength;
            }
          }
        }

        // Apply damping
        this.speedX *= 0.98;
        this.speedY *= 0.98;

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Contain particles within canvas with bounce
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -0.5;
          this.x = Math.max(0, Math.min(this.x, canvas.width));
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -0.5;
          this.y = Math.max(0, Math.min(this.y, canvas.height));
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Slowly move focal points
    let time = 0;
    const updateFocalPoints = () => {
      time += 0.005;
      focalPoints[0].x = canvas.width * (0.3 + Math.sin(time) * 0.1);
      focalPoints[0].y = canvas.height * (0.3 + Math.cos(time * 0.7) * 0.1);
      focalPoints[1].x = canvas.width * (0.7 + Math.cos(time * 0.8) * 0.1);
      focalPoints[1].y = canvas.height * (0.7 + Math.sin(time * 1.2) * 0.1);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateFocalPoints();

      // Draw connections between particles
      ctx.strokeStyle = `${color}`;
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.globalAlpha = 0.05 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Draw subtle glow around focal points
      for (const point of focalPoints) {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 10,
          point.x, point.y, 150
        );
        // Safely create color stops
        let color0, color1;

        if (typeof color === 'string' && color.startsWith('rgba')) {
          // Extract the RGB part and create new rgba values
          const rgbPart = color.substring(0, color.lastIndexOf(','));
          color0 = `${rgbPart}, 0.1)`;
          color1 = `${rgbPart}, 0)`;
        } else {
          // Fallback to safe values
          color0 = 'rgba(255, 255, 255, 0.1)';
          color1 = 'rgba(255, 255, 255, 0)';
        }

        gradient.addColorStop(0, color0);
        gradient.addColorStop(1, color1);

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, [intensity, color]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Fallback gradient in case canvas fails */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(40, 40, 40, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      ></div>
    </div>
  );
}
