'use client';

import { useEffect } from 'react';
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

  useEffect(() => {
    // Force scroll to top on every fresh mount to prevent session-jump
    window.scrollTo(0, 0);
  }, []);

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
                <h2 className="text-5xl font-light tracking-tightest">
                  {prediction !== null ? 'Your Risk Analysis' : 'Analyze Your Position'}
                </h2>
              </div>

              {prediction === null ? <RiskForm /> : <ResultsDisplay />}
            </div>
          </section>

        </div>
      </main>
    </SmoothScroll>
  );
}
