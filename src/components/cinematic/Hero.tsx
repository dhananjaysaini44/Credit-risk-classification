'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 z-10 px-8">
      <div className="relative z-10 max-w-5xl text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-headline font-bold text-6xl md:text-8xl tracking-tightest leading-none text-primary mb-8"
        >
          <span className="inline-block whitespace-nowrap">
            Mastering the <span className="text-white">Margin</span>
          </span>
          <br />
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">of Risk</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-body text-lg md:text-2xl text-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          An interactive deep-dive into AI-driven credit risk assessment and high-fidelity predictive modeling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <div className="flex items-center gap-3 px-6 py-2 bg-muted/20 border-l-2 border-primary backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-base animate-pulse">radar</span>
            <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Current Models - 4</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-2 bg-muted/20 border-l-2 border-secondary backdrop-blur-sm">
            <span className="material-symbols-outlined text-secondary text-base">warning</span>
            <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-secondary font-medium">FineTuning Required</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="scanline" />
      </div>

    </section>
  );
}
