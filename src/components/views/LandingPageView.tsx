import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Wand2,
  Image as ImageIcon,
  Layout,
  Layers,
  CheckCircle2,
  Zap,
  Globe,
  Share2,
  ShieldCheck,
  Twitter,
  Instagram,
  Mail,
  MessageSquare,
  Facebook,
  FileText,
  Star,
  Copy,
  ChevronRight,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { PlatformType } from '../../types';

interface LandingPageViewProps {
  onEnterDashboard: (platform?: PlatformType) => void;
  onOpenAICopy: () => void;
  onOpenAIImage: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterDashboard,
  onOpenAICopy,
  onOpenAIImage,
  theme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'x' | 'instagram' | 'reddit' | 'email'>('all');
  const [copiedSample, setCopiedSample] = useState(false);

  const sampleCopies = {
    x: {
      title: 'X / Twitter Thread',
      handle: '@creator_lab',
      content: `1/ 🧵 Most creators build content in the wrong order.

Here is the 4-step framework we used to scale from 0 to 50k followers using structured draft iterations:

2/ First, validate the hook before drafting body text. If the hook doesn't compel a click, the rest of the post is invisible.

3/ Second, convert long-form points into 5-slide Instagram carousels and concise X threads...`,
      badge: 'Thread format',
    },
    instagram: {
      title: 'Instagram Carousel Slides',
      handle: '@visual_creator',
      content: `Slide 1: 5 AI Workflow Hacks Every Creator Needs 🚀
Slide 2: 1. Generate multi-aspect visual assets with Puter AI
Slide 3: 2. Structure 5-slide carousel cards in seconds
Slide 4: 3. Schedule and review drafts across X, Reddit & Email
Slide 5: Save this post to level up your content strategy! 📌`,
      badge: '5 Carousel Slides',
    },
    reddit: {
      title: 'Reddit Community Discussion',
      handle: 'r/Productivity',
      content: `[Discussion] How I built an offline-first draft manager for cross-platform content creators

Hey r/Productivity! As someone managing 5 different platforms, context switching was killing my output.

Key takeaways after 3 months of testing:
- Local browser persistence prevents draft loss
- Structured AI copy templates cut drafting time by 60%...`,
      badge: 'r/Productivity',
    },
    email: {
      title: 'Newsletter Edition #42',
      handle: 'The Creator Pulse',
      content: `Subject: The 3-minute social copy workflow ⚡

Hey Creator,

Welcome back to edition #42. Today we are breaking down how top teams write once and distribute across 5 social channels seamlessly...`,
      badge: 'Email Campaign',
    },
  };

