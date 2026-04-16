'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EngineStatus() {
    const [status, setStatus] = useState<'STOPPED' | 'INITIALIZING' | 'ACTIVE'>('STOPPED');

    // Determine the active host for telemetry display
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const displayHost = rawApiUrl.replace(/^https?:\/\//, '').split('/')[0];

    const toggleEngine = async () => {
        if (status === 'STOPPED') {
            setStatus('INITIALIZING');

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 90000); // 1.5-minute timeout for cold starts

            try {
                // Real health check to verify backend connectivity
                const response = await fetch(rawApiUrl, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (response.ok) {
                    setStatus('ACTIVE');
                } else {
                    throw new Error('Not Operational');
                }
            } catch (err: any) {
                clearTimeout(timeoutId);
                const isTimeout = err.name === 'AbortError';
                console.error(isTimeout ? "Connection timed out after 60s" : "Connectivity probe failed:", err);

                setTimeout(() => {
                    setStatus('STOPPED');
                }, 1000);
            }
        } else if (status === 'ACTIVE') {
            setStatus('STOPPED');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-6 md:mt-8 flex justify-center w-full px-4 md:px-0"
        >
            <button
                onClick={toggleEngine}
                className={`
                    relative group px-6 md:px-12 py-3 md:py-4 border-t border-b overflow-hidden transition-all duration-700
                    w-full max-w-[280px] md:max-w-md
                    ${status === 'STOPPED' ? 'border-secondary/30 hover:border-secondary/60 bg-secondary/5' : ''}
                    ${status === 'INITIALIZING' ? 'border-yellow-400/30 bg-yellow-400/5' : ''}
                    ${status === 'ACTIVE' ? 'border-primary/30 hover:border-primary/60 bg-primary/5' : ''}
                `}
            >
                {/* Background Sweep effect */}
                <div className={`
                    absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000
                    ${status === 'STOPPED' ? 'bg-gradient-to-r from-transparent via-secondary/10 to-transparent' : 'bg-gradient-to-r from-transparent via-primary/10 to-transparent'}
                `} />

                <div className="relative z-10 flex items-center justify-between w-full h-full gap-4 md:gap-6">
                    <div className="flex items-center gap-4 md:gap-6">
                    {/* Status Orb */}
                    <div className="relative flex items-center justify-center shrink-0">
                        <div className={`
                            w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500
                            ${status === 'STOPPED' ? 'bg-secondary shadow-[0_0_10px_#ff4d4d]' : ''}
                            ${status === 'INITIALIZING' ? 'bg-yellow-400 animate-pulse shadow-[0_0_10px_#facc15]' : ''}
                            ${status === 'ACTIVE' ? 'bg-primary shadow-[0_0_10px_#c3f5ff]' : ''}
                        `} />
                        {status !== 'STOPPED' && (
                            <div className={`
                                absolute inset-0 rounded-full animate-ping
                                ${status === 'INITIALIZING' ? 'bg-yellow-400/40' : 'bg-primary/40'}
                            `} />
                        )}
                    </div>

                    <div className="flex flex-col items-start overflow-hidden">
                        <span className={`
                            font-headline text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase transition-colors duration-500 whitespace-nowrap
                            ${status === 'STOPPED' ? 'text-secondary' : ''}
                            ${status === 'INITIALIZING' ? 'text-yellow-400' : ''}
                            ${status === 'ACTIVE' ? 'text-primary' : ''}
                        `}>
                            {status === 'STOPPED' && 'System Engine Offline'}
                            {status === 'INITIALIZING' && 'Booting Predictive Core...'}
                            {status === 'ACTIVE' && 'Predictive Engine Active'}
                        </span>
                        
                        <div className="flex items-center gap-2 mt-0.5 md:mt-1 truncate w-full">
                            <span className="font-mono text-[7px] md:text-[8px] text-white/30 uppercase tracking-widest truncate">
                                {status === 'STOPPED' && 'Manual Override Required'}
                                {status === 'INITIALIZING' && 'Allocating GPU Resources'}
                                {status === 'ACTIVE' && `Running: ${displayHost}/v1`}
                            </span>
                        </div>
                    </div>
                </div>

                    {/* Action Indicator - Only visible when hovered on larger screens */}
                    <div className="ml-auto md:ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                        <span className="material-symbols-outlined text-white/50 text-xs md:text-sm">
                            {status === 'STOPPED' ? 'power_settings_new' : 'settings_backup_restore'}
                        </span>
                    </div>
                </div>

                {/* Corner Decoration */}
                <div className={`
                    absolute top-0 left-0 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-l transition-colors duration-500
                    ${status === 'STOPPED' ? 'border-secondary' : 'border-primary'}
                `} />
                <div className={`
                    absolute bottom-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 border-b border-r transition-colors duration-500
                    ${status === 'STOPPED' ? 'border-secondary' : 'border-primary'}
                `} />
            </button>
        </motion.div>
    );
}
