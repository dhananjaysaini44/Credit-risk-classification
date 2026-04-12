'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 px-4">
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col items-center text-center space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center space-x-3 mb-4"
        >
          <div className="h-[1px] w-8 bg-primary shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
          <span className="text-[10px] font-mono tracking-ultimate uppercase text-primary">
            AI-POWERED FINANCIAL CO-PILOT
          </span>
          <div className="h-[1px] w-8 bg-primary shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-light tracking-tightest leading-[0.9] text-foreground"
        >
          Predicting <br />
          <span className="italic font-serif font-thin opacity-50">Stability & Risk</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-lg text-sm md:text-base font-light font-sans tracking-wide leading-relaxed"
        >
          Empowering the next generation of financial transparency through 
          state-of-the-art Logistic Regression and behavioral analysis.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center space-y-4"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase">
            Scroll to Initiate
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
