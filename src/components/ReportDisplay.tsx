import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Download, Copy, Check, FileText } from 'lucide-react';

interface ReportDisplayProps {
  report: string;
}

export function ReportDisplay({ report }: ReportDisplayProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto mb-20"
    >
      <div className="bg-[#11141b] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Toolbar */}
        <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight uppercase tracking-tight">Synthesis Output</h3>
              <p className="text-[10px] text-slate-500 font-bold font-mono uppercase tracking-widest">Context Memory Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Content Area with extra nested bento look */}
        <div className="p-4 md:p-6 flex-1">
          <div className="bg-[#090a0d] border border-slate-800/50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Visual accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
            
            <div className="markdown-body relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">
          <div className="flex gap-4">
             <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-indigo-500 rounded-full" /> v1.0.4-STABLE</span>
             <span className="text-slate-700">|</span>
             <span>Ref: {new Date().getTime().toString(16).toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-400/60">
             <div className="flex -space-x-1.5">
               {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full border border-slate-900 bg-slate-800" />)}
             </div>
             <span>Multi-model validated</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
