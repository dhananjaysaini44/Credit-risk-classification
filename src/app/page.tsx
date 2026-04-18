'use client';

import Hero from "@/components/cinematic/Hero";
import StorySection from "@/components/cinematic/StorySection";
import RiskForm from "@/components/interactive/RiskForm";
import CustomCursor from "@/components/cinematic/CustomCursor";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    // Ensure ScrollTrigger measures the full height correctly after layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-transparent min-h-screen selection:bg-primary/30">
      <CustomCursor />
      {/* Hero Tier */}
      <Hero />

      {/* Diagnostic Grid Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StorySection
            number="01"
            title="Logistic Regression"
            cmd="eval --logistic-v3"
            status="STABLE"
            icon="analytics"
            side="left"
            href="/docs/logistic-regression"
          >
            <p className="mb-4">
              A foundational linear model optimized for interpretability. It serves as our primary baseline, maximizing recall in detecting high-risk profiles via a calibrated 0.35 safety threshold.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">85.75%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">17.53%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">29.11%</span>
              </div>
            </div>
          </StorySection>

          <StorySection
            number="02"
            title="Optimized Random Forest"
            cmd="eval --rf-ensemble"
            status="OPTIMIZED"
            icon="account_tree"
            side="right"
            href="/docs/random-forest"
          >
            <p className="mb-4">
              An ensemble of 100 decision trees engineered for higher complexity. This model excels at identifying non-linear patterns across the dataset while maintaining consistent predictive stability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">71.36%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">20.45%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">31.79%</span>
              </div>
            </div>
          </StorySection>

          <StorySection
            number="03"
            title="XGBoost Gradient Engine"
            cmd="eval --xgboost-v3"
            status="ACCELERATED"
            icon="speed"
            side="left"
            href="/docs/gradient-boosting"
          >
            <p className="mb-4">
              A high-performance boosting framework targeting residual errors. It captures intricate financial signals Missed by linear classifiers, prioritizing precision-recall balance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">31.10%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">36.21%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">33.46%</span>
              </div>
            </div>
          </StorySection>

          <StorySection
            number="04"
            title="K-Nearest Neighbors"
            cmd="eval --knn-map"
            status="ROBUST"
            icon="analytics"
            side="right"
            href="/docs/knn"
          >
            <p className="mb-4">
              A proximity-based classifier mapping new credit applications against historical clusters. It provides high recall, capturing localized trends in borrowing behavior.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">82.56%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">15.50%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">26.10%</span>
              </div>
            </div>
          </StorySection>
        </div>
      </section>

      {/* Interactive Assessment Tier */}
      <section id="analyze" className="bg-gradient-to-t from-primary/5 to-transparent pb-32">
        <RiskForm />
      </section>

      {/* Footer Telemetry */}
      <footer className="py-6 px-8 border-t border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[12px]">satellite_alt</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] whitespace-nowrap">Mastering the Margin / Analytical Node Beta v3.0</span>
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] whitespace-nowrap">All telemetry active // 2011-2024 Dataset / 255k Records</p>
        </div>
      </footer>
    </main>
  );
}
