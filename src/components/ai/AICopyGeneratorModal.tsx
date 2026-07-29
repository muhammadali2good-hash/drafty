import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Copy, Check, Save, RefreshCw, Wand2, Hash, Layers } from 'lucide-react';
import { PlatformType, Draft } from '../../types';
import { generateAICopy } from '../../lib/puterAI';

interface AICopyGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform: PlatformType;
  onSaveToDrafts: (draft: Partial<Draft>) => void;
}

const TONE_OPTIONS = [
  'High Conversion',
  'Authentic & Conversational',
  'Professional & Authoritative',
  'Witty & Playful',
  'Storytelling & Emotional',
  'Urgent & Exciting',
];

export const AICopyGeneratorModal: React.FC<AICopyGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultPlatform,
  onSaveToDrafts,
}) => {
  const [platform, setPlatform] = useState<PlatformType>(defaultPlatform === 'dashboard' ? 'x' : defaultPlatform);
  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('Indie Hackers & Creators');
  const [goal, setGoal] = useState('High Engagement & Retweets');
  const [tone, setTone] = useState('High Conversion');
  const [cta, setCta] = useState('Drop your feedback in the comments!');
  const [keywords, setKeywords] = useState('AI, Productivity, UIUX');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ copy: string; title: string; variants: string[]; hashtags: string[] } | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setIsGenerating(true);
    setResult(null);
    setCopied(false);
    setSaved(false);

    try {
      const res = await generateAICopy({
        idea,
        audience,
        goal,
        tone,
        cta,
        keywords,
        platform,
      });
      setResult(res);
    } catch (err) {
      console.error('Error generating copy:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.copy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDraft = () => {
    if (!result) return;
    onSaveToDrafts({
      title: result.title || idea.slice(0, 40),
      body: result.copy,
      platform,
      tags: result.hashtags || ['AI-Generated'],
      status: 'draft',
      folder: 'AI Copy Output',
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="w-full max-w-4xl max-h-[90vh] glass-panel bg-white dark:bg-black rounded-modal shadow-2xl overflow-hidden flex flex-col border border-slate-200/80 dark:border-emerald-500/40"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200/60 dark:border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Drafty AI Copy Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Powered by Puter AI • Zero API Keys • Platform Rules Respecting
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60 dark:divide-slate-800 overflow-y-auto">
            {/* Input Controls */}
            <div className="p-6 space-y-4">
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                  Target Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['x', 'reddit', 'facebook', 'instagram', 'email', 'general'] as PlatformType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`h-9 px-3 rounded-input text-xs font-semibold uppercase tracking-wider border transition-all ${
                        platform === p
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700 hover:bg-slate-200/60'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Idea Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                  Core Idea / Topic <span className="text-emerald-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 5 non-obvious lessons from building local-first software..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="w-full p-3 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Tone & Goal Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {TONE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">
                    Goal
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Audience & CTA */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">
                    Call To Action
                  </label>
                  <input
                    type="text"
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">
                  Keywords & Tags
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI, SaaS, Productivity"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating || !idea.trim()}
                id="ai-copy-generate-submit-btn"
                className="w-full h-12 rounded-btn bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Crafting Copy for {platform.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Optimized Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Output Display */}
            <div className="p-6 flex flex-col justify-between space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    Generated Copy Output
                  </span>

                  {result && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="h-8 px-2.5 rounded-btn bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={handleSaveDraft}
                        className="h-8 px-3 rounded-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
                      >
                        {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                        <span>{saved ? 'Saved!' : 'Save to Drafts'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Generated Content Box */}
                {result ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-card bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-2">
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {result.title}
                      </p>
                      <div className="text-xs text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto pr-1">
                        {result.copy}
                      </div>
                    </div>

                    {/* Hashtags pill list */}
                    {result.hashtags && result.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {result.hashtags.map((h) => (
                          <span
                            key={h}
                            className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-1"
                          >
                            <Hash className="w-3 h-3 text-emerald-500" />
                            {h.replace('#', '')}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Copy Variants */}
                    {result.variants && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Alternative Copy Formats
                        </p>
                        <div className="space-y-1.5 max-h-36 overflow-y-auto">
                          {result.variants.map((v, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-input bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-[11px] text-slate-600 dark:text-slate-300 whitespace-pre-line"
                            >
                              {v}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-64 rounded-card border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-400">
                    <Sparkles className="w-8 h-8 text-emerald-400 opacity-60" />
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Enter your topic and click Generate
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-xs">
                      Drafty AI formats copy for platform rules (280 chars for X, Threads, Reddit discussion style, IG Carousel hooks).
                    </p>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
                Generated via Puter.js • Saved directly to Chrome Local Storage
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
