"use client";

import { useEffect, useRef } from "react";

export default function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    // Smoke particle class
    class SmokeParticle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      life: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 10;
        this.color = "#ffffff";
        this.velocity = {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
        };
        this.life = Math.random() * 100 + 100;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;
        this.opacity -= 0.003;
        if (this.opacity < 0) this.opacity = 0;
      }
    }

    // Array to store smoke particles
    const particles: SmokeParticle[] = [];

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      particles.push(
        new SmokeParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles occasionally
      if (Math.random() > 0.95) {
        particles.push(
          new SmokeParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        // Remove dead particles
        if (particles[i].life <= 0 || particles[i].opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
    />
  );
}
