import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchInput({ value, onChange, onSearch, isLoading }: SearchInputProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-indigo-600/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl" />
        <div className="relative flex items-center bg-[#11141b] border border-slate-800 focus-within:border-indigo-500 rounded-2xl transition-all shadow-2xl overflow-hidden">
          <div className="pl-6 text-slate-500 group-focus-within:text-indigo-400">
            <Search size={24} />
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSearch();
              }
            }}
            placeholder="Initialize research parameters (e.g. Impact of solid-state batteries on EV range 2025)..."
            className="w-full bg-transparent border-none focus:ring-0 py-7 px-5 text-lg resize-none min-h-[140px] max-h-[300px] font-sans placeholder:text-slate-600 text-white"
            disabled={isLoading}
          />
          <div className="px-6 border-l border-slate-800 py-6 flex flex-col justify-end self-stretch bg-slate-900/40">
            <button
              onClick={onSearch}
              disabled={isLoading || !value.trim()}
              className={cn(
                "px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 uppercase tracking-widest text-xs",
                value.trim() && !isLoading 
                  ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-95" 
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <span>Execute</span>
                  <div className="px-1.5 py-0.5 bg-white/10 rounded text-[8px]">⏎</div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">
        <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-indigo-500 rounded-full" /> Web Grounded</span>
        <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Deduplicated</span>
        <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-indigo-500 rounded-full" /> LLM Synthesized</span>
      </div>
    </motion.div>
  );
}
