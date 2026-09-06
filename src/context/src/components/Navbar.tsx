import React, { useState } from 'react';
import { Sun, Moon, Share2, Sprout } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { QuickShareModal } from './QuickShareModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                MANDIMITRA <span className="text-emerald-600 dark:text-emerald-400 text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 rounded-md border border-emerald-200 dark:border-emerald-800">AI</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                Smart Agriculture & Mandi Discovery Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-emerald-200 dark:border-slate-700 bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition"
              title="Share MANDIMITRA AI"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quick Share</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <QuickShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
};
