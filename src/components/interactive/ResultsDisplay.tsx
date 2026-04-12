'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Thermometer, RefreshCcw } from 'lucide-react';
import { useRiskStore } from '@/store/useRiskStore';

export default function ResultsDisplay() {
  const { prediction, probability, isLoading, setPrediction } = useRiskStore();

  if (prediction === null) return null;

  const isHighRisk = prediction === 1;
  const color = isHighRisk ? '#ef4444' : '#10b981';
  const label = isHighRisk ? 'HIGH RISK DETECTED' : 'STABLE ASSET PROFILE';
  const percentage = Math.round((probability || 0) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-12 rounded-3xl w-full max-w-xl mx-auto z-20 text-center space-y-8"
    >
      <div className="flex flex-col items-center space-y-2">
        {isHighRisk ? (
          <ShieldAlert className="w-16 h-16 text-risk-high animate-pulse" />
        ) : (
          <ShieldCheck className="w-16 h-16 text-risk-low" />
        )}
        <h3 
          className="text-2xl font-light tracking-ultimate pt-4"
          style={{ color }}
        >
          {label}
        </h3>
      </div>

      <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
        <div className="absolute top-0 right-0 h-full w-[2px] bg-white/20" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase mb-1">
            CONFIDENCE OFFSET
          </p>
          <p className="text-3xl font-light tabular-nums">{percentage}%</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase mb-1">
            PREDICTION SCALE
          </p>
          <p className="text-3xl font-light">{prediction}</p>
        </div>
      </div>

      <p className="text-xs font-light text-muted-foreground/60 max-w-sm mx-auto leading-relaxed">
        This analysis is based on the Logistic Regression v2.1 algorithm. 
        Calculated with a primary decision threshold of 0.40.
      </p>

      <button
        onClick={() => setPrediction(null as any, null as any)}
        className="flex items-center space-x-2 mx-auto text-[10px] font-mono tracking-widest text-primary hover:text-primary/80 transition-colors uppercase pt-4"
      >
        <RefreshCcw className="w-3 h-3" />
        <span>RECALIBRATE MODEL</span>
      </button>
    </motion.div>
  );
}
