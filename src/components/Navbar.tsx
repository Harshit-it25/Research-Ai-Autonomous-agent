import React from 'react';
import { Microscope, Github, Layers, ShieldCheck } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-[#11141b]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/20">R</div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#11141b]"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white uppercase">Research <span className="text-indigo-400">AI</span></h1>
                <span className="mono-tag">AUTONOMOUS</span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">Deep Synthesis Unit v4.0</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="text-right">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Compute Latency</div>
              <div className="text-sm font-mono text-emerald-400">142.8ms</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Search Depth</div>
              <div className="text-sm font-mono text-indigo-400">Lvl 4</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800"></div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <Github size={22} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
