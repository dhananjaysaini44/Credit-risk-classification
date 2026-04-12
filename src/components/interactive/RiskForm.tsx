'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Wallet, 
  CreditCard, 
  Briefcase, 
  GraduationCap, 
  Home, 
  ChevronRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useRiskStore } from '@/store/useRiskStore';

const STEPS = [
  { id: 'age', label: 'Personal Information', icon: User, field: 'age', unit: 'Years', min: 18, max: 100 },
  { id: 'income', label: 'Annual Income', icon: Wallet, field: 'income', unit: '$', min: 1000, max: 500000 },
  { id: 'loan', label: 'Requested Loan', icon: CreditCard, field: 'loanAmount', unit: '$', min: 500, max: 100000 },
  { id: 'score', label: 'Credit Score', icon: Briefcase, field: 'creditScore', unit: 'Points', min: 300, max: 850 },
  { id: 'employment', label: 'Work Tenure', icon: GraduationCap, field: 'employmentYears', unit: 'Years', min: 0, max: 50 },
];

export default function RiskForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { data, updateData, isLoading, setPrediction, setLoading, setError } = useRiskStore();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Transitioning to result state
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('API Sync Failed');

      const result = await response.json();
      setPrediction(result.prediction, result.probability);
    } catch (err) {
      setError('Model unavailable. Ensure the FastAPI backend is running.');
    }
  };

  const current = STEPS[currentStep];

  return (
    <div className="relative w-full max-w-xl mx-auto z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="glass p-12 rounded-2xl flex flex-col space-y-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <current.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-ultimate text-muted-foreground uppercase mb-1">
                Step 0{currentStep + 1} OF 0{STEPS.length}
              </p>
              <h3 className="text-2xl font-light tracking-tight text-foreground">{current.label}</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <input
                type="number"
                value={data[current.field as keyof typeof data]}
                onChange={(e) => updateData({ [current.field]: Number(e.target.value) })}
                className="w-full bg-transparent border-b border-white/10 py-4 text-4xl font-light outline-none transition-colors group-hover:border-primary/50 focus:border-primary pr-12 tabular-nums"
              />
              <span className="absolute right-0 bottom-4 text-sm font-mono text-muted-foreground uppercase tracking-widest">
                {current.unit}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40">
              <span>MIN: {current.min}</span>
              <span>MAX: {current.max}</span>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isLoading}
            className="group w-full flex items-center justify-between p-4 bg-primary rounded-xl text-white font-light tracking-widest transition-all hover:bg-primary/90 hover:scale-[1.02] disabled:opacity-50"
          >
            <span>{currentStep === STEPS.length - 1 ? 'REVEAL RISK ANALYSIS' : 'NEXT STAGE'}</span>
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center space-x-2">
        {STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-500 rounded-full ${
              i === currentStep ? 'w-8 bg-primaryShadow' : 'w-2 bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
