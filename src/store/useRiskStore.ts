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
    monthsEmployed: number;
    numCreditLines: number;
    interestRate: number;
    loanTerm: number;
    dtiRatio: number;
    education: string;
    employmentType: string;
    maritalStatus: string;
    hasMortgage: string;
    hasDependents: string;
    loanPurpose: string;
    hasCoSigner: string;
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
    age: 35,
    income: 75000,
    loanAmount: 25000,
    creditScore: 680,
    monthsEmployed: 48,
    numCreditLines: 4,
    interestRate: 12.5,
    loanTerm: 36,
    dtiRatio: 0.25,
    education: "Bachelor's",
    employmentType: 'Full-time',
    maritalStatus: 'Married',
    hasMortgage: 'Yes',
    hasDependents: 'No',
    loanPurpose: 'Home',
    hasCoSigner: 'No',
  },
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setPrediction: (prediction, probability) => set({ prediction, probability, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error, isLoading: false }),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
