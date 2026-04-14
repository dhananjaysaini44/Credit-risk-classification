'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollSequence from './ScrollSequence';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { scrollY } = useScroll();
  
  // Parallax ratio 0.5: Background moves at exactly half speed
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -500]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0.4]); 

  // Smooth springs for high-end cinematic feel
  const smoothY = useSpring(backgroundY, { stiffness: 50, damping: 20 });

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* Managed Parallax Background */}
      <div className="fixed inset-0 z-[-1] bg-[#000000] overflow-hidden">
        <div className="absolute inset-0">
          <ScrollSequence frameCount={240} />
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
