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
            title="About the Data" 
            text="The underlying dataset consists of a comprehensive sample of loan applicants, capturing core behavioral and financial signals. By analyzing the interplay between income levels, credit scores, and stability indices, our model uncovers hidden correlations that drive real-world default risk."
            side="left"
            imageUrl="/dataset_dashboard.png"
          />

          <StorySection 
            title="Data Processing" 
            text="To handle the inherent class imbalance, we implement SMOTE (Synthetic Minority Over-sampling Technique) to generate mathematically plausible default instances. This is followed by Robust Scaling to mitigate outlier influence and comprehensive encoding of categorical stability indices. These steps ensure the model learns from a perfectly balanced and normalized feature space, maximizing predictive reliability across all segments."
            side="right"
            imageUrl="/smote_theme.png"
          />

          <StorySection 
            title="Model Training" 
            text="The Model Training leverages Logistic Regression, specifically calibrated with a 0.4 threshold to achieve the highest possible recall of 93% for default identification. While this peak performance on the dataset results in a precision of 18% and an F1-score of 30%, it ensures maximum safety by catching nearly every high-risk applicant. This model represents the optimal balance for defensive credit strategy."
            side="left"
            imageUrl="/confusion_matrix_v3.png"
          />

          {/* Core Interactive Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-8">
            <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-5xl font-light tracking-tightest">
                  {prediction !== null ? 'Your Risk Analysis' : 'Try it Yourself'}
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
