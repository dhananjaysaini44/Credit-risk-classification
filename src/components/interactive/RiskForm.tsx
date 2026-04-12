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
  AlertCircle,
  BookOpen,
  Building2
} from 'lucide-react';
import { useRiskStore } from '@/store/useRiskStore';

const STEPS = [
  { id: 'age', label: 'How old are you?', icon: User, field: 'age', unit: 'Years', min: 18, max: 100, type: 'number' },
  { id: 'income', label: 'Your Annual worth?', icon: Wallet, field: 'income', unit: '$', min: 1000, max: 500000, type: 'number' },
  { id: 'loan', label: 'Your Asking?', icon: CreditCard, field: 'loanAmount', unit: '$', min: 500, max: 100000, type: 'number' },
  { id: 'score', label: 'Credit Score', icon: Briefcase, field: 'creditScore', unit: 'Points', min: 300, max: 850, type: 'number' },
  { id: 'employment', label: 'Your Experience?', icon: GraduationCap, field: 'employmentYears', unit: 'Years', min: 0, max: 50, type: 'number' },
  { id: 'education', label: 'Highest Education', icon: BookOpen, field: 'educationLevel', options: ['High School', 'Bachelors', 'Masters', 'PhD'], type: 'selection' },
  { id: 'housing', label: 'Housing Status', icon: Building2, field: 'housingStatus', options: ['Own', 'Rent', 'Mortgage'], type: 'selection' },
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/predict`, {
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

  const handleInputChange = (val: string) => {
    let num = Number(val);
    if (isNaN(num)) return;
    
    // Clamp to min/max defined in STEPS
    if (current.type === 'number') {
      const min = current.min || 0;
      const max = current.max || 9999999;
      if (num > max) num = max;
    }
    
    updateData({ [current.field]: num });
  };

  const current = STEPS[currentStep];

  return (
    <div className="relative w-full max-w-lg mx-auto z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="glass p-10 rounded-2xl flex flex-col space-y-6"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2.5 bg-white/5 rounded-lg">
              <current.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-1">
                Step 0{currentStep + 1} OF 0{STEPS.length}
              </p>
              <h3 className="text-2xl font-light tracking-tight text-foreground leading-tight">
                {current.label}
              </h3>
            </div>
          </div>

            {current.type === 'number' ? (
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="number"
                    value={data[current.field as keyof typeof data] || ''}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full bg-transparent border-b border-white/5 py-3 text-5xl font-extralight outline-none transition-all group-hover:border-primary/30 focus:border-primary pr-20 tabular-nums placeholder:text-white/5"
                  />
                  <span className="absolute right-0 bottom-4 text-[9px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em] pointer-events-none">
                    {current.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[8px] font-mono text-muted-foreground/20 px-0.5 pt-1 uppercase tracking-tightest">
                  <span>BASELINE MIN: {current.min}</span>
                  <span>THEORETICAL CEILING: {current.max}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {current.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => updateData({ [current.field]: option })}
                    className={`p-3 rounded-xl border text-[11px] font-light tracking-wide transition-all duration-500 ${
                      data[current.field as keyof typeof data] === option
                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/10 scale-[1.01]'
                        : 'bg-white/[0.02] border-white/5 text-muted-foreground/60 hover:bg-white/[0.05] hover:border-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="group w-full flex items-center justify-between p-3.5 bg-primary rounded-xl text-white transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/20 active:scale-[0.99] disabled:opacity-50 mt-2"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] pl-2">
              {currentStep === STEPS.length - 1 ? 'COLLECT ANALYSIS' : 'NEXT STAGE'}
            </span>
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-center space-x-1.5">
        {STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`h-0.5 transition-all duration-500 rounded-full ${
              i === currentStep ? 'w-6 bg-primary' : 'w-1.5 bg-white/5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
