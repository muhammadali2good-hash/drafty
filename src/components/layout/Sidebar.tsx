import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Twitter,
  MessageSquare,
  Facebook,
  Instagram,
  Mail,
  FileText,
  FileCode,
  Settings,
  Plus,
  Sparkles,
  HardDrive,
  Leaf,
} from 'lucide-react';
import { PlatformType } from '../../types';

interface SidebarProps {
  currentPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
  onQuickCreate: () => void;
  onOpenAICopy: () => void;
  draftCounts: Record<PlatformType, number>;
  storageKB: number;
}

const NAVIGATION_ITEMS: { id: PlatformType; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, color: 'text-emerald-500' },
  { id: 'x', label: 'X (Twitter)', icon: Twitter, color: 'text-sky-400' },
  { id: 'reddit', label: 'Reddit', icon: MessageSquare, color: 'text-orange-500' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'email', label: 'Email Newsletter', icon: Mail, color: 'text-amber-500' },
  { id: 'general', label: 'General Scratchpad', icon: FileText, color: 'text-emerald-600' },
  { id: 'templates', label: 'Templates Library', icon: FileCode, color: 'text-purple-500' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-slate-400' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPlatform,
  onSelectPlatform,
  onQuickCreate,
  onOpenAICopy,
  draftCounts,
  storageKB,
}) => {
  return (
    <aside className="w-72 h-[calc(100vh-32px)] m-4 fixed left-0 top-0 z-30 flex flex-col justify-between glass-panel rounded-nav p-5 transition-all duration-300 select-none">
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-xl">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight tracking-tight">
                Drafty
              </h1>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                AI Content Workspace
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 px-2.5 py-1 rounded-full">
            v2.6
          </span>
        </div>

        {/* Quick Action Button */}
        <div className="space-y-2.5">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onQuickCreate}
            id="sidebar-quick-create-btn"
            className="w-full h-12 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Content Draft</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAICopy}
            id="sidebar-ai-copy-btn"
            className="w-full h-10 rounded-btn bg-slate-100 dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-xs flex items-center justify-center gap-2 border border-slate-200/60 dark:border-emerald-500/30 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Copy Generator</span>
          </motion.button>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-380px)] pr-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 dark:text-emerald-400/70 uppercase tracking-wider mb-2">
            Workspaces
          </p>

          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPlatform === item.id;
            const count = draftCounts[item.id] || 0;

            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlatform(item.id)}
                id={`nav-${item.id}`}
                className={`w-full h-11 px-3.5 rounded-input flex items-center justify-between text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-600 dark:text-emerald-100/90 hover:bg-slate-100/80 dark:hover:bg-emerald-950/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-500' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </div>

                {count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200/80 dark:bg-emerald-950/80 text-slate-600 dark:text-emerald-300 border border-transparent dark:border-emerald-800/40'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Local Storage Metric Box */}
      <div className="pt-4 border-t border-slate-200/60 dark:border-emerald-500/20 space-y-3">
        <div className="p-3.5 rounded-card bg-slate-50/80 dark:bg-emerald-950/30 border border-slate-200/50 dark:border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-emerald-300/80">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-500" />
              Chrome Local DB
            </span>
            <span className="font-semibold text-slate-700 dark:text-emerald-200">
              {storageKB} KB
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-emerald-950 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, (storageKB / 500) * 100))}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 dark:text-emerald-400/60">
            100% Offline • Zero Backend Required
          </p>
        </div>
      </div>
    </aside>
  );
};
