'use client';

import { useRiskStore } from '@/store/useRiskStore';
import Hero from '@/components/cinematic/Hero';
import ScrollSequence from '@/components/cinematic/ScrollSequence';
import StorySection from '@/components/cinematic/StorySection';
import RiskForm from '@/components/interactive/RiskForm';
import ResultsDisplay from '@/components/interactive/ResultsDisplay';
import Preloader from '@/components/cinematic/Preloader';
import CustomCursor from '@/components/cinematic/CustomCursor';
import SmoothScroll from '@/components/cinematic/SmoothScroll';

export default function Home() {
  const { prediction } = useRiskStore();

  return (
    <SmoothScroll>
      <main className="relative bg-background min-h-screen selection:bg-primary/30">
        <Preloader />
        <CustomCursor />

        {/* Cinematic Background Layer */}
        <div className="fixed inset-0 z-0">
          <ScrollSequence frameCount={240} />
        </div>

        {/* Content Layers */}
        <div className="relative z-10">
          <Hero />

          <StorySection 
            title="Beyond Traditional Scoring" 
            text="Traditional scoring methods often miss the behavioral nuances of modern borrowers. Our AI-driven model leverages deep financial patterns to uncover true risk variables."
            side="left"
          />

          <StorySection 
            title="The Logistic Calibration" 
            text="Using a state-of-the-art Logistic Regression model with Robust Scaling, we achieve unmatched stability across diverse demographic data."
            side="right"
          />

          <StorySection 
            title="Financial Transparency" 
            text="We believe in open banking data and clear decision paths. Every prediction is backed by detailed probability analysis and confidence scoring."
            side="left"
          />

          {/* Core Interactive Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-8">
            <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-ultimate text-primary uppercase">
                  EXPERIENCE THE ALGORITHM
                </span>
                <h2 className="text-5xl font-light tracking-tightest">
                  {prediction !== null ? 'Your Risk Analysis' : 'Analyze Your Position'}
                </h2>
              </div>

              {prediction === null ? <RiskForm /> : <ResultsDisplay />}
            </div>
          </section>

          {/* Premium Footer */}
          <footer className="relative h-[40vh] border-t border-white/5 flex flex-col items-center justify-center text-center px-8">
            <div className="space-y-4 opacity-50">
              <span className="text-[10px] font-mono tracking-ultimate uppercase">Antigravity Financial Technologies</span>
              <p className="max-w-xs text-[10px] font-sans tracking-wide leading-relaxed font-light">
                This tool is for educational purposes. Always consult a certified financial advisor for formal credit analysis.
              </p>
            </div>
            <div className="mt-8 flex space-x-8 text-[10px] font-mono tracking-widest text-muted-foreground uppercase uppercase">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
              <a href="#" className="hover:text-primary transition-colors">V2.1.0</a>
            </div>
          </footer>
        </div>
      </main>
    </SmoothScroll>
  );
}
