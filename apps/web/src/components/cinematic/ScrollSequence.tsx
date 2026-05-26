'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRiskStore } from '@/store/useRiskStore';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceProps {
  frameCount: number;
}

export default function ScrollSequence({ frameCount }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setLoadProgress } = useRiskStore();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // 1. Initial Image Preloading
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Frame naming: frame-001.jpg, frame-002.jpg...
        const frameIndex = i.toString().padStart(3, '0');
        img.src = `/frames/frame-${frameIndex}.jpg`;
        
        img.onload = () => {
          loadedCount++;
          setLoadProgress((loadedCount / frameCount) * 100);
          
          if (loadedCount === frameCount) {
             setImages(loadedImages);
             setIsReady(true);
          }
        };
        loadedImages.push(img);
    }
  }, [frameCount, setLoadProgress]);

  // 2. Interaction & Rendering logic
  useEffect(() => {
    if (!isReady || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set internal canvas resolution
    canvas.width = 1920;
    canvas.height = 1080;

    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (img && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Initial render
    renderFrame(0);

    // Create a proxy object for GSAP to animate
    const sequence = { frame: 0 };

    const anim = gsap.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Subtle Smoothing
      },
      onUpdate: () => renderFrame(sequence.frame),
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isReady, images, frameCount]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-60 pointer-events-none"
      />
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-40" />
    </div>
  );
}
