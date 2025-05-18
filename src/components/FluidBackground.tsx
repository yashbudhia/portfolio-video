"use client";

import React, { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Fluid simulation parameters
    const particles: Particle[] = [];
    const particleCount = 100; // Significantly increased particle count for more visible effect
    const maxForce = 25; // Significantly increased force for more dynamic motion
    const smoothing = 20; // Further reduced smoothing for more responsive movement
    const profileRadius = 200; // Increased radius around profile image for more prominent effect

    // Get profile element position - default to center of viewport
    let profileX = window.innerWidth / 2;
    let profileY = window.innerHeight / 3;

    const updateProfilePosition = () => {
      try {
        // Try to find the profile image with more specific selector
        const profileElement = document.querySelector('img.rounded-full');

        if (profileElement) {
          const rect = profileElement.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            profileX = rect.left + rect.width / 2;
            profileY = rect.top + rect.height / 2;
            console.log("Profile position updated:", profileX, profileY);
          }
        } else {
          // Fallback to center of viewport if profile not found
          profileX = window.innerWidth / 2;
          profileY = window.innerHeight / 3;
          console.log("Using fallback profile position:", profileX, profileY);
        }
      } catch (error) {
        console.error("Error updating profile position:", error);
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(updateProfilePosition, 1000);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        // Initialize particles in a circle around the profile position
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + profileRadius;

        this.x = profileX + Math.cos(angle) * distance;
        this.y = profileY + Math.sin(angle) * distance;
        this.size = Math.random() * 5 + 3; // Significantly increased particle size
        this.speedX = Math.random() * 3 - 1.5; // Significantly increased initial speed
        this.speedY = Math.random() * 3 - 1.5; // Significantly increased initial speed
        this.color = '#ffffff';
        this.alpha = Math.random() * 0.5 + 0.5; // Maximum alpha for visibility
      }

      update() {
        // Calculate direction to profile
        const dx = profileX - this.x;
        const dy = profileY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply force towards profile with smoothing
        if (distance > profileRadius) {
          this.speedX += (dx / distance) * (maxForce / (distance + smoothing));
          this.speedY += (dy / distance) * (maxForce / (distance + smoothing));
        } else {
          // Inside the profile radius, apply circular motion
          const angle = Math.atan2(dy, dx);
          const tangentX = Math.cos(angle + Math.PI / 2);
          const tangentY = Math.sin(angle + Math.PI / 2);

          this.speedX += tangentX * 0.2;
          this.speedY += tangentY * 0.2;

          // Add slight repulsion from center
          this.speedX += (dx / distance) * -0.05;
          this.speedY += (dy / distance) * -0.05;
        }

        // Apply damping
        this.speedX *= 0.98;
        this.speedY *= 0.98;

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Contain particles within viewport with bounce
        if (this.x < 0 || this.x > window.innerWidth) {
          this.speedX *= -0.5;
          this.x = Math.max(0, Math.min(this.x, window.innerWidth));
        }

        if (this.y < 0 || this.y > window.innerHeight) {
          this.speedY *= -0.5;
          this.y = Math.max(0, Math.min(this.y, window.innerHeight));
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      try {
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update profile position occasionally
        if (Math.random() > 0.95) {
          updateProfilePosition();
        }

        // Draw connections between particles
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 300) { // Significantly increased connection distance
              // Calculate distance from profile center for both particles
              const distFromProfile1 = Math.sqrt(
                Math.pow(particles[i].x - profileX, 2) +
                Math.pow(particles[i].y - profileY, 2)
              );
              const distFromProfile2 = Math.sqrt(
                Math.pow(particles[j].x - profileX, 2) +
                Math.pow(particles[j].y - profileY, 2)
              );

              // Enhance connections near the profile
              const profileProximityFactor =
                (1 - Math.min(distFromProfile1, profileRadius * 2) / (profileRadius * 2)) *
                (1 - Math.min(distFromProfile2, profileRadius * 2) / (profileRadius * 2));

              // Adjust opacity based on distance and profile proximity
              const baseOpacity = 0.5 * (1 - distance / 300); // Significantly increased base opacity
              const enhancedOpacity = baseOpacity * (1 + profileProximityFactor * 5); // Significantly increased enhancement factor

              ctx.globalAlpha = enhancedOpacity;
              ctx.lineWidth = 3; // Significantly increased line width
              ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)'; // Maximum color brightness

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

        // Draw glow around profile - inner glow (brighter)
        const innerGradient = ctx.createRadialGradient(
          profileX, profileY, profileRadius * 0.1,
          profileX, profileY, profileRadius * 1.8
        );
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)'); // Significantly increased brightness
        innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.globalAlpha = 0.7; // Significantly increased opacity
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(profileX, profileY, profileRadius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Draw middle glow layer (enhanced)
        const middleGradient = ctx.createRadialGradient(
          profileX, profileY, profileRadius * 0.3,
          profileX, profileY, profileRadius * 2.5
        );
        middleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)'); // Increased brightness
        middleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.globalAlpha = 0.6; // Increased opacity
        ctx.fillStyle = middleGradient;
        ctx.beginPath();
        ctx.arc(profileX, profileY, profileRadius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer glow around profile (wider and brighter)
        const outerGradient = ctx.createRadialGradient(
          profileX, profileY, profileRadius * 0.5,
          profileX, profileY, profileRadius * 4.0 // Extended radius
        );
        outerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)'); // Increased brightness
        outerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.globalAlpha = 0.5; // Increased opacity
        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(profileX, profileY, profileRadius * 4.0, 0, Math.PI * 2);
        ctx.fill();
      } catch (error) {
        console.error("Error in animation loop:", error);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Enhanced cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      {/* Dark overlay with reduced opacity to make animation more visible */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Canvas element for fluid animation with higher z-index */}
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full z-10"
        style={{ opacity: 1 }} // Maximum opacity for visibility
      />

      {/* Add a subtle pulsing glow effect to make animation more noticeable */}
      <div
        className="absolute inset-0 z-5 animate-pulse"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
          animationDuration: '3s',
        }}
      ></div>

      {/* Fallback background in case canvas fails */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(40, 40, 40, 0.8) 0%, rgba(0, 0, 0, 1) 70%)',
        }}
      ></div>
    </div>
  );
}
