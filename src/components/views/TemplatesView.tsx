import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileCode, Plus, Copy, Check, ArrowRight, Tag, Search, Sparkles } from 'lucide-react';
import { ContentTemplate, PlatformType, Draft } from '../../types';

interface TemplatesViewProps {
  templates: ContentTemplate[];
  onApplyTemplate: (tpl: ContentTemplate) => void;
  onSaveNewTemplate: (tpl: Partial<ContentTemplate> & { title: string; body: string; platform: PlatformType }) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  onApplyTemplate,
  onSaveNewTemplate,
}) => {
  const [platformFilter, setPlatformFilter] = useState<PlatformType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // New Template form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('x');
  const [category, setCategory] = useState('Framework');
  const [body, setBody] = useState('');

  const filtered = templates.filter((t) => {
    const matchesPlatform = platformFilter === 'all' || t.platform === platformFilter;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const handleCopy = (t: ContentTemplate) => {
    navigator.clipboard.writeText(t.body);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateTemplate = () => {
    if (!title.trim() || !body.trim()) return;
    onSaveNewTemplate({
      title,
      description,
      platform,
      category,
      body,
      tags: ['Custom'],
    });
    setTitle('');
    setDescription('');
    setBody('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-container glass-panel flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500 text-white">
              Reusable Frameworks
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Content Templates Library
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            High-converting thread structures, email newsletters, educational carousels & Reddit post outlines.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          id="templates-create-new-btn"
          className="h-11 px-4 rounded-btn bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Custom Template</span>
        </button>
      </div>

      {/* Add Drawer */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 rounded-card glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Create Custom Reusable Template
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Template Title (e.g. 5-Slide Reel Blueprint)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            />
            <input
              type="text"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
            />
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformType)}
              className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs uppercase font-bold text-purple-600"
            >
              <option value="x">X (Twitter)</option>
              <option value="reddit">Reddit</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="email">Email</option>
            </select>
          </div>

          <textarea
            rows={5}
            placeholder="Template body structure with placeholders like [HOOK], [LESSON 1]..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="h-8 px-3 rounded-btn bg-slate-200 dark:bg-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTemplate}
              className="h-8 px-4 rounded-btn bg-purple-600 text-white text-xs font-semibold shadow-md"
            >
              Save Template
            </button>
          </div>
        </motion.div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-card glass-panel border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              platformFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            All Platforms
          </button>
          {(['x', 'reddit', 'instagram', 'email', 'facebook'] as PlatformType[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                platformFilter === p
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 px-2.5 rounded-input bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-xs"
          />
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((tpl) => (
          <motion.div
            key={tpl.id}
            whileHover={{ y: -3 }}
            className="p-6 rounded-card glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {tpl.platform} • {tpl.category}
                </span>

                <div className="flex items-center gap-1">
                  {tpl.tags.map((tg) => (
                    <span key={tg} className="text-[9px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {tpl.description}
                </p>
              </div>

              <div className="p-3.5 rounded-input bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {tpl.body}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-800">
              <button
                onClick={() => handleCopy(tpl)}
                className="h-8 px-3 rounded-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedId === tpl.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === tpl.id ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => onApplyTemplate(tpl)}
                className="h-8 px-4 rounded-btn bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply as Draft</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
