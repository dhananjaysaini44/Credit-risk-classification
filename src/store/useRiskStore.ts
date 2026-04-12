import { create } from 'zustand';

interface RiskState {
  prediction: number | null;
  probability: number | null;
  isLoading: boolean;
  error: string | null;
  data: {
    age: number;
    income: number;
    loanAmount: number;
    creditScore: number;
    employmentYears: number;
    educationLevel: string;
    housingStatus: string;
  };
  loadProgress: number;
  setLoadProgress: (progress: number) => void;
  setPrediction: (prediction: number, probability: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateData: (newData: Partial<RiskState['data']>) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  loadProgress: 0,
  prediction: null,
  probability: null,
  isLoading: false,
  error: null,
  // ... rest of state
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  data: {
    age: 30,
    income: 50000,
    loanAmount: 10000,
    creditScore: 700,
    employmentYears: 5,
    educationLevel: 'Bachelors',
    housingStatus: 'Rent',
  },
  setPrediction: (prediction, probability) => set({ prediction, probability, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error, isLoading: false }),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
