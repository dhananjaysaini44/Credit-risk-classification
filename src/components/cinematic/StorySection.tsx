'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  title: string;
  text: string;
  side: 'left' | 'right';
}

export default function StorySection({ title, text, side }: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className={`relative h-[80vh] flex items-center px-8 md:px-24 z-10 ${
        side === 'right' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div 
        ref={textRef} 
        className={`max-w-xl flex flex-col space-y-4 ${
          side === 'right' ? 'text-right items-end' : 'text-left items-start'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-none text-foreground">
          {title}
        </h2>
        <p className="text-sm md:text-base font-light text-muted-foreground/80 leading-relaxed font-sans mt-4">
          {text}
        </p>
      </div>
    </section>
  );
}
