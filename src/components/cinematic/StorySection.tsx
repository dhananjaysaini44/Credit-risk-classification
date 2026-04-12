'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  title: string;
  text: string;
  side: 'left' | 'right';
  imageUrl?: string;
}

export default function StorySection({ title, text, side, imageUrl }: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate content (Title + Text)
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: side === 'left' ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    // Animate Media if present
    if (imageUrl && mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 20%",
              scrub: 1,
            }
          }
        );
    }
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[85vh] flex items-center px-8 md:px-24 z-10 py-24"
    >
      <div 
        className={`w-full max-w-7xl mx-auto grid grid-cols-1 gap-16 items-center ${
            imageUrl 
            ? (side === 'left' ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-[0.8fr_1.2fr]') 
            : 'lg:grid-cols-2'
        }`}
      >
        
        {/* Text Content */}
        <div 
          ref={contentRef} 
          className={`flex flex-col space-y-6 ${
            side === 'right' && !imageUrl ? 'lg:col-start-2 text-right items-end' : 'text-left items-start'
          } ${imageUrl && side === 'right' ? 'lg:order-2' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1] text-foreground">
            {title}
          </h2>
          <div className="h-[1px] w-12 bg-primary/40" />
          <p className="text-sm md:text-base font-light text-muted-foreground/80 leading-relaxed font-sans w-full max-w-2xl">
            {text}
          </p>
        </div>

        {/* Media Content (Image) */}
        {imageUrl && (
          <div 
            ref={mediaRef} 
            className={`relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm shadow-2xl group ${
                side === 'right' ? 'lg:order-1' : ''
            }`}
          >
             <Image 
               src={imageUrl} 
               alt={title}
               fill
               sizes="(max-width: 1024px) 100vw, 50vw"
               className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent pointer-events-none" />
          </div>
        )}

      </div>
    </section>
  );
}
