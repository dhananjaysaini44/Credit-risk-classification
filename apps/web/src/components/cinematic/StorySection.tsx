'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface StorySectionProps {
  number: string;
  title: string;
  cmd: string;
  status: string;
  icon: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  href?: string;
}

export default function StorySection({
  number,
  title,
  cmd,
  status,
  icon,
  children,
  side = 'left',
  href
}: StorySectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const xOffset = isMobile ? 50 : 100;

  const content = (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: side === 'left' ? -xOffset : xOffset,
        filter: 'blur(10px)'
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        filter: 'blur(0px)'
      }}
      whileHover={{ 
        scale: isMobile ? 1.01 : 1.02,
        y: isMobile ? -5 : -10,
        boxShadow: "0 20px 40px rgba(195, 245, 255, 0.15)",
        borderColor: "rgba(195, 245, 255, 0.4)"
      }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] // Custom quintic ease
      }}
      className="glass-panel p-8 group relative overflow-hidden h-full flex flex-col cursor-pointer border border-white/5 transition-colors duration-500 hover:bg-white/[0.02]"
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

  return href ? (
    <Link href={href}>
      {content}
    </Link>
  ) : content;
}
