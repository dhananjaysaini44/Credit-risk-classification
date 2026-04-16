'use client';

import { motion } from 'framer-motion';
import { useRiskStore } from '@/store/useRiskStore';

interface ResultsDisplayProps {
  onReset?: () => void;
}

export default function ResultsDisplay({ onReset }: ResultsDisplayProps) {
  const { prediction, probability, data, setPrediction, setError, selectedModel, setSelectedModel, isLoading, setLoading } = useRiskStore();

  if (prediction === null) return null;

  const handleReEvaluate = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, modelType: selectedModel }),
      });

      if (!response.ok) throw new Error('Model Engine Error');
      const result = await response.json();
      setPrediction(result.prediction, result.probability);
    } catch {
      setError('Evaluation Failed');
    } finally {
      setLoading(false);
    }
  };

  const isHighRisk = prediction === 1;
  const statusColor = isHighRisk ? 'text-secondary' : 'text-primary';
  const label = isHighRisk ? 'HIGH RISK DETECTED' : 'STABLE ASSET PROFILE';
  const percentage = ((probability || 0) * 100).toFixed(2);

  const handleReset = () => {
    setPrediction(null as never, null as never);
    setError(null);
    if (onReset) onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-8 md:p-12 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4">
        <div className={`h-2 w-2 rounded-full ${isHighRisk ? 'bg-secondary' : 'bg-primary'} animate-pulse`} />
      </div>
      <div className="flex flex-col items-center text-center space-y-6 mb-12 relative z-10">
        <h3 className={`font-headline text-3xl md:text-5xl font-bold tracking-tightest ${statusColor}`}>
          {label}
        </h3>
        <p className="font-body text-foreground/60 max-w-md mx-auto text-sm leading-relaxed">
          {isHighRisk
            ? "Primary assessment indicates significant risk probability. We recommend further analysis of your profile as the model is still in its early stages of development."
            : "Primary assessment indicates stability within current fiscal parameters thus you can proceed with the loan application."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
        {/* Probability Metric */}
        <div className="p-6 bg-muted/20 border-l-2 border-primary">
          <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2">Confidence Level</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-white">{percentage}</span>
            <span className="text-primary text-sm font-mono">%</span>
          </div>
        </div>

        {/* Prediction Trace */}
        <div className="p-6 bg-muted/20 border-l-2 border-secondary">
          <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-secondary/60 mb-2">Prediction Scale</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-white">{prediction}</span>
            <span className="text-secondary text-sm font-mono">/ 1.0</span>
          </div>
        </div>

        {/* Recalibrate Trigger */}
        <button
          onClick={handleReset}
          className="p-6 bg-muted/10 border-l-2 border-white hover:bg-muted/20 transition-colors text-left group/btn"
        >
          <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">System Reset</p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-headline font-medium text-white group-hover/btn:text-primary transition-colors">
              RECALIBRATE MODEL
            </span>
            <span className="material-symbols-outlined text-white/40 group-hover/btn:rotate-180 transition-transform duration-500">sync</span>
          </div>
        </button>
      </div>

      {/* Parameter Telemetry Summary */}
      <div className="relative z-10 bg-muted/5 border border-white/5 p-4 md:p-6 rounded-sm">
        <h4 className="font-headline text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-foreground/40 mb-5 pb-2 border-b border-white/5">Analyzed Profile Telemetry</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 md:gap-x-8">
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Age</p>
            <p className="text-[16px] font-mono text-white">{data.age}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Income</p>
            <p className="text-[16px] font-mono text-white">₹{data.income.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Loan Amount</p>
            <p className="text-[16px] font-mono text-white">₹{data.loanAmount.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Credit Score</p>
            <p className="text-[16px] font-mono text-white">{data.creditScore}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Emp. Years</p>
            <p className="text-[16px] font-mono text-white">{data.employmentYears}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Housing</p>
            <p className="text-[16px] font-mono text-white">{data.housingStatus}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white/20 uppercase font-mono">Education</p>
            <p className="text-[16px] font-mono text-white">{data.educationLevel}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-wrap gap-4">
          <div className="text-[12px] font-mono text-primary/40 uppercase bg-primary/5 px-3 py-1.5 border border-primary/10">THRESHOLD: 0.40</div>
          <div className="text-[12px] font-mono text-secondary/40 uppercase bg-secondary/5 px-3 py-1.5 border border-secondary/10">
            MODEL: {
              selectedModel === 'Logistic Regression' ? 'LOG_REG_V2' :
              selectedModel === 'Random Forest' ? 'RF_OPT_V2' :
              selectedModel === 'XGBoost' ? 'XGB_V2' :
              selectedModel === 'KNN' ? 'KNC_V2' : selectedModel
            }
          </div>
          <div className="text-[12px] font-mono text-primary/40 uppercase bg-primary/5 px-3 py-1.5 border border-primary/10">STABILITY: NOMINAL</div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative w-full md:w-auto">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none bg-[#0a0c10]/40 border border-white/10 text-white text-[11px] font-mono uppercase pl-4 pr-10 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer hover:bg-[#0a0c10]/60 transition-all w-full md:w-[180px] rounded-none"
            >
              <option value="Logistic Regression">Logistic Regression</option>
              <option value="Random Forest">Random Forest</option>
              <option value="XGBoost">XGBoost</option>
              <option value="KNN">KNN</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>

          <button
            onClick={handleReEvaluate}
            disabled={isLoading}
            className="group/eval w-full md:w-auto bg-primary/10 border border-primary/20 hover:bg-primary hover:text-[#0a0c10] text-primary text-[11px] font-mono uppercase px-8 py-3 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-[18px] group-hover/eval:scale-110 transition-transform">terminal</span>
            )}
            <span className="relative z-10">Re-run Evaluation</span>
            {isLoading && (
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c3f5ff_1px,transparent_1px)] [background-size:24px_24px]" />
    </motion.div>
  );
}
