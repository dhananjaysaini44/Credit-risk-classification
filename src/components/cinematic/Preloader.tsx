'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRiskStore } from '@/store/useRiskStore';

export default function Preloader() {
  const { loadProgress } = useRiskStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadProgress >= 100) {
      const timeout = setTimeout(() => setIsLoaded(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [loadProgress]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
        >
          <div className="w-full max-w-xs flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col items-center space-y-2"
            >
              <h2 className="text-xl font-light tracking-[0.2em] text-foreground uppercase">
                Antigravity
              </h2>
              <div className="h-[1px] w-12 bg-primary/40" />
            </motion.div>

            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              />
            </div>
            
            <motion.span 
              className="mt-4 text-xs font-mono text-muted-foreground tabular-nums"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {Math.floor(loadProgress)}%
            </motion.span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 text-[10px] font-mono tracking-[0.3em] text-muted-foreground/40 uppercase"
          >
            Preparing Experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
