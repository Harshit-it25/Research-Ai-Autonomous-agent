/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, BookOpen, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SearchInput } from './components/SearchInput';
import { ProgressStepper } from './components/ProgressStepper';
import { ReportDisplay } from './components/ReportDisplay';
import { performResearch, ResearchProgress } from './services/gemini';

type AppStatus = 'idle' | 'researching' | 'completed' | 'error';

export default function App() {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<AppStatus>('idle');
  const [report, setReport] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<ResearchProgress>({ step: 'understanding', message: '' });
  const [history, setHistory] = React.useState<Array<{ q: string; date: string }>>(() => {
    const saved = localStorage.getItem('research_history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async (overrideQuery?: string) => {
    const activeQuery = overrideQuery || query;
    if (!activeQuery.trim()) return;
    
    setQuery(activeQuery); // Ensure input reflects if override was used
    setStatus('researching');
    setError(null);
    setReport('');

    try {
      const result = await performResearch(activeQuery, setProgress);
      setReport(result);
      setStatus('completed');
      
      const newHistory = [{ q: activeQuery, date: new Date().toISOString() }, ...history.slice(0, 4)];
      setHistory(newHistory);
      localStorage.setItem('research_history', JSON.stringify(newHistory));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during research.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setQuery('');
    setReport('');
    setError(null);
  };

  const handleHistoryItem = (q: string) => {
    handleSearch(q);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/20 bg-[#090a0d]">
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 md:py-20 px-4 max-w-7xl mx-auto"
            >
              {/* Hero Section */}
              <div className="text-center mb-16 space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono tracking-widest uppercase mb-4"
                >
                  <Sparkles size={12} />
                  <span>Research Engine Active</span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
                  Professional Research, <br />
                  <span className="text-indigo-500">Autonomous Intelligence.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
                  Generate comprehensive, grounded research reports in seconds. 
                  Leveraging real-time web awareness to synthesize deep insights from authoritative sources.
                </p>
              </div>

              {/* Input Area */}
              <div className="mb-20">
                <SearchInput 
                  value={query} 
                  onChange={setQuery} 
                  onSearch={handleSearch} 
                  isLoading={status as string === 'researching'} 
                />
              </div>

              {/* Bento Grid Features */}
              <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-5 auto-rows-[240px]">
                <div className="md:col-span-4 md:row-span-2 bento-card p-8 flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Terminal size={120} className="text-indigo-400 translate-x-10 -translate-y-10" />
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Deep Extraction</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Filters through whitepapers, patents, and technical documentation to find hyper-accurate data points that standard tools miss.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-8 md:row-span-1 bento-card p-8 flex items-center justify-between group overflow-hidden bg-gradient-to-br from-[#11141b] to-indigo-950/20 border-indigo-500/20 shadow-indigo-500/5">
                  <div className="flex-1 pr-12">
                     <div className="mono-tag mb-4">Core Advantage</div>
                     <h3 className="text-2xl font-bold text-white mb-2">Contextual Synthesis Engine</h3>
                     <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                       Uses real-time grounding to ensure every claim is backed by verified sources and cross-referenced with recent market signals.
                     </p>
                  </div>
                  <div className="hidden md:flex w-16 h-16 bg-white/5 rounded-full items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform border border-white/10">
                    <BookOpen size={30} />
                  </div>
                </div>

                <div className="md:col-span-4 md:row-span-1 bento-card p-8 flex flex-col justify-end group">
                  <div className="flex gap-4 mb-auto">
                    {[1,2,3,4].map(i => <div key={i} className="h-1 flex-1 bg-indigo-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-1/2 animate-shimmer" />
                    </div>)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                       <Clock size={18} className="text-emerald-400" />
                       Real-time Awareness
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">Syncing with global indices...</p>
                  </div>
                </div>

                <div className="md:col-span-4 md:row-span-1 bento-card p-8 bg-indigo-600 flex flex-col justify-center items-center text-center shadow-[0_0_40px_rgba(79,70,229,0.2)]">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Research Ready</h3>
                  <p className="text-indigo-100/70 text-xs font-bold font-mono tracking-widest mt-2 uppercase">Systems Nominal</p>
                </div>
              </div>

              {/* History Bento Style */}
              {history.length > 0 && (
                <div className="mt-20">
                  <h4 className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-slate-600 mb-8 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-slate-800" />
                    <span>Historical Archive</span>
                    <div className="h-[1px] flex-1 bg-slate-800" />
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleHistoryItem(item.q)}
                        className="bento-card p-5 group flex flex-col gap-3 text-left hover:border-indigo-500/40 transition-all outline-hidden bg-slate-900/40"
                      >
                        <div className="flex justify-between items-start">
                          <div className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Report ID #{i+102}</div>
                          <Clock size={12} className="text-slate-700" />
                        </div>
                        <span className="text-white font-medium truncate text-sm">{item.q}</span>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[10px] text-slate-600 font-bold">{new Date(item.date).toLocaleDateString()}</span>
                          <span className="text-[9px] text-indigo-400 font-bold uppercase underline underline-offset-4 group-hover:text-white">Review Report</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {status === 'researching' && (
            <motion.div
              key="researching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24"
            >
              <ProgressStepper currentProgress={progress} />
            </motion.div>
          )}

          {status === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 px-4"
            >
              <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-800/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all font-bold text-xs uppercase tracking-widest group"
                >
                  <ArrowLeft size={16} className="translate-x-0 group-hover:-translate-x-1 transition-transform" />
                  <span>Start New Research</span>
                </button>
                <div className="mono-tag flex items-center gap-2 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Deduplicated & Synthesized
                </div>
              </div>
              <ReportDisplay report={report} />
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto py-24 px-4 text-center"
            >
              <div className="w-24 h-24 bg-red-500/10 text-red-500 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-red-500/10">
                <AlertTriangle size={48} />
              </div>
              <h2 className="text-3xl font-black text-white mb-6 uppercase italic">Research Blocked</h2>
              <p className="text-slate-500 mb-12 font-medium leading-relaxed">
                {error || 'An unexpected failure occurred while processing your query. Technical constraints detected in the synthesis pipeline.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleSearch()}
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all shadow-xl shadow-red-600/20"
                >
                  Retry Investigation
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all"
                >
                  Return Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-[#11141b]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-base">R</div>
              <span className="font-bold text-lg tracking-tighter uppercase whitespace-nowrap">Research <span className="text-indigo-500">AI</span></span>
            </div>
            <div className="flex gap-10 text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Protocal</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Legal Framework</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Architecture</a>
            </div>
            <div className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] font-mono flex items-center gap-3">
              <div className="w-12 h-px bg-slate-800" />
              Autonomous Agent Unit v4.0.2
              <div className="w-12 h-px bg-slate-800" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Re-using icon for footer
function Microscope({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 18c-2 0-3-1-3-3s1-3 3-3" />
      <path d="M6 12V4" />
      <path d="M3 4h6" />
      <path d="M9 12v6" />
      <path d="M12 18h1" />
      <path d="M15 16h2" />
      <path d="M11 6a5 5 0 0 1 10 0v10" />
      <path d="M13 18c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2" />
      <path d="M6 18h12" />
      <path d="M10 18v3" />
      <path d="M14 18v3" />
      <path d="M9 21h6" />
    </svg>
  );
}

