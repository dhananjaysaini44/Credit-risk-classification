'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultsDisplay from './ResultsDisplay';
import { useRiskStore } from '@/store/useRiskStore';

const SelectionGroup = ({ label, name, options, current, onToggle }: { label: string, name: string, options: string[], current: string, onToggle: (name: string, opt: string) => void }) => (
    <div className="relative group/field">
        <label className="block font-headline text-[13px] uppercase tracking-[0.3m] text-primary/60 mb-3 group-focus-within/field:text-primary transition-colors">
            {label}
        </label>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onToggle(name, opt)}
                    className={`py-3 px-2 border font-mono text-[9px] uppercase tracking-widest transition-all duration-500 relative overflow-hidden flex-1 ${current === opt
                        ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(195,245,255,0.3)]'
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                        }`}
                >
                    <span className="relative z-10">{opt}</span>
                    {current === opt && (
                        <motion.div
                            layoutId={`active-indicator-${name}`}
                            className="absolute inset-0 bg-primary/20 pointer-events-none"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    </div>
);

const InputField = ({ label, name, value, onChange, type = "number", max, min }: { label: string, name: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, max?: string, min?: string }) => (
    <div className="relative group/field">
        <label className="block font-headline text-[13px] uppercase tracking-[0.3m] text-primary/60 mb-1 group-focus-within/field:text-primary transition-colors">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            max={max}
            min={min}
            step={type === "number" ? "any" : undefined}
            onChange={onChange}
            className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono text-[18px]"
        />
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
    </div>
);

export default function RiskForm() {
    const { updateData, setPrediction, setError, error, isLoading, setLoading, selectedModel, setSelectedModel } = useRiskStore();
    const [formData, setFormData] = useState({
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
    });

    const [showResults, setShowResults] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Keep as string while typing to avoid losing 0 after decimal or empty strings
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Sync with store immediately for telemetry
        // Wait, store might expect numbers? Let's check store type.
        // For now, keep it simple.
        updateData({ [name]: e.target.type === 'number' ? parseFloat(value) || 0 : value });
    };

    const toggleField = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        updateData({ [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, modelType: selectedModel }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Predictive Engine Error');
            }

            const result = await response.json();
            setPrediction(result.prediction, result.probability);
            setShowResults(true);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown Error';
            console.error('Backend Connection Error:', err);
            setError(errorMessage === 'Failed to fetch'
                ? 'Predictive Engine Offline. Please start your FastAPI server (uvicorn backend.main:app).'
                : errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 px-4"
            >
                <h2 className="font-headline text-3xl md:text-4xl text-white mb-4 tracking-tight">Try it Yourself</h2>
                <p className="font-body text-foreground/50 text-xs uppercase tracking-widest">
                    Submit a 16-point feature matrix for high-fidelity risk classification
                </p>
            </motion.div>

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        className="glass-panel p-5 md:p-10 relative overflow-hidden"
                    >
                        <div className="scanline opacity-5 pointer-events-none" />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 bg-secondary/10 border-l-2 border-secondary flex items-center gap-3"
                            >
                                <span className="material-symbols-outlined text-secondary text-base">warning</span>
                                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                            {/* Section 1: Financial & Core */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <InputField label="Annual Income" name="income" value={formData.income} onChange={handleChange} />
                                <InputField label="Loan Amount" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
                                <InputField label="Credit Score" name="creditScore" value={formData.creditScore} onChange={handleChange} />
                                <InputField label="DTI Ratio" name="dtiRatio" value={formData.dtiRatio} onChange={handleChange} />
                                <InputField label="Interest Rate (%)" name="interestRate" value={formData.interestRate} onChange={handleChange} />
                                <InputField label="Loan Term (Months)" name="loanTerm" value={formData.loanTerm} onChange={handleChange} />
                            </div>

                            {/* Section 2: Personal & History */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
                                <InputField label="Months Employed" name="monthsEmployed" value={formData.monthsEmployed} onChange={handleChange} />
                                <InputField label="Active Credit Lines" name="numCreditLines" value={formData.numCreditLines} onChange={handleChange} />

                                <SelectionGroup label="Education" name="education" current={formData.education} options={['High School', "Bachelor's", 'Master\'s', 'PhD']} onToggle={toggleField} />
                                <SelectionGroup label="Employment" name="employmentType" current={formData.employmentType} options={['Full-time', 'Part-time', 'Self-employed', 'Un-employed']} onToggle={toggleField} />
                                <SelectionGroup label="Marital Status" name="maritalStatus" current={formData.maritalStatus} options={['Single', 'Married', 'Divorced']} onToggle={toggleField} />
                            </div>

                            {/* Section 3: Contextual Flags */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <SelectionGroup label="Has Mortgage" name="hasMortgage" current={formData.hasMortgage} options={['Yes', 'No']} onToggle={toggleField} />
                                <SelectionGroup label="Has Dependents" name="hasDependents" current={formData.hasDependents} options={['Yes', 'No']} onToggle={toggleField} />
                                <SelectionGroup label="Has Co-Signer" name="hasCoSigner" current={formData.hasCoSigner} options={['Yes', 'No']} onToggle={toggleField} />
                                <div className="md:col-span-3">
                                    <SelectionGroup label="Loan Purpose" name="loanPurpose" current={formData.loanPurpose} options={['Auto', 'Business', 'Education', 'Home', 'Other']} onToggle={toggleField} />
                                </div>
                            </div>

                            {/* Section 4: Engine Selection */}
                            <div className="relative group/field pt-8 border-t border-white/5">
                                <label className="block font-headline text-[13px] uppercase tracking-[0.3em] text-primary/60 mb-4 group-focus-within/field:text-primary transition-colors">
                                    Inference Engine
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['Logistic Regression', 'Random Forest', 'XGBoost', 'KNN'].map((model) => (
                                        <button
                                            key={model}
                                            type="button"
                                            onClick={() => setSelectedModel(model)}
                                            className={`py-4 px-2 border font-mono text-[9px] uppercase tracking-widest transition-all duration-500 relative ${selectedModel === model
                                                ? 'bg-primary text-black shadow-[0_0_20px_rgba(195,245,255,0.3)] border-primary'
                                                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                                }`}
                                        >
                                            {model.toUpperCase()}
                                            {selectedModel === model && (
                                                <motion.div layoutId="model-active" className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary py-5 text-[#0a0c10] font-headline uppercase tracking-[0.4em] font-bold text-[16px] hover:bg-primary/90 transition-all duration-500 flex items-center justify-center gap-4 group/btn relative overflow-hidden"
                                >
                                    <span className={isLoading ? 'opacity-0' : 'opacity-100 flex items-center gap-4'}>
                                        Run Risk Assessment
                                    </span>
                                    {isLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-[#0a0c10]/30 border-t-[#0a0c10] rounded-full animate-spin" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <ResultsDisplay onReset={() => setShowResults(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
