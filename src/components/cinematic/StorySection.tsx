'use client';

import { motion } from 'framer-motion';

interface StorySectionProps {
  number: string;
  title: string;
  cmd: string;
  status: string;
  icon: string;
  children: React.ReactNode;
}

export default function StorySection({
  number,
  title,
  cmd,
  status,
  icon,
  children
}: StorySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-8 glitch-hover group relative overflow-hidden h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className="font-headline text-primary/30 text-4xl md:text-5xl font-bold tracking-tighter">
          {number}
        </span>
        <span className="material-symbols-outlined text-primary group-hover:rotate-90 transition-transform duration-500 text-2xl md:text-3xl">
          {icon}
        </span>
      </div>

      <h3 className="font-headline text-xl md:text-2xl text-white mb-6 relative z-10 tracking-tight">
        {title}
      </h3>

      <div className="font-mono text-[10px] text-foreground/50 space-y-2 mb-8 relative z-10">
        <p className="flex items-center gap-2">
          <span className="text-primary/60">CMD:</span> {cmd}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-secondary/60">STATUS:</span> [{status}]
        </p>
      </div>

      <div className="relative z-10 text-sm leading-relaxed text-foreground/70 flex-grow">
        {children}
      </div>

      {/* Decorative Grid Corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-primary/10 pointer-events-none" />
    </motion.div>
  );
}
