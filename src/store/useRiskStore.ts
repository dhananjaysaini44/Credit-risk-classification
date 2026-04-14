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
  selectedModel: string;
  setLoadProgress: (progress: number) => void;
  setSelectedModel: (model: string) => void;
  setPrediction: (prediction: number, probability: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateData: (newData: Partial<RiskState['data']>) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  loadProgress: 0,
  selectedModel: 'Logistic Regression',
  prediction: null,
  probability: null,
  isLoading: false,
  error: null,
  data: {
    age: 30,
    income: 50000,
    loanAmount: 10000,
    creditScore: 700,
    employmentYears: 5,
    educationLevel: 'Bachelors',
    housingStatus: 'Rent',
  },
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setPrediction: (prediction, probability) => set({ prediction, probability, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error, isLoading: false }),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
