'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CinematicEngine from './CinematicEngine';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { scrollY } = useScroll();
  
  // Parallax overlay opacity calculation
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0.4]); 

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* Managed Parallax Background */}
      <div className="fixed inset-0 z-[-1] bg-[#000000] overflow-hidden">
        <div className="absolute inset-0">
          <CinematicEngine frameCount={240} />
        </div>
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>
      
      <main className="relative z-10">
        {children}
      </main>
    </ReactLenis>
  );
}
