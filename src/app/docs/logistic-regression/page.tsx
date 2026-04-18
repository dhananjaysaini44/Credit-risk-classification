'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LogisticRegressionDocs() {
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
        <header className="mb-20 border-b border-white/5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] mb-4 block">Engine Architecture // ARCH-LR-V3</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tightest mb-6">
              Logistic <span className="text-primary">Regression</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
              High-fidelity linear classification engine optimized for interpretability and high-recall risk detection.
            </p>
          </motion.div>
        </header>

        {/* Executive Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-headline text-2xl text-white uppercase tracking-wider border-l-4 border-primary pl-4">Architecture Objective</h2>
            <p className="text-foreground/70 leading-relaxed">
              In financial risk modeling, the cost of a **False Negative** (classifying a defaulter as safe) significantly outweighs the cost of a **False Positive**. Our Logistic Regression implementation is engineered specifically to serve as the {"platform's"} safety net, maximizing retrieval of high-risk candidates.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              We utilized a binary classification framework with a Sigmoid activation function, mapping a weighted sum of 16 feature-vectors to a probability space [0, 1].
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm space-y-6">
            <h4 className="font-headline text-[11px] uppercase tracking-widest text-primary/40">Core Features</h4>
            <ul className="space-y-4 font-mono text-[10px] text-foreground/60 uppercase tracking-wider">
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-primary rounded-full" />
                L2 Regularization (Ridge)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-primary rounded-full" />
                Standardized Scaling
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-primary rounded-full" />
                Inverse Prob. Calibration
              </li>
            </ul>
          </div>
        </section>

        {/* Evaluation Metrics Visualization */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10">Evaluation Matrix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Recall', val: '85.75%', desc: 'Capture Rate', color: 'primary' },
              { label: 'Precision', val: '17.53%', desc: 'Signal Purity', color: 'secondary' },
              { label: 'Accuracy', val: '51.75%', desc: 'Global Accuracy', color: 'white' },
              { label: 'F1 Score', val: '29.11%', desc: 'Weighted Balance', color: 'primary' },
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

        {/* The 0.35 Threshold Breakthrough */}
        <section className="mb-20 bg-primary/5 border border-primary/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-9xl">security</span>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-headline text-3xl text-primary mb-6">The 0.35 Threshold Rationale</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              While the standard statistical boundary for logistic regression is **0.5**, our cross-validation audits revealed a critical deficiency in recall at this level. In the domain of credit risk, sensitivity is paramount.
            </p>
            <div className="bg-[#0a0c10] border border-white/5 p-6 mb-8 font-mono text-xs space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">Default (0.50):</span>
                <span className="text-secondary font-bold">~31.2% Recall</span>
              </div>
              <div className="flex justify-between text-primary">
                <span className="font-bold">Optimized (0.35):</span>
                <span className="font-bold">85.75% Recall</span>
              </div>
            </div>
            <p className="text-foreground/60 text-sm italic border-l-2 border-primary/40 pl-4">
              &quot;By shifting the decision boundary to 0.35, we accept a higher false-alarm rate in exchange for a nearly 3x increase in critical risk detection capability.&quot;
            </p>
          </div>
        </section>

        {/* Confusion Matrix Section */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-secondary pl-4">Boundary Performance [0.35]</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-foreground/70 leading-relaxed md:text-lg">
                The confusion matrix below illustrates the {"model's"} behavior at the ground-truth 0.35 decision boundary. Realigned to match official validation charts, showing the high safety-net containment for risky profiles.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/20">
                  <span className="block text-[8px] font-mono text-white/40 uppercase mb-1">True Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">21,371</span>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20">
                  <span className="block text-[8px] font-mono text-secondary/40 uppercase mb-1">False Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">23,799</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/10">
                  <span className="block text-[8px] font-mono text-white/20 uppercase mb-1">False Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">841</span>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20">
                  <span className="block text-[8px] font-mono text-primary/40 uppercase mb-1">True Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">5,059</span>
                </div>
              </div>
            </div>

            {/* Visual Matrix */}
            <div className="relative p-8 border border-white/5 bg-white/[0.01]">
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <div className="aspect-square bg-white/[0.03] flex flex-col items-center justify-center border border-white/5 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">21.4k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TN</span>
                </div>
                <div className="aspect-square bg-secondary/10 flex flex-col items-center justify-center border border-secondary/20 group hover:bg-secondary/20 transition-colors">
                  <span className="text-2xl font-bold text-white">23.8k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FP</span>
                </div>
                <div className="aspect-square bg-white/5 flex flex-col items-center justify-center border border-white/10 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">0.8k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FN</span>
                </div>
                <div className="aspect-square bg-primary/20 flex flex-col items-center justify-center border border-primary/30 group hover:bg-primary/30 transition-colors">
                  <span className="text-2xl font-bold text-white">5.1k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TP</span>
                </div>
              </div>
              <div className="absolute -left-6 top-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-widest text-white/20">Actual Class</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-white/20">Predicted Class</div>
            </div>
          </div>
        </section>

        {/* Logistic Sigmoid Profile */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Logistic Probability Profile</h2>

          <div className="glass-panel p-8 md:p-12 border-white/5 relative overflow-hidden h-[400px]">
            {/* Sigmoid SVG Chart */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                <line x1="0" y1="200" x2="1000" y2="200" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <line x1="0" y1="0" x2="1000" y2="0" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <line x1="0" y1="400" x2="1000" y2="400" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

                {/* Sigmoid Curve */}
                <motion.path
                  d="M 0 380 Q 250 380 500 200 T 1000 20"
                  fill="none"
                  stroke="url(#sigmoidGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Probability Labels */}
                <text x="5" y="15" className="fill-white/20 font-mono text-[10px]">P = 1.0 [DEFAULT]</text>
                <text x="5" y="215" className="fill-white/20 font-mono text-[10px]">P = 0.5</text>
                <text x="5" y="395" className="fill-white/20 font-mono text-[10px]">P = 0.0 [STABLE]</text>

                {/* 0.35 Threshold Line */}
                <g className="threshold-indicator">
                  <line x1="390" y1="0" x2="390" y2="400" stroke="#ff4d4d" strokeDasharray="4 4" strokeOpacity="0.5" />
                  <circle cx="390" cy="275" r="5" className="fill-secondary shadow-lg" />
                  <text x="400" y="265" className="fill-secondary font-mono text-[10px] uppercase font-bold tracking-widest">Calibration Target: 0.35</text>
                </g>

                {/* Gradients */}
                <defs>
                  <linearGradient id="sigmoidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c3f5ff" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#c3f5ff" />
                    <stop offset="100%" stopColor="#c3f5ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom Metadata */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-center opacity-40">
              <span className="font-mono text-[8px] uppercase tracking-widest whitespace-nowrap">Input Domain (z)</span>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-mono text-[8px] uppercase">Sigmoid Map</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-mono text-[8px] uppercase">Shifted Boundary</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm">Feature Mapping</h4>
              <p className="text-foreground/60 text-xs leading-relaxed">
                The chart visualizes the transformation of input feature vectors (Age, Income, Credit Score) into a singular probability output. At 0.35, the model enters a low-tolerance diagnostic mode, flagging applicants significantly earlier than a standard classifier.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm">Gradient Stability</h4>
              <p className="text-foreground/60 text-xs leading-relaxed">
                Regularization ensures the curve maintains a smooth, monotonic progression, preventing overfitting in regions of sparse data (e.g., extremely high income with low credit scores).
              </p>
            </div>
          </div>
        </section>

        {/* Threshold Comparison Table */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Threshold Optimization Vector</h2>
          <div className="overflow-x-auto ring-1 ring-white/5">
            <table className="w-full text-left font-mono text-[10px] md:text-[11px] border-collapse relative overflow-hidden">
              <thead className="bg-white/5 text-primary tracking-widest uppercase">
                <tr>
                  <th className="p-4 border-b border-white/10">Threshold</th>
                  <th className="p-4 border-b border-white/10">Recall</th>
                  <th className="p-4 border-b border-white/10">Precision</th>
                  <th className="p-4 border-b border-white/10">F1 Score</th>
                  <th className="p-4 border-b border-white/10">Risk bias</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.50 (Base)</td>
                  <td className="p-4">31.25%</td>
                  <td className="p-4 text-primary">45.10%</td>
                  <td className="p-4">36.90%</td>
                  <td className="p-4 text-white/30 uppercase italic">Conservative</td>
                </tr>
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.40 (Mid)</td>
                  <td className="p-4">65.40%</td>
                  <td className="p-4">25.30%</td>
                  <td className="p-4">36.50%</td>
                  <td className="p-4 text-white/30 uppercase italic">Balanced</td>
                </tr>
                <tr className="bg-primary/10 text-primary border-b border-primary/20 font-bold">
                  <td className="p-4">0.35 (DOCS-OPT)</td>
                  <td className="p-4 text-white">85.75%</td>
                  <td className="p-4">17.53%</td>
                  <td className="p-4">29.12%</td>
                  <td className="p-4 uppercase tracking-tighter">Maximum Retrieval</td>
                </tr>
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.30 (Low)</td>
                  <td className="p-4">90.00%</td>
                  <td className="p-4">16.30%</td>
                  <td className="p-4">26.50%</td>
                  <td className="p-4 text-white/30 uppercase italic">Biased</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[9px] text-foreground/40 leading-relaxed max-w-lg">
            *Comparison metrics derived from the V3 Validation set (51k samples). Bold indicates the current platform-wide deployment configuration for the Logistic V3 engine.
          </p>
        </section>

        {/* Training Methodology */}
        <section className="mb-20 space-y-12">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider border-l-4 border-primary pl-4">Training Pipeline</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-primary font-bold border border-white/10">01</div>
              <div>
                <h4 className="font-headline text-lg text-white mb-2 uppercase">Feature Normalization</h4>
                <p className="text-foreground/60 leading-relaxed">
                  Utilized <code>StandardScaler</code> to ensure coefficients remain scale-invariant. This prevents features like {"'Annual Income'"} from dominating the gradient updates over lower-magnitude features like {"'Dependents'"}.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-primary font-bold border border-white/10">02</div>
              <div>
                <h4 className="font-headline text-lg text-white mb-2 uppercase">L2 Regularization</h4>
                <p className="text-foreground/60 leading-relaxed">
                  Implemented a high penalty factor to handle multicollinearity among features such as {"'Months Employed'"} and {"'Age'"}, effectively shrinking redundant coefficients.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-primary font-bold border border-white/10">03</div>
              <div>
                <h4 className="font-headline text-lg text-white mb-2 uppercase">Sigmoid Mapping</h4>
                <p className="text-foreground/60 leading-relaxed">
                  The model outputs a continuous probability density. The decision to flag a {"'Default'"} is determined by our calibrated 0.35 boundary, which marks the transition into a high-risk operational zone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simulated Graph Component */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10">Risk Propagation Visualization</h2>
          <div className="glass-panel p-8 h-[300px] flex items-end justify-between gap-2 border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.sin(i * 0.2) * 40 + 50}%` }}
                transition={{ duration: 1.5, delay: i * 0.02 }}
                className={`w-full ${i > 14 ? 'bg-primary/40' : 'bg-white/10'}`}
              />
            ))}
            <div className="absolute inset-0 flex items-center px-8 pointer-events-none">
              <div className="w-full h-[1px] bg-secondary/50 border-t border-dashed border-secondary relative">
                <span className="absolute -top-6 right-0 font-mono text-[8px] text-secondary uppercase tracking-widest">Threshold: 0.35</span>
              </div>
            </div>
          </div>
          <p className="mt-4 font-mono text-[9px] text-foreground/30 uppercase tracking-[0.2em] text-center">Logistic Density Function / Threshold Crossing Matrix</p>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 flex justify-between items-center opacity-40">
          <p className="font-mono text-[10px] uppercase">End of Documentation // ARCH-LR-V3</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="material-symbols-outlined text-sm">encrypted</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
