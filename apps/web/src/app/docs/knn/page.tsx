"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function KNNDoc() {
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
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] mb-4 block">Engine Architecture // ARCH-KNN-V3</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline text-white mb-8 tracking-tighter">
              K-Nearest <span className="text-primary italic">Neighbors</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
              A non-parametric, distance-based classifier that maps credit risk through vector proximity. By analyzing geometric clusters, it identifies risk based on local density in the multi-dimensional feature space.
            </p>
          </motion.div>
        </section>

        {/* Structural Analysis */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Neighbors [K]", val: "5 Nodes", desc: "Optimal proximity voting" },
            { title: "Metric", val: "Euclidean", desc: "Geometric distance calculation" },
            { title: "Weights", val: "Uniform", desc: "Equidistant neighbor voting" },
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
              { label: 'Recall', val: '82.56%', desc: 'Capture Rate', color: 'primary' },
              { label: 'Precision', val: '15.50%', desc: 'Signal Purity', color: 'secondary' },
              { label: 'Accuracy', val: '45.99%', desc: 'Global Accuracy', color: 'white' },
              { label: 'F1 Score', val: '26.10%', desc: 'Weighted Balance', color: 'primary' },
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
                The KNN model demonstrates aggressive recall. At the calibrated 0.35 threshold, it captures over 82% of risky profiles (4,871 cases), serving as a powerful wide-net diagnostic tool.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/20">
                  <span className="block text-[8px] font-mono text-white/40 uppercase mb-1">True Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">18,617</span>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20">
                  <span className="block text-[8px] font-mono text-secondary/40 uppercase mb-1">False Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">26,553</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/10">
                  <span className="block text-[8px] font-mono text-white/20 uppercase mb-1">False Negatives</span>
                  <span className="text-xl font-bold text-white tracking-widest">1,029</span>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20">
                  <span className="block text-[8px] font-mono text-primary/40 uppercase mb-1">True Positives</span>
                  <span className="text-xl font-bold text-white tracking-widest">4,871</span>
                </div>
              </div>
            </div>
            
            {/* Visual Matrix */}
            <div className="relative p-8 border border-white/5 bg-white/[0.01]">
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <div className="aspect-square bg-white/[0.03] flex flex-col items-center justify-center border border-white/5 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">18.6k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TN</span>
                </div>
                <div className="aspect-square bg-secondary/10 flex flex-col items-center justify-center border border-secondary/20 group hover:bg-secondary/20 transition-colors">
                  <span className="text-2xl font-bold text-white">26.6k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FP</span>
                </div>
                <div className="aspect-square bg-white/5 flex flex-col items-center justify-center border border-white/10 group hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-white">1.0k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">FN</span>
                </div>
                <div className="aspect-square bg-primary/20 flex flex-col items-center justify-center border border-primary/30 group hover:bg-primary/30 transition-colors">
                  <span className="text-2xl font-bold text-white">4.9k</span>
                  <span className="text-[8px] font-mono text-white/60 uppercase mt-1">TP</span>
                </div>
              </div>
              <div className="absolute -left-6 top-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-widest text-white/20">Actual Class</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-white/20">Predicted Class</div>
            </div>
          </div>
        </section>

        {/* Vector Distance Visualization */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Hyperspace Proximity Map</h2>
          
          <div className="glass-panel p-8 md:p-12 border-white/5 relative overflow-hidden h-[450px] bg-gradient-to-b from-primary/5 to-transparent">
             {/* Vector SVG Chart */}
             <div className="absolute inset-0 flex items-center justify-center p-12">
               <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
                 <defs>
                   <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                     <stop offset="0%" stopColor="#c3f5ff" stopOpacity="0.3" />
                     <stop offset="100%" stopColor="#c3f5ff" stopOpacity="0" />
                   </radialGradient>
                 </defs>

                 {/* Random Background Clusters */}
                 {[...Array(20)].map((_, i) => (
                   <circle 
                     key={i} 
                     cx={Math.random() * 1000} 
                     cy={Math.random() * 400} 
                     r="2" 
                     className="fill-white/10" 
                   />
                 ))}

                 {/* Active Search Cluster */}
                 <g className="active-assessment">
                    {/* Decision Boundary Circle */}
                    <circle cx="500" cy="200" r="120" className="fill-primary/5 stroke-primary/20 stroke-dasharray-[4,4]" />
                    
                    {/* Centroid (Target Applicant) */}
                    <motion.circle 
                      cx="500" cy="200" r="8" 
                      className="fill-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    
                    {/* 5-Nearest Neighbors */}
                    {[
                      {x: 450, y: 150, risk: true},
                      {x: 550, y: 180, risk: true},
                      {x: 480, y: 260, risk: true},
                      {x: 540, y: 240, risk: false},
                      {x: 510, y: 130, risk: true}
                    ].map((n, i) => (
                      <g key={i}>
                        <line x1="500" y1="200" x2={n.x} y2={n.y} stroke="white" strokeOpacity="0.2" />
                        <circle cx={n.x} cy={n.y} r="5" className={n.risk ? "fill-secondary" : "fill-white/40"} />
                        <circle cx={n.x} cy={n.y} r="10" className="fill-transparent stroke-white/5" />
                      </g>
                    ))}
                    
                    <text x="500" y="380" textAnchor="middle" className="fill-primary font-mono text-[9px] uppercase tracking-[0.5em]">Euclidean Proximity Scanning [K=5]</text>
                    <text x="630" y="200" className="fill-primary/40 font-mono text-[8px] uppercase font-bold tracking-widest">Decision Radius</text>
                 </g>
               </svg>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Dimensional Feature Scaling
              </h4>
              <p className="text-foreground/50 text-xs leading-relaxed">
                Because KNN relies on distance (L2 Norm), features with larger scales would dominate the calculation. Our ARCH-KNN implementation utilizes <span className="text-white">Min-Max Scaling</span> across all numeric vectors, ensuring that income figures and credit ratios influence the proximity equally.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-headline text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                The Curse of Dimensionality
              </h4>
              <p className="text-foreground/50 text-xs leading-relaxed">
                As feature dimensions increase, the data becomes sparse, making distance-based classification difficult. {"We've"} optimized the dimensionality through <span className="text-white">Recursive Feature Selection</span>, maintaining only the most discriminative vectors for geometric stability.
              </p>
            </div>
          </div>
        </section>

        {/* Threshold Comparison Table */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl text-white uppercase tracking-wider mb-10 border-l-4 border-primary pl-4">Distance Optimization Vector</h2>
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
                  <td className="p-4">0.50 (KNN-BASE)</td>
                  <td className="p-4">68.61%</td>
                  <td className="p-4 text-primary">59.69%</td>
                  <td className="p-4">28.23%</td>
                  <td className="p-4 text-white/30 uppercase italic">Metric-Standard</td>
                </tr>
                <tr className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="p-4">0.40 (KNN-MID)</td>
                  <td className="p-4">78.56%</td>
                  <td className="p-4">50.56%</td>
                  <td className="p-4">26.86%</td>
                  <td className="p-4 text-white/30 uppercase italic">Sensitive</td>
                </tr>
                <tr className="bg-primary/10 text-primary border-b border-primary/20 font-bold">
                  <td className="p-4">0.35 (DOCS-OPT)</td>
                  <td className="p-4 text-white">82.56%</td>
                  <td className="p-4">45.99%</td>
                  <td className="p-4">26.10%</td>
                  <td className="p-4 uppercase tracking-tighter">Wide Capture</td>
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
                <h3 className="text-white uppercase font-headline text-lg mb-2">Vector Dimensioning</h3>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  The training set is projected into a multi-dimensional hyperspace where each feature represents a coordinate axis. We utilize <span className="text-white">Recursive Feature Elimination (RFE)</span> to trim low-variance dimensions that would otherwise dilute the distance metric.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-white/5 flex items-center justify-center font-mono text-primary font-bold border border-white/10">02</div>
              <div>
                <h3 className="text-white uppercase font-headline text-lg mb-2">Global Feature Normalization</h3>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  To prevent high-magnitude features like {"'Total Income'"} from overwhelming the distance calculation, all vectors undergo <span className="text-white">Min-Max Scaling</span>. This maps all variables to a uniform [0,1] range, ensuring geometric equilibrium during neighbor search.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 flex justify-between items-center opacity-40">
          <p className="font-mono text-[10px] uppercase">End of Documentation // ARCH-KNN-V3</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="material-symbols-outlined text-sm">encrypted</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
