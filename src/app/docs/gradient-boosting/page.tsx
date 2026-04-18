"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GradientBoostingDoc() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0c10] text-foreground font-body py-12 md:py-20 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">

        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            href="/"
            className="group flex items-center gap-2 text-white/40 hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Neural Hub
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] mb-4 block">Engine Architecture // ARCH-XGB-V3</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline text-white mb-8 tracking-tighter">
              Gradient <span className="text-secondary italic">Boosting</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
              An Extreme Gradient Boosting (XGBoost) implementation designed for surgical precision. It iteratively corrects residuals of previous learners, achieving the highest global accuracy and precision across the platform.
            </p>
          </motion.div>
        </section>

        {/* Structural Analysis */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Learning Rate", val: "0.1 [η]", desc: "Gradient step optimization" },
            { title: "Regularization", val: "L1 + L2", desc: "Prevents residual overfitting" },
            { title: "Tree Method", val: "Hist-Based", desc: "Ultra-fast binning logic" },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-8 border border-white/5 bg-white/[0.02] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-6">{item.title}</h3>
                <span className="text-3xl font-bold text-white tracking-tight">{item.val}</span>
              </div>
              <p className="text-[10px] text-secondary uppercase tracking-wider mt-4">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Evaluation Metrics Visualization */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10">Evaluation Matrix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Precision', val: '36.21%', desc: 'Signal Purity', color: 'secondary' },
              { label: 'Accuracy', val: '85.71%', desc: 'Global Accuracy', color: 'white' },
              { label: 'Recall', val: '31.10%', desc: 'Capture Rate', color: 'primary' },
              { label: 'F1 Score', val: '33.46%', desc: 'Weighted Balance', color: 'secondary' },
            ].map((metric) => (
              <div key={metric.label} className="glass-panel p-4 md:p-6 border-white/5">
                <span className="block text-[10px] uppercase font-mono tracking-widest text-white/30 mb-2">{metric.label}</span>
                <span className={`text-xl md:text-2xl font-bold font-headline mb-1 block ${metric.color === 'primary' ? 'text-primary' : metric.color === 'secondary' ? 'text-secondary' : 'text-white'}`}>
                  {metric.val}
                </span>
                <p className="text-[9px] font-mono uppercase tracking-tighter text-white/20">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Confusion Matrix Section */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-secondary pl-4">Boundary Performance [0.35]</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-foreground/70 leading-relaxed">
                The Gradient Boosting engine prioritizes precision. At the 0.35 threshold, it achieves a staggering 85.7% accuracy, by far the most stable performer for identifying high-certainty credit profiles.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/20">
                  <span className="block text-[8px] font-mono text-white/40 uppercase mb-1">True Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">41,937</span>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20">
                  <span className="block text-[8px] font-mono text-secondary/40 uppercase mb-1">False Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">3,233</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/10">
                  <span className="block text-[8px] font-mono text-white/20 uppercase mb-1">False Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">4,065</span>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20">
                  <span className="block text-[8px] font-mono text-primary/40 uppercase mb-1">True Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">1,835</span>
                </div>
              </div>
            </div>
            
            {/* Visual Matrix */}
            <div className="relative p-8 border border-white/5 bg-white/[0.01]">
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <div className="aspect-square bg-white/[0.03] flex flex-col items-center justify-center border border-white/5 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">41.9k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TN</span>
                </div>
                <div className="aspect-square bg-secondary/10 flex flex-col items-center justify-center border border-secondary/20 group hover:bg-secondary/20 transition-colors">
                  <span className="text-2xl font-bold text-white">3.2k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FP</span>
                </div>
                <div className="aspect-square bg-white/5 flex flex-col items-center justify-center border border-white/10 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">4.1k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FN</span>
                </div>
                <div className="aspect-square bg-primary/20 flex flex-col items-center justify-center border border-primary/30 group hover:bg-primary/30 transition-colors">
                  <span className="text-2xl font-bold text-white">1.8k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TP</span>
                </div>
              </div>
              <div className="absolute -left-6 top-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-widest text-white/20">Actual Class</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-white/20">Predicted Class</div>
            </div>
          </div>
        </section>

        {/* Iterative Residual Chart */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-secondary pl-4">Additive Residual Minimization</h2>
          
          <div className="glass-panel p-8 md:p-12 border-white/5 relative overflow-hidden h-[450px] bg-gradient-to-tr from-secondary/5 to-transparent">
             {/* Gradient SVG Chart */}
             <div className="absolute inset-0 flex items-center justify-center p-12">
               <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
                 <defs>
                    <linearGradient id="residGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id="chartClip">
                      <rect x="0" y="0" width="1000" height="350" />
                    </clipPath>
                 </defs>
                  {/* Coordinate System */}
                  <line x1="100" y1="350" x2="900" y2="350" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                  <line x1="100" y1="50" x2="100" y2="350" stroke="white" strokeOpacity="0.2" strokeWidth="1" />

                  <g clipPath="url(#chartClip)">
                    {/* Residual bars getting smaller - aligned with convergence logic */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                      const h = 220 / (i + 1.2);
                      return (
                        <motion.rect
                          key={i}
                          x={150 + i * 85}
                          y={350 - h}
                          width="30"
                          height={h}
                          initial={{ height: 0, y: 350 }}
                          animate={{ height: h, y: 350 - h }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          fill="url(#residGrad)"
                          className="stroke-secondary/30"
                        />
                      );
                    })}

                    {/* Convergence Curve - smooth decay */}
                    <motion.path
                      d="M 120 120 C 350 350, 600 340, 950 345"
                      fill="none"
                      stroke="#ff4d4d"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </g>
                  
                  <text x="500" y="385" textAnchor="middle" className="fill-secondary font-mono text-[9px] uppercase tracking-[0.4em]">Loss Minimization Vector (L1 + L2 Regularization)</text>
                  <text x="90" y="40" className="fill-white/20 font-mono text-[8px] uppercase tracking-widest">Global Error [Σ]</text>
                </svg>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                Step-wise Additive Modeling
              </h4>
              <p className="text-foreground/50 text-xs leading-relaxed">
                Unlike Random Forest which trains trees in parallel, XGBoost builds trees sequentially. Each new tree f_t(x_i) is trained to predict the residuals (errors) of the previous ensemble {"F_{t-1}(x_i)"}, surgically closing the gap between prediction and ground truth.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Sparsity-Aware Splitting
              </h4>
              <p className="text-foreground/50 text-xs leading-relaxed">
                The ARCH-XGB engine employs a unified algorithm for handling sparse data. When a feature value is missing, the model automatically learns a &apos;default direction&apos; for the split, ensuring robustness even with incomplete credit histories.
              </p>
            </div>
          </div>
        </section>

        {/* Threshold Comparison Table */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Optimization Vector</h2>
          <div className="overflow-x-auto ring-1 ring-white/5">
            <table className="w-full text-left font-mono text-[10px] md:text-[11px] border-collapse relative overflow-hidden">
              <thead className="bg-white/5 text-secondary tracking-widest uppercase">
                <tr>
                  <th className="p-4 border-b border-white/10">Threshold</th>
                  <th className="p-4 border-b border-white/10">Precision</th>
                  <th className="p-4 border-b border-white/10">Accuracy</th>
                  <th className="p-4 border-b border-white/10">F1 Score</th>
                  <th className="p-4 border-b border-white/10">Risk bias</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.50 (XGB-BASE)</td>
                  <td className="p-4 text-secondary">55.39%</td>
                  <td className="p-4 text-white">88.67%</td>
                  <td className="p-4">16.58%</td>
                  <td className="p-4 text-white/30 uppercase italic">Ultra Precision</td>
                </tr>
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.40 (XGB-MID)</td>
                  <td className="p-4">41.72%</td>
                  <td className="p-4">87.40%</td>
                  <td className="p-4">29.53%</td>
                  <td className="p-4 text-white/30 uppercase italic">Balanced</td>
                </tr>
                <tr className="bg-secondary/10 text-secondary border-b border-secondary/20 font-bold">
                  <td className="p-4">0.35 (DOCS-OPT)</td>
                  <td className="p-4 text-white">36.21%</td>
                  <td className="p-4">85.71%</td>
                  <td className="p-4">33.46%</td>
                  <td className="p-4 uppercase tracking-tighter">High Confidence</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Training Methodology */}
        <section className="mb-20 space-y-12">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider border-l-4 border-secondary pl-4">Training Pipeline</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-secondary font-bold border border-white/10">01</div>
              <div>
                <h3 className="text-white uppercase font-headline text-lg mb-2">Second-Order Taylor Expansion</h3>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  Unlike traditional gradient boosting, XGBoost uses a Taylor expansion of the loss function up to the second order. This allows the engine to optimize custom loss functions globally, utilizing both gradients (first order) and hessians (second order) for faster convergence.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-secondary font-bold border border-white/10">02</div>
              <div>
                <h3 className="text-white uppercase font-headline text-lg mb-2">Shrinkage & Column Subsampling</h3>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  To prevent overfitting in sparse credit data, XGBoost implements &apos;Shrinkage&apos; (Eta) which scales weights by a factor after each step of tree boosting. This, combined with column subsampling, ensures that no single feature dominates the ensemble&apos;s decision logic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 flex justify-between items-center opacity-40">
          <p className="font-mono text-[10px] uppercase">End of Documentation // ARCH-XGB-V3</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="material-symbols-outlined text-sm">encrypted</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
