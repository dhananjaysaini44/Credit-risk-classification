'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frameCount = 240;
    let loadedCount = 0;

    const interval = setInterval(() => {
      if (loadedCount < frameCount) {
        loadedCount += Math.floor(Math.random() * 5) + 1;
        const currentProgress = Math.min((loadedCount / frameCount) * 100, 100);
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          setIsLoaded(true);
          clearInterval(interval);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center p-8"
        >
          <div className="max-w-md w-full flex flex-col items-center">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-light tracking-[0.2em] mb-8 text-foreground/80"
            >
              PREPARING EXPERIENCE
            </motion.h2>
            
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              />
            </div>
            
            <motion.span 
              className="mt-4 text-xs font-mono text-muted-foreground tabular-nums"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>
          
          <div className="absolute bottom-12 left-12 flex flex-col space-y-2 opacity-30 text-[10px] font-mono tracking-widest uppercase">
            <span>Antigravity Render Engine</span>
            <span>Credit Risk v2.1.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
