import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Loader2, Globe, FileText, Database, Layers, Sparkles, Search } from 'lucide-react';
import { ResearchStep, ResearchProgress } from '../services/gemini';
import { cn } from '../lib/utils';

const STEPS: { id: ResearchStep; label: string; icon: any }[] = [
  { id: 'understanding', label: 'Intent Analysis', icon: Search },
  { id: 'searching', label: 'Global Search', icon: Globe },
  { id: 'extracting', label: 'Extraction', icon: Database },
  { id: 'summarizing', label: 'Summarization', icon: FileText },
  { id: 'deduplicating', label: 'Deduplication', icon: Layers },
  { id: 'synthesizing', label: 'Synthesis', icon: Sparkles },
];

interface ProgressStepperProps {
  currentProgress: ResearchProgress;
}

export function ProgressStepper({ currentProgress }: ProgressStepperProps) {
  const currentStepIndex = STEPS.findIndex(s => s.id === currentProgress.step);

  if (currentProgress.step === 'completed') return null;

  return (
    <div className="max-w-xl mx-auto py-12 px-4 shadow-2xl rounded-2xl border border-slate-800 bg-[#11141b] p-8">
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center justify-between">
        <span>Execution Pipeline</span>
        <span className="text-indigo-400 font-mono italic">Thread active</span>
      </h3>
      
      <div className="space-y-6">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          
          return (
            <div key={step.id} className="relative">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-500 relative z-10",
                  isCompleted ? "bg-emerald-500 text-white" :
                  isActive ? "bg-indigo-600 text-white ring-4 ring-indigo-600/20 animate-pulse" :
                  "bg-[#090a0d] border border-slate-800 text-slate-600"
                )}>
                  {isCompleted ? "✓" : index + 1}
                </div>
                <div className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  isActive ? "text-indigo-400" : isCompleted ? "text-slate-300" : "text-slate-600"
                )}>
                  {step.label}
                  {isActive && <span className="ml-2 inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />}
                </div>
              </div>
              
              {/* Vertical connector line */}
              {index < STEPS.length - 1 && (
                <div className="absolute top-7 left-[13px] w-0.5 h-6 bg-slate-800">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: isCompleted ? '100%' : '0%' }}
                    className="w-full bg-emerald-500/30"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-[#090a0d] p-5 rounded-xl border border-slate-800">
         <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
           <span>Global Progress</span>
           <span className="text-indigo-400">{Math.round((currentStepIndex / (STEPS.length - 1)) * 100)}%</span>
         </div>
         <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
             className="bg-indigo-500 h-full rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"
           />
         </div>
         <p className="mt-4 text-[11px] text-slate-500 font-medium italic text-center animate-pulse">
           {currentProgress.message}
         </p>
      </div>
    </div>
  );
}
