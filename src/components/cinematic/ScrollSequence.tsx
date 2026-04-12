'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceProps {
  frameCount: number;
}

export default function ScrollSequence({ frameCount }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const sequence = useRef({ frame: 0 }).current;

  useEffect(() => {
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 30) setIsLoaded(true);
      };
      imagesRef.current[i - 1] = img;
    }
  }, [frameCount]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed dimensions - simplest approach
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      const img = imagesRef.current[Math.floor(sequence.frame)];
      if (img && ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    gsap.to(sequence, {
      frame: frameCount - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: render,
      },
    });

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, frameCount]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-60 contrast-150 saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
      </div>
    </div>
  );
}
