'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultsDisplay from './ResultsDisplay';
import { useRiskStore } from '@/store/useRiskStore';

export default function RiskForm() {
    const { updateData, setPrediction, setError, error, isLoading, setLoading, selectedModel, setSelectedModel } = useRiskStore();
    const [formData, setFormData] = useState({
        age: 30,
        income: 50000,
        loanAmount: 10000,
        creditScore: 700,
        employmentYears: 5,
        educationLevel: 'Bachelors',
        housingStatus: 'Rent',
    });

    const [showResults, setShowResults] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const val = e.target.type === 'number' ? parseFloat(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: val,
        }));

        // Sync with store immediately for telemetry
        updateData({ [name]: val });
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
        <div className="max-w-4xl mx-auto px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="font-headline text-4xl text-white mb-4 tracking-tight">Try it Yourself</h2>
                <p className="font-body text-foreground/50 text-sm uppercase tracking-widest">
                    Submit raw parameters for risk margin classification
                </p>
            </motion.div>

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="glass-panel p-8 md:p-12 relative overflow-hidden group"
                    >
                        <div className="scanline opacity-10 pointer-events-none" />

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

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">

                            {/* Age */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono text-[22px]"
                                />
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Income */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Annual Income (INR)
                                </label>
                                <input
                                    type="number"
                                    name="income"
                                    value={formData.income}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono text-[22px]"
                                />
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Loan Amount */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Loan Amount (INR)
                                </label>
                                <input
                                    type="number"
                                    name="loanAmount"
                                    value={formData.loanAmount}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono text-[22px]"
                                />
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Credit Score */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Credit Score
                                </label>
                                <input
                                    type="number"
                                    name="creditScore"
                                    value={formData.creditScore}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono text-[22px]"
                                />
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Employment Length */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Employment Years
                                </label>
                                <input
                                    type="number"
                                    name="employmentYears"
                                    value={formData.employmentYears}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono text-[22px]"
                                />
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Housing Status */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Housing Status
                                </label>
                                <select
                                    name="housingStatus"
                                    value={formData.housingStatus}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono appearance-none text-[22px]"
                                >
                                    <option value="Own" className="bg-[#0a0c10]">Own</option>
                                    <option value="Mortgage" className="bg-[#0a0c10]">Mortgage</option>
                                    <option value="Rent" className="bg-[#0a0c10]">Rent</option>
                                </select>
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Education Level */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Education Level
                                </label>
                                <select
                                    name="educationLevel"
                                    value={formData.educationLevel}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono appearance-none text-[22px]"
                                >
                                    <option value="High School" className="bg-[#0a0c10]">High School</option>
                                    <option value="Bachelors" className="bg-[#0a0c10]">Bachelors</option>
                                    <option value="Masters" className="bg-[#0a0c10]">Masters</option>
                                    <option value="PhD" className="bg-[#0a0c10]">PhD</option>
                                </select>
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            {/* Predictive Model Dropdown */}
                            <div className="relative group/field">
                                <label className="block font-headline text-[14px] uppercase tracking-[0.3em] text-primary/60 mb-2 group-focus-within/field:text-primary transition-colors">
                                    Classifier Model
                                </label>
                                <select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-primary focus:ring-0 transition-all text-white py-2 font-mono appearance-none text-[22px] cursor-pointer"
                                >
                                    <option value="Logistic Regression" className="bg-[#0a0c10]">Logistic Regression</option>
                                    <option value="Random Forest" className="bg-[#0a0c10]">Random Forest</option>
                                    <option value="XGBoost" className="bg-[#0a0c10]">XGBoost</option>
                                    <option value="KNN" className="bg-[#0a0c10]">KNN</option>
                                </select>
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within/field:w-full transition-all duration-700" />
                            </div>

                            <div className="md:col-span-2 pt-10">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary py-5 text-[#0a0c10] font-headline uppercase tracking-[0.4em] font-bold text-[16px] hover:bg-primary/90 transition-all duration-500 flex items-center justify-center gap-4 group/btn relative overflow-hidden"
                                >
                                    <span className={isLoading ? 'opacity-0' : 'opacity-100 flex items-center gap-4'}>
                                        Submit for Classification
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
