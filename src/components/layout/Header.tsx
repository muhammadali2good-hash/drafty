import React from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Image as ImageIcon, Sun, Moon, Bookmark, Command } from 'lucide-react';
import { PlatformType } from '../../types';

interface HeaderProps {
  currentPlatform: PlatformType;
  theme: 'light' | 'dark' | 'system';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenAICopy: () => void;
  onOpenAIImage: () => void;
  onOpenCommunities: () => void;
}

const PLATFORM_INFO: Record<PlatformType, { title: string; subtitle: string; iconBg: string }> = {
  landing: { title: 'Welcome to Drafty AI', subtitle: 'Multi-platform content studio powered by Puter AI', iconBg: 'bg-teal-500' },
  dashboard: { title: 'Dashboard Overview', subtitle: 'Global workspace metrics, pinned drafts & recent AI generations', iconBg: 'bg-emerald-500' },
  x: { title: 'X (Twitter) Workspace', subtitle: 'Draft 280-char tweets, multi-post thread builders & community notes', iconBg: 'bg-sky-500' },
  reddit: { title: 'Reddit Workspace', subtitle: 'Format discussion posts, AMA drafts & subreddit library notes', iconBg: 'bg-orange-500' },
  facebook: { title: 'Facebook Workspace', subtitle: 'Craft long-form storytelling posts, announcements & event drafts', iconBg: 'bg-blue-600' },
  instagram: { title: 'Instagram Workspace', subtitle: 'Build carousel captions, reel hooks & visual slide breakdown', iconBg: 'bg-pink-500' },
  email: { title: 'Email Workspace', subtitle: 'Design newsletter editions, cold outreach & high-CTR subject lines', iconBg: 'bg-amber-500' },
  general: { title: 'General Drafts', subtitle: 'Rich markdown scratchpad, research notes, ideas & copy snippets', iconBg: 'bg-emerald-600' },
  templates: { title: 'Templates Library', subtitle: 'Reusable content frameworks for X, Reddit, Instagram & Email', iconBg: 'bg-purple-500' },
  settings: { title: 'Workspace Settings', subtitle: 'Theme configuration, JSON backup & storage management', iconBg: 'bg-slate-500' },
};

export const Header: React.FC<HeaderProps> = ({
  currentPlatform,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenAICopy,
  onOpenAIImage,
  onOpenCommunities,
}) => {
  const info = PLATFORM_INFO[currentPlatform] || PLATFORM_INFO.dashboard;

  return (
    <header className="h-20 px-8 flex items-center justify-between glass-panel rounded-nav mb-6 transition-all duration-300">
      {/* Left Platform Context */}
      <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${info.iconBg} shadow-sm animate-pulse`} />
        <div>
          <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-tight">
            {info.title}
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {info.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls & Search */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenSearch}
          id="header-global-search-btn"
          className="h-11 px-4 rounded-input bg-slate-100/80 dark:bg-emerald-950/40 hover:bg-slate-200/60 dark:hover:bg-emerald-900/60 text-slate-500 dark:text-emerald-200/90 flex items-center gap-3 border border-slate-200/60 dark:border-emerald-500/30 text-xs font-medium transition-all duration-200 cursor-pointer min-w-[200px]"
        >
          <Search className="w-4 h-4 text-slate-400 dark:text-emerald-400" />
          <span>Search drafts, images...</span>
          <div className="ml-auto flex items-center gap-1 text-[10px] bg-slate-200 dark:bg-emerald-900/80 text-slate-600 dark:text-emerald-300 px-1.5 py-0.5 rounded-md font-mono">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </motion.button>

        {/* Community Library Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCommunities}
          id="header-community-btn"
          title="Community Link Storage"
          className="h-11 px-3.5 rounded-btn bg-slate-100 dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 hover:text-emerald-600 dark:hover:text-emerald-300 flex items-center gap-2 border border-slate-200/60 dark:border-emerald-500/30 text-xs font-medium transition-all duration-200 cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-emerald-500" />
          <span className="hidden md:inline">Communities</span>
        </motion.button>

        {/* AI Copy Trigger */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenAICopy}
          id="header-ai-copy-btn"
          title="Generate AI Copy"
          aria-label="Generate AI Copy"
          className="w-11 h-11 rounded-btn bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <Sparkles className="w-5 h-5 text-emerald-500" />
        </motion.button>

        {/* AI Image Trigger */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenAIImage}
          id="header-ai-image-btn"
          title="Generate AI Image"
          aria-label="Generate AI Image"
          className="w-11 h-11 rounded-btn bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/70 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200/60 dark:border-teal-500/40 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <ImageIcon className="w-5 h-5 text-teal-500" />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleTheme}
          id="header-theme-toggle-btn"
          title="Toggle Dark / Light Mode"
          className="w-11 h-11 rounded-btn bg-slate-100 dark:bg-emerald-950/40 hover:bg-slate-200 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-300 flex items-center justify-center border border-slate-200/60 dark:border-emerald-500/30 transition-all duration-200 cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
        </motion.button>
      </div>
    </header>
  );
};
