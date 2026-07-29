import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  Sun,
  Moon,
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Check,
  Command,
  Zap,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { UserPreferences } from '../../types';
import { StorageService } from '../../lib/storage';

interface SettingsViewProps {
  prefs: UserPreferences;
  onUpdatePrefs: (prefs: Partial<UserPreferences>) => void;
  storageKB: number;
  onResetSampleData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  prefs,
  onUpdatePrefs,
  storageKB,
  onResetSampleData,
}) => {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState(false);

  const handleExport = () => {
    const jsonStr = StorageService.exportWorkspaceJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bloome-workspace-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && StorageService.importWorkspaceJSON(content)) {
        setImportSuccess(true);
        setImportError(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setImportError(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-container glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-500 text-white">
            Workspace Configuration
          </span>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Settings & Local Storage
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Manage your local database backup, theme settings, and Puter AI configuration.
          </p>
        </div>
      </div>

      {/* Theme & Display Options */}
      <div className="p-6 rounded-card glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" />
          Appearance & Theme Mode
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onUpdatePrefs({ theme: 'light' })}
            className={`p-4 rounded-card border flex items-center justify-between text-xs font-bold transition-all ${
              prefs.theme === 'light'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light Theme (Bloome Standard)</span>
            </div>
            {prefs.theme === 'light' && <Check className="w-4 h-4 text-emerald-500" />}
          </button>

          <button
            onClick={() => onUpdatePrefs({ theme: 'dark' })}
            className={`p-4 rounded-card border flex items-center justify-between text-xs font-bold transition-all ${
              prefs.theme === 'dark'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Dark Twilight Theme</span>
            </div>
            {prefs.theme === 'dark' && <Check className="w-4 h-4 text-emerald-500" />}
          </button>
        </div>
      </div>

      {/* Puter AI Status Box */}
      <div className="p-6 rounded-card glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500" />
          AI Engine Status (Puter.js)
        </h3>

        <div className="p-4 rounded-card bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Puter.js Client Engine Ready
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Generating copy and images directly in your browser without external server backend or API keys.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500 text-white">
            Active
          </span>
        </div>
      </div>

      {/* Backup & Import Workspace Data */}
      <div className="p-6 rounded-card glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-blue-500" />
          Chrome Local Database Backup & Restore
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export */}
          <div className="p-4 rounded-card bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Export Workspace JSON
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Download all drafts, generated AI images history, templates and community links as a backup file.
            </p>
            <button
              onClick={handleExport}
              className="h-9 px-4 rounded-btn bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              {exportSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{exportSuccess ? 'Downloaded!' : 'Export Backup JSON'}</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-card bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Import Workspace Backup
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Restore workspace data from a previously saved JSON file.
            </p>
            <label className="h-9 px-4 rounded-btn bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-semibold text-xs inline-flex items-center gap-2 cursor-pointer transition-all">
              <Upload className="w-4 h-4" />
              <span>{importSuccess ? 'Import Successful!' : 'Select Backup File'}</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
            {importError && <p className="text-[10px] text-rose-500">Invalid backup JSON file.</p>}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Cheat Sheet */}
      <div className="p-6 rounded-card glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Command className="w-4 h-4 text-purple-500" />
          Keyboard Shortcuts Cheat Sheet
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-card bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Global Search & Command Palette</span>
            <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px]">Cmd + K</span>
          </div>
          <div className="p-3 rounded-card bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Create New Content Draft</span>
            <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px]">Cmd + N</span>
          </div>
          <div className="p-3 rounded-card bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Close Active Modal / Palette</span>
            <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px]">Escape</span>
          </div>
          <div className="p-3 rounded-card bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Toggle Theme Mode</span>
            <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px]">Cmd + Shift + L</span>
          </div>
        </div>
      </div>

      {/* Reset Workspace Option */}
      <div className="p-6 rounded-card bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-3">
        <h3 className="font-bold text-sm text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Reset Workspace Data
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Restore initial Bloome creator sample drafts, templates, and community bookmarks.
        </p>
        <button
          onClick={onResetSampleData}
          className="h-9 px-4 rounded-btn bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Sample Data</span>
        </button>
      </div>
    </div>
  );
};
