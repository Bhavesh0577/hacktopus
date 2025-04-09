'use client'

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export function GridBackgroundDemo({ children }: { children: React.ReactNode }) {
  // Ref for the parent div
  const parentRef = useRef<HTMLDivElement>(null);
  // State for particles - start with empty array to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    id: number;
    top: string;
    left: string;
    duration: string;
    delay: string;
  }>>([]);

  // Generate particles on client-side only
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const spotlight = parent.querySelector('.spotlight') as HTMLDivElement;
      if (!spotlight) return;

      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update the gradient position
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 30%, rgba(0,0,0,0.9) 70%)`;
    };

    parent.addEventListener('mousemove', handleMouseMove);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Animated grid lines */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:50px_50px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]",
          "animate-grid-fade-in"
        )}
      />

      {/* Glowing dots at intersections */}
      <div
        className={cn(
          "absolute inset-0 opacity-40",
          "[background-size:50px_50px]",
          "[background-image:radial-gradient(circle,rgba(177,127,250,0.3)_1px,transparent_1px)]",
          "animate-grid-fade-in"
        )}
      />

      {/* Moving particles effect - rendered only client-side */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-purple-500/50"
            style={{
              top: particle.top,
              left: particle.left,
              animation: `floating-particle ${particle.duration} linear infinite`,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Radial spotlight mask that follows cursor */}
      <div className="spotlight pointer-events-none absolute inset-0 opacity-100 z-10" />

      {/* Additional radial overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 z-10" />

      {/* Content wrapper */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