  const activeSample = sampleCopies[activeTab === 'all' ? 'instagram' : activeTab];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-emerald-50 selection:bg-teal-500/20 selection:text-teal-400">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onEnterDashboard('dashboard')}>
            <div className="w-10 h-10 rounded-2xl bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-teal-500/20">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Drafty <span className="text-teal-600 dark:text-teal-400">AI</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-[10px] font-bold border border-teal-200 dark:border-teal-800 uppercase tracking-wider">
                  v2.5 Studio
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Puter AI Powered Workbench</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Features</a>
            <a href="#platforms" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Platforms</a>
            <a href="#ai-studio" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Puter AI Studio</a>
            <a href="#templates" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Templates</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Toggle light / dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => onEnterDashboard('dashboard')}
              id="landing-launch-app-nav-btn"
              className="h-10 px-4 rounded-btn bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-600/20 transition-all cursor-pointer"
            >
              <span>Launch Creator Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        {/* Ambient background blur elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-500/10 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-emerald-950/70 border border-teal-200 dark:border-emerald-500/30 text-teal-700 dark:text-emerald-300 text-xs font-semibold shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
            <span>Powered by Puter AI • Zero Setup & Zero API Keys Required</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15]"
          >
            Craft, Design & Publish <br className="hidden sm:inline" />
            <span className="text-teal-600 dark:text-teal-400">Platform-Optimized</span> Social Content
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Drafty AI is the ultimate multi-platform creator workbench. Write X threads, generate Instagram 5-slide carousels, render aspect-ratio visual assets, and manage drafts in a local-first studio.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => onEnterDashboard('dashboard')}
              id="landing-hero-enter-dashboard-btn"
              className="w-full sm:w-auto h-13 px-7 rounded-btn bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-teal-600/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Open Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAICopy}
              className="w-full sm:w-auto h-13 px-6 rounded-btn bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-teal-500" />
              <span>Try AI Copywriter</span>
            </button>

            <button
              onClick={onOpenAIImage}
              className="w-full sm:w-auto h-13 px-6 rounded-btn bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-pink-500" />
              <span>Try AI Image Studio</span>
            </button>
          </motion.div>

          {/* Key Value Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Offline-First Local Storage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Instagram Carousel 5-Slide Generator
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Aspect Ratio Asset Rendering
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Command Palette (Cmd+K / Cmd+N)
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Platform Preview Section */}
      <section id="platforms" className="py-16 px-6 bg-slate-100/70 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-emerald-500/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Built for Every Social Channel
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Switch seamlessly between X threads, Instagram slide carousels, Reddit discussions, Facebook updates, and Email campaigns.
            </p>
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Platforms', icon: Globe },
              { id: 'x', label: 'X / Twitter', icon: Twitter },
              { id: 'instagram', label: 'Instagram', icon: Instagram },
              { id: 'reddit', label: 'Reddit', icon: MessageSquare },
              { id: 'email', label: 'Email', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-btn text-xs font-semibold flex items-center gap-2 border transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Preview Card */}
          <div className="max-w-3xl mx-auto glass-panel bg-white dark:bg-black p-6 rounded-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-xs text-slate-400">{activeSample.handle}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-[11px] font-bold border border-teal-200 dark:border-teal-800">
                {activeSample.badge}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                {activeSample.title}
              </h3>
              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-input border border-slate-200/60 dark:border-slate-800">
                {activeSample.content}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleCopyText(activeSample.content)}
                className="px-3 py-1.5 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample ? 'Copied to Clipboard!' : 'Copy Sample'}</span>
              </button>

              <button
                onClick={() => onEnterDashboard(activeTab === 'all' ? 'instagram' : (activeTab as PlatformType))}
                className="px-4 py-1.5 rounded-btn bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-600/20 transition-all cursor-pointer"
              >
                <span>Open {activeTab === 'all' ? 'Instagram' : activeTab.toUpperCase()} Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              Architected for Speed & Creativity
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Everything you need to write, refine, design, and manage content in a unified studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-teal-500/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Puter AI Copy Generator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate tailored copy for X threads, Instagram captions, Reddit discussions, Facebook posts, and Email newsletters using Puter.js AI.
              </p>
              <button
                onClick={onOpenAICopy}
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                Try Copy Generator →
              </button>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-teal-500/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Instagram 5-Slide Carousel AI
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automatically generate structured 5-slide visual carousel outlines for Instagram. Refine individual slides or generate all slides in one click.
              </p>
              <button
                onClick={() => onEnterDashboard('instagram')}
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline inline-flex items-center gap-1"
              >
                Open Instagram Studio →
              </button>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-teal-500/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Aspect Ratio Image Studio
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Render platform-specific visual assets (1:1 Instagram, 9:16 Stories/Reels, 16:9 X Banners, 4:5 Cards). Manage image history & favourites.
              </p>
              <button
                onClick={onOpenAIImage}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                Launch Image Studio →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Puter AI Highlights */}
      <section id="ai-studio" className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
              Zero Key Infrastructure
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Instant AI Intelligence Powered by Puter.js
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              No complex API key configuration or payment setup required. Drafty AI taps into Puter.js AI directly in your browser session for copywriting, carousel slide breakdown, and image rendering.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Smart Fallback Generators built-in for offline capability</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant single-click slide & post refinement</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Local storage draft sync with zero server tracking</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-card bg-slate-950 border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-teal-400 font-bold">Drafty AI Studio Console</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <p className="text-emerald-400">&gt; puter.ai.chat("Write 5 Instagram carousel slides...")</p>
              <p className="text-slate-400 pl-3">✓ 5 slides generated in 0.4s</p>
              <p className="text-teal-400">&gt; puter.ai.txt2img("Futuristic SaaS banner", &#123; aspectRatio: "16:9" &#125;)</p>
              <p className="text-slate-400 pl-3">✓ Visual asset rendered & saved to local storage</p>
            </div>
            <button
              onClick={() => onEnterDashboard('dashboard')}
              className="w-full h-11 rounded-btn bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Launch Console & Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="py-16 px-6 bg-slate-100 dark:bg-black border-t border-slate-200/80 dark:border-emerald-500/20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
            Ready to streamline your social workflow?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Start writing platform-optimized drafts, generating Instagram carousel slides, and building visual assets right now.
          </p>
          <div>
            <button
              onClick={() => onEnterDashboard('dashboard')}
              id="landing-footer-enter-app-btn"
              className="h-13 px-8 rounded-btn bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-xl shadow-teal-600/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Enter Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            Drafty AI Studio v2.5 • Powered by Puter AI & Local Browser DB
          </p>
        </div>
      </footer>
    </div>
  );
};
