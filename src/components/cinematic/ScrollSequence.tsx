'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceProps {
  frameCount: number;
}

export default function ScrollSequence({ frameCount }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const sequence = { frame: 0 };

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount]);

  useGSAP(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const img = images[sequence.frame];
      if (img) {
        // Clear canvas
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        
        // Draw image scaled to cover
        const canvasAspect = canvasRef.current!.width / canvasRef.current!.height;
        const imgAspect = img.width / img.height;
        
        let drawWidth = canvasRef.current!.width;
        let drawHeight = canvasRef.current!.height;
        let drawX = 0;
        let drawY = 0;

        if (canvasAspect > imgAspect) {
          drawHeight = drawWidth / imgAspect;
          drawY = (canvasRef.current!.height - drawHeight) / 2;
        } else {
          drawWidth = drawHeight * imgAspect;
          drawX = (canvasRef.current!.width - drawWidth) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    // Initialize first frame
    render();

    gsap.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: render,
      },
    });

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images, frameCount]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>
    </div>
  );
}
