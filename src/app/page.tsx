'use client';

import Hero from "@/components/cinematic/Hero";
import StorySection from "@/components/cinematic/StorySection";
import RiskForm from "@/components/interactive/RiskForm";
import CustomCursor from "@/components/cinematic/CustomCursor";

export default function Home() {
  return (
    <main className="relative bg-transparent min-h-screen selection:bg-primary/30">
      <CustomCursor />

      {/* Hero Tier */}
      <Hero />

      {/* Diagnostic Grid Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StorySection
            number="01"
            title="Logistic Regression"
            cmd="eval --logistic-v2"
            status="STABLE"
            icon="analytics"
          >
            <p className="mb-4">
              A foundational linear model optimized for interpretability. It serves as our baseline, delivering exceptional recall in detecting high-risk profiles by leveraging a calibrated sigmoid decision threshold.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">92.86%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">18.06%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">30.23%</span>
              </div>
            </div>
          </StorySection>

          <StorySection
            number="02"
            title="Optimized Random Forest"
            cmd="eval --rf-ensemble"
            status="OPTIMIZED"
            icon="account_tree"
          >
            <p className="mb-4">
              An ensemble of decision trees engineered to minimize variance. This model excels at identifying non-linear patterns across diverse income brackets while maintaining consistent predictive stability.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">32.14%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">18.00%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">23.08%</span>
              </div>
            </div>
          </StorySection>

          <StorySection
            number="03"
            title="XGBoost Gradient Engine"
            cmd="eval --xgboost-v2"
            status="ACCELERATED"
            icon="speed"
          >
            <p className="mb-4">
              A high-performance boosting framework that targets residual errors. It captures the most intricate financial signals, although current metrics reflect the high complexity of the training dataset.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">3.57%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">9.09%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">5.13%</span>
              </div>
            </div>
          </StorySection>

          <StorySection
            number="04"
            title="K-Nearest Neighbors"
            cmd="eval --knn-map"
            status="ROBUST"
            icon="analytics"
          >
            <p className="mb-4">
              A proximity-based classifier that maps new applications against historical fiscal clusters. It provides a intuitive similarity score, effectively capturing localized localized trends in borrowing behavior.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-primary/5 border-l-2 border-primary p-2">
                <span className="block text-[10px] text-primary/40 uppercase font-mono">Recall</span>
                <span className="text-sm font-bold text-white">64.29%</span>
              </div>
              <div className="bg-secondary/5 border-l-2 border-secondary p-2">
                <span className="block text-[10px] text-secondary/40 uppercase font-mono">Prec.</span>
                <span className="text-sm font-bold text-white">12.41%</span>
              </div>
              <div className="bg-white/5 border-l-2 border-white/20 p-2">
                <span className="block text-[10px] text-white/40 uppercase font-mono">F1</span>
                <span className="text-sm font-bold text-white">20.81%</span>
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
      <footer className="py-12 px-8 border-t border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-sm">satellite_alt</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Mastering the Margin / Analytical Node Beta</span>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em]">All telemetry active // 2016-2024 Dataset</p>
        </div>
      </footer>
    </main>
  );
}
