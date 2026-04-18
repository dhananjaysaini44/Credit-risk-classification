"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RandomForestDoc() {
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
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] mb-4 block">Engine Architecture // ARCH-RF-V3</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline text-white mb-8 tracking-tighter">
              Random Forest <span className="text-primary italic">Ensemble</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
              An ensemble learning architecture that leverages a multitude of decision trees to deliver robust classification. Random Forest handles high-dimensional data by aggregating votes from decorrelated base-learners.
            </p>
          </motion.div>
        </section>

        {/* Structural Analysis */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Ensemble Size", val: "100 Trees", desc: "Bootstrap aggregated voters" },
            { title: "Split Criteria", val: "Gini Impurity", desc: "Optimal feature segregation" },
            { title: "Max Depth", val: "None", desc: "Fully grown tree expansion" },
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
              <p className="text-[10px] text-primary uppercase tracking-wider mt-4">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Evaluation Metrics Visualization */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10">Evaluation Matrix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Recall', val: '71.36%', desc: 'Capture Rate', color: 'primary' },
              { label: 'Precision', val: '20.45%', desc: 'Signal Purity', color: 'secondary' },
              { label: 'Accuracy', val: '64.62%', desc: 'Global Accuracy', color: 'white' },
              { label: 'F1 Score', val: '31.79%', desc: 'Weighted Balance', color: 'primary' },
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
                The Random Forest architecture stabilizes classification across the 0.35 boundary by averaging uncorrelated tree errors. This results in a higher accuracy (64.6%) compared to the Logistic baseline while maintaining a respectable recall.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/20">
                  <span className="block text-[8px] font-mono text-white/40 uppercase mb-1">True Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">28,792</span>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20">
                  <span className="block text-[8px] font-mono text-secondary/40 uppercase mb-1">False Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">16,378</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/10">
                  <span className="block text-[8px] font-mono text-white/20 uppercase mb-1">False Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">1,690</span>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20">
                  <span className="block text-[8px] font-mono text-primary/40 uppercase mb-1">True Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">4,210</span>
                </div>
              </div>
            </div>
            
            {/* Visual Matrix */}
            <div className="relative p-8 border border-white/5 bg-white/[0.01]">
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <div className="aspect-square bg-white/[0.03] flex flex-col items-center justify-center border border-white/5 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">28.8k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TN</span>
                </div>
                <div className="aspect-square bg-secondary/10 flex flex-col items-center justify-center border border-secondary/20 group hover:bg-secondary/20 transition-colors">
                  <span className="text-2xl font-bold text-white">16.4k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FP</span>
                </div>
                <div className="aspect-square bg-white/5 flex flex-col items-center justify-center border border-white/10 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">1.7k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FN</span>
                </div>
                <div className="aspect-square bg-primary/20 flex flex-col items-center justify-center border border-primary/30 group hover:bg-primary/30 transition-colors">
                  <span className="text-2xl font-bold text-white">4.2k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TP</span>
                </div>
              </div>
              <div className="absolute -left-6 top-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-widest text-white/20">Actual Class</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-white/20">Predicted Class</div>
            </div>
          </div>
        </section>

        {/* Ensemble Voting Logic */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Ensemble Consensus Logic</h2>
          
          <div className="glass-panel p-8 md:p-12 border-white/5 relative overflow-hidden h-[450px] bg-gradient-to-br from-white/[0.02] to-transparent">
             {/* Complex Forest SVG */}
             <div className="absolute inset-0 flex items-center justify-center p-12">
               <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
                 <defs>
                   <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                     <feGaussianBlur stdDeviation="3" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                 </defs>

                 {/* Tree Strands representing parallel learners */}
                 {[0, 1, 2, 3, 4].map((i) => (
                   <g key={i} transform={`translate(${i * 200}, 0)`} className="opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">
                     {/* Tree Structure */}
                     <line x1="100" y1="50" x2="60" y2="150" stroke="#c3f5ff" strokeWidth="1" />
                     <line x1="100" y1="50" x2="140" y2="150" stroke="#c3f5ff" strokeWidth="1" />
                     <circle cx="100" cy="50" r="4" className="fill-primary" filter="url(#nodeGlow)" />
                     
                     <line x1="60" y1="150" x2="30" y2="250" stroke="white" strokeOpacity="0.1" />
                     <line x1="60" y1="150" x2="90" y2="250" stroke="white" strokeOpacity="0.1" />
                     <circle cx="60" cy="150" r="3" className="fill-white/20" />
                     
                     <line x1="140" y1="150" x2="110" y2="250" stroke="white" strokeOpacity="0.1" />
                     <line x1="140" y1="150" x2="170" y2="250" stroke="white" strokeOpacity="0.1" />
                     <circle cx="140" cy="150" r="3" className="fill-white/20" />

                     {/* Result Nodes */}
                     <rect x="25" y="250" width="10" height="10" className={i % 2 === 0 ? "fill-secondary" : "fill-primary/40"} />
                     <rect x="85" y="250" width="10" height="10" className="fill-white/10" />
                     <rect x="105" y="250" width="10" height="10" className="fill-secondary/60" />
                     <rect x="165" y="250" width="10" height="10" className="fill-primary" />
                   </g>
                 ))}

                 {/* Aggregator Node */}
                 <motion.g
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1 }}
                 >
                   {/* Voting Lines */}
                   {[100, 300, 500, 700, 900].map((x, i) => (
                     <line key={i} x1={x} y1="260" x2="500" y2="350" stroke="white" strokeOpacity="0.05" strokeDasharray="4 2" />
                   ))}
                   <circle cx="500" cy="350" r="15" className="fill-primary/20 stroke-primary stroke-[2]" filter="url(#nodeGlow)" />
                   <text x="525" y="355" className="fill-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em]">Majority Vote Consensus</text>
                 </motion.g>
               </svg>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Bootstrap Aggregating (Bagging)
              </h4>
              <p className="text-foreground/50 text-xs leading-relaxed">
                By training each tree on a different random subset of the observations (bootstrap samples), we reduce the overall variance of the model without increasing bias. This makes the Random Forest ARCH-V3 exceptionally resistant to outliers in financial data.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                Feature Importances
              </h4>
              <p className="text-foreground/50 text-xs leading-relaxed">
                The model automatically calculates Gini Importance globally. Our analysis shows that <span className="text-white">Loan Intent</span> and <span className="text-white">Person Income</span> are the top-weighted predictors, driving key branch splits in the ensemble forest.
              </p>
            </div>
          </div>
        </section>

        {/* Threshold Comparison Table */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Ensemble Optimization Vector</h2>
          <div className="overflow-x-auto ring-1 ring-white/5">
            <table className="w-full text-left font-mono text-[10px] md:text-[11px] border-collapse relative overflow-hidden">
              <thead className="bg-white/5 text-primary tracking-widest uppercase">
                <tr>
                  <th className="p-4 border-b border-white/10">Threshold</th>
                  <th className="p-4 border-b border-white/10">Recall</th>
                  <th className="p-4 border-b border-white/10">Accuracy</th>
                  <th className="p-4 border-b border-white/10">F1 Score</th>
                  <th className="p-4 border-b border-white/10">Risk bias</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.50 (RF-BASE)</td>
                  <td className="p-4">41.39%</td>
                  <td className="p-4 text-primary">81.78%</td>
                  <td className="p-4">34.42%</td>
                  <td className="p-4 text-white/30 uppercase italic">Maximum Accuracy</td>
                </tr>
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.40 (RF-MID)</td>
                  <td className="p-4">61.68%</td>
                  <td className="p-4">71.77%</td>
                  <td className="p-4">33.55%</td>
                  <td className="p-4 text-white/30 uppercase italic">Balanced</td>
                </tr>
                <tr className="bg-primary/10 text-primary border-b border-primary/20 font-bold">
                  <td className="p-4">0.35 (DOCS-OPT)</td>
                  <td className="p-4 text-white">71.36%</td>
                  <td className="p-4">64.62%</td>
                  <td className="p-4">31.79%</td>
                  <td className="p-4 uppercase tracking-tighter">High Retrieval</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Training Methodology */}
        <section className="mb-20 space-y-12">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider border-l-4 border-primary pl-4">Training Pipeline</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-primary font-bold border border-white/10">01</div>
              <div>
                <h3 className="text-white uppercase font-headline text-lg mb-2">Bootstrap Aggregation</h3>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  Datasets are sampled with replacement to create 100 unique training subsets. This 'Bagging' process ensures each tree develops unique feature interaction weights.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-primary font-bold border border-white/10">02</div>
              <div>
                <h3 className="text-white uppercase font-headline text-lg mb-2">Feature Subsampling</h3>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  At each split, only a random subset of features is considered. This decorrelates the trees, making the ensemble significantly more robust to noise than a single Decision Tree.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 flex justify-between items-center opacity-40">
          <p className="font-mono text-[10px] uppercase">End of Documentation // ARCH-RF-V3</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="material-symbols-outlined text-sm">encrypted</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
