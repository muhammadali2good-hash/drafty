import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  FileCode,
  Star,
  Copy,
  ChevronRight,
  Sun,
  Moon,
  Laptop,
  Leaf,
  ChevronDown,
  HelpCircle,
  Sliders,
  Check,
  RefreshCw,
  Plus,
  Play,
  Award,
  Users,
  Database,
} from 'lucide-react';
import { PlatformType } from '../../types';
import { generateInstagramCarouselSlides } from '../../lib/puterAI';

interface LandingPageViewProps {
  onEnterDashboard: (platform?: PlatformType) => void;
  onOpenAICopy: () => void;
  onOpenAIImage: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

// Brand Leaf Icon Badge Component matching user's uploaded image (emerald circle with white leaf outline)
const BrandLeafBadge: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const containerClasses = {
    sm: 'w-8 h-8 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30 border border-emerald-300/40',
    md: 'w-10 h-10 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 border border-emerald-300/40',
    lg: 'w-14 h-14 rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/40 border-2 border-emerald-300/50',
  }[size];

  const iconClasses = {
    sm: 'w-4 h-4 text-white stroke-[2.2]',
    md: 'w-5 h-5 text-white stroke-[2.2]',
    lg: 'w-7 h-7 text-white stroke-[2.2]',
  }[size];

  return (
    <div className={`${containerClasses} flex items-center justify-center shrink-0`}>
      <Leaf className={iconClasses} />
    </div>
  );
};

// Cloud Dust Text Animation Component (animates letter-by-letter from blurry stardust particles)
const CloudDustHeadline: React.FC<{ text: string; highlightText: string }> = ({ text, highlightText }) => {
  const fullText = `${text} ${highlightText}`;
  const letters = Array.from(fullText);

  return (
    <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-slate-900 dark:text-white flex flex-wrap justify-center">
      {letters.map((char, index) => {
        const isHighlight = index >= text.length + 1;
        return (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              filter: 'blur(16px)',
              y: -18,
              scale: 1.5,
              rotate: (index % 2 === 0 ? 1 : -1) * (Math.random() * 12),
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.025,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${char === ' ' ? 'w-3 sm:w-4' : ''} ${
              isHighlight ? 'text-teal-600 dark:text-teal-400 font-extrabold' : ''
            }`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </h1>
  );
};

// Dynamic Spotlight Floating Navbar with Cursor Mouse Tracking Glow
const SpotlightNavbar: React.FC<{
  onEnterDashboard: (platform?: PlatformType) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}> = ({ onEnterDashboard, theme, onToggleTheme }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Overview', icon: Layout },
    { id: 'templates-showcase', label: 'Templates', icon: FileCode },
    { id: 'playground', label: 'Carousel AI', icon: Sparkles },
    { id: 'platforms', label: 'Platforms', icon: Globe },
    { id: 'workflow', label: 'Workflow', icon: Layers },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'matrix', label: 'Compare', icon: Sliders },
    { id: 'testimonials', label: 'Proof', icon: Star },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  // Scroll Spy Observer to active link
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-2 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 pointer-events-auto">
        {/* Main Floating Spotlight Navbar Container */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative flex-1 flex items-center justify-between px-3 sm:px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-teal-500/30 shadow-xl shadow-teal-950/10 dark:shadow-teal-900/20 transition-all duration-300 gap-2 sm:gap-3 font-sans"
        >
          {/* Dynamic Spotlight Radial Light Layer following Mouse Position */}
          {isHovering && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${
                  theme === 'dark' ? 'rgba(45, 212, 191, 0.18)' : 'rgba(20, 184, 166, 0.12)'
                }, transparent 75%)`,
              }}
            />
          )}

          {/* Brand Logo & Leaf Badge */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 cursor-pointer group shrink-0 relative z-10"
          >
            <BrandLeafBadge size="sm" />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors whitespace-nowrap">
                Drafty <span className="text-teal-600 dark:text-teal-400">AI</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-400 hidden xl:inline-block leading-none">
                Studio v2.5
              </span>
            </div>
          </div>

          {/* Desktop Nav Items with Active Indicator Pill */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 relative z-10 px-1.5 py-1 bg-slate-100/70 dark:bg-slate-950/70 rounded-full border border-slate-200/60 dark:border-slate-800/80 max-w-full overflow-x-auto no-scrollbar">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-2.5 lg:px-3 py-1 rounded-full text-[11px] lg:text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'text-teal-950 dark:text-teal-100 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="spotlightNavActivePill"
                      className="absolute inset-0 rounded-full bg-teal-400/30 dark:bg-teal-500/30 border border-teal-500/40 dark:border-teal-400/50 shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 shrink-0 relative z-10 ${isActive ? 'text-teal-700 dark:text-teal-300' : ''}`} />
                  <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & Launch Studio CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 shrink-0">
            <button
              onClick={onToggleTheme}
              className="p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
              title="Toggle light / dark theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => onEnterDashboard('dashboard')}
              id="spotlight-nav-launch-btn"
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-600/30 transition-all cursor-pointer hover:scale-[1.03] shrink-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Launch Studio</span>
              <span className="sm:hidden">Launch</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-teal-500/30 shadow-2xl space-y-2 pointer-events-auto"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-500/10 dark:bg-teal-950/80 border-teal-500/40 text-teal-700 dark:text-teal-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-teal-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterDashboard,
  onOpenAICopy,
  onOpenAIImage,
  theme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'x' | 'instagram' | 'reddit' | 'email'>('all');
  const [copiedSample, setCopiedSample] = useState(false);

  // Interactive Live Playground State
  const [playgroundPrompt, setPlaygroundPrompt] = useState('5 Secrets to Double Instagram Carousel Reach');
  const [playgroundSlides, setPlaygroundSlides] = useState<string[]>([
    'Slide 1: 5 Secrets to Double Instagram Reach 🚀',
    'Slide 2: 1. Craft a high-converting visual hook title',
    'Slide 3: 2. Structure 5 scannable advice cards',
    'Slide 4: 3. Use 1:1 or 9:16 aspect ratio assets',
    'Slide 5: Save & share this post with fellow creators! 📌',
  ]);
  const [isGeneratingPlayground, setIsGeneratingPlayground] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const handleTestPlaygroundGeneration = async () => {
    setIsGeneratingPlayground(true);
    try {
      const slides = await generateInstagramCarouselSlides(playgroundPrompt, 5);
      if (slides && slides.length > 0) {
        setPlaygroundSlides(slides);
      }
    } catch (e) {
      console.warn('Playground generation fallback:', e);
    } finally {
      setIsGeneratingPlayground(false);
    }
  };

  const faqItems = [
    {
      q: 'How does the Instagram Carousel 5-Slide generator work?',
      a: 'Drafty AI connects directly to Puter.js AI in your browser session. When you type a topic or caption, it automatically structures a 5-slide carousel consisting of a hook title, 3 actionable insight slides, and a call-to-action slide. You can edit each slide individually or regenerate them in one click.',
    },
    {
      q: 'Do I need API keys or credit cards to use Drafty AI?',
      a: 'Zero API keys required! Drafty AI utilizes Puter.js in-browser AI engines for both copywriting and visual image generation. All features work immediately out-of-the-box.',
    },
    {
      q: 'Is my content and data private?',
      a: 'Yes! Drafty AI is built local-first. All your drafts, saved images, and custom templates are persisted securely inside your local browser database. Your data never leaves your device unless you export it.',
    },
    {
      q: 'What aspect ratios are supported in the AI Image Studio?',
      a: 'We support all major social media aspect ratios: 1:1 (Instagram Feed), 9:16 (Stories/Reels), 16:9 (X/Twitter Banners), 4:5 (Portrait Graphics), and 4:3 (Reddit/Standard).',
    },
    {
      q: 'Can I export my drafts to markdown or plain text?',
      a: 'Absolutely. Every draft can be copied with one click, converted into thread format, or exported directly into markdown.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-emerald-50 selection:bg-teal-500/20 selection:text-teal-400 overflow-x-hidden pt-16 sm:pt-20">
      {/* Floating Spotlight Navbar */}
      <SpotlightNavbar
        onEnterDashboard={onEnterDashboard}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* Hero Section with Cloud Dust Letter-by-Letter Animation */}
      <section id="hero" className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Floating dust particle backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 dark:bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-teal-400/40 animate-ping" />
        <div className="absolute top-36 right-16 w-3 h-3 rounded-full bg-emerald-400/30 animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-teal-300/40 animate-bounce" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Brand Icon Header Tag */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-emerald-500/30 shadow-md"
            >
              <BrandLeafBadge size="sm" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Puter AI Multi-Platform Creator Workbench
              </span>
            </motion.div>
          </div>

          {/* Cloud Dust Letter-by-Letter Headline */}
          <CloudDustHeadline text="Craft, Design & Publish" highlightText="Platform-Optimized Social Content" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Drafty AI is the ultimate creator studio. Write X threads, generate Instagram 5-slide carousels, render aspect-ratio visual assets, and manage drafts in a local-first browser studio.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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

          {/* Key Metric Highlights */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {[
              { label: 'Platform Workspaces', val: '6 Platforms', sub: 'X, Instagram, Reddit, Email, FB, General' },
              { label: 'Carousel Generator', val: '5 AI Slides', sub: 'Automatic hook & CTA breakdown' },
              { label: 'Visual Rendering', val: 'Multi Aspect', sub: '1:1, 9:16, 16:9, 4:5, 4:3' },
              { label: 'Privacy First', val: '100% Local', sub: 'IndexedDB browser storage' },
            ].map((m, idx) => (
              <div key={idx} className="p-4 rounded-card bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm">
                <p className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{m.label}</p>
                <p className="text-lg font-display font-extrabold text-slate-900 dark:text-white mt-0.5">{m.val}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Interactive Live Puter AI Carousel Builder Demo */}
      <section id="playground" className="py-20 px-6 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/30">
              Interactive Live Demo
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Test the Instagram Carousel 5-Slide AI
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Type any caption topic below to see Puter AI instantly generate a 5-card Instagram carousel layout!
            </p>
          </div>

          <div className="p-6 rounded-card bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
            {/* Input Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={playgroundPrompt}
                onChange={(e) => setPlaygroundPrompt(e.target.value)}
                placeholder="Enter carousel topic or post idea..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-input px-4 py-3 text-xs text-white focus:outline-none focus:border-pink-500 font-medium"
              />
              <button
                type="button"
                onClick={handleTestPlaygroundGeneration}
                disabled={isGeneratingPlayground}
                className="h-11 px-6 rounded-btn bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 transition-all cursor-pointer shrink-0"
              >
                <Sparkles className={`w-4 h-4 ${isGeneratingPlayground ? 'animate-spin' : ''}`} />
                <span>{isGeneratingPlayground ? 'Generating Slides...' : 'Generate 5 Carousel Slides'}</span>
              </button>
            </div>

            {/* Live Generated Cards Output */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {playgroundSlides.map((slideText, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-card bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                      Slide #{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {slideText}
                  </p>
                  <div className="pt-2 text-[9px] text-slate-500 font-mono">
                    {idx === 0 ? '🎯 Hook Slide' : idx === 4 ? '📌 CTA Slide' : '💡 Content Slide'}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-900">
              <span>Try this full workflow inside the Instagram workspace!</span>
              <button
                onClick={() => onEnterDashboard('instagram')}
                className="text-pink-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                Open Instagram Studio →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Templates Library Showcase Section */}
      <section id="templates-showcase" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-purple-500/10 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-200 dark:border-purple-800">
              Reusable Creator Blueprints
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Content Templates Library
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Pre-built, high-converting frameworks for X viral threads, Reddit authentic showcases, Instagram educational carousels, and newsletter broadcasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Value Thread Framework',
                platform: 'X (Twitter)',
                category: 'Growth',
                desc: 'Hook + 4 Actionable Takeaways + Summary Retweet CTA.',
                badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
              },
              {
                title: 'Authentic Builder Story',
                platform: 'Reddit',
                category: 'Showcase',
                desc: 'Non-spammy, high-upvote founder story for tech subreddits.',
                badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
              },
              {
                title: '5-Slide IG Carousel',
                platform: 'Instagram',
                category: 'Educational',
                desc: 'Slide-by-slide visual blueprint with hook, mistakes & solution.',
                badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
              },
              {
                title: 'Product Launch Email',
                platform: 'Email',
                category: 'Conversion',
                desc: 'High-CTR newsletter outline with clear primary CTA.',
                badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
              },
            ].map((tpl, idx) => (
              <div
                key={idx}
                className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-purple-500/40 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${tpl.badgeColor}`}>
                      {tpl.platform}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{tpl.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>
                <button
                  onClick={() => onEnterDashboard('templates')}
                  className="w-full h-9 rounded-btn bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Use Template</span>
                </button>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onEnterDashboard('templates')}
              id="landing-templates-explore-btn"
              className="h-12 px-6 rounded-btn bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore All Content Templates →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Platform Preview Section */}
      <section id="platforms" className="py-20 px-6 bg-slate-100/70 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-emerald-500/10">
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
                className="px-3 py-1.5 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
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

      {/* NEW SECTION 2: 4-Step Creator Workflow Timeline */}
      <section id="workflow" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-teal-500/10 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-200 dark:border-teal-800">
              End-to-End Workflow
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              From Cloud Dust Idea to Published Post
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              How Drafty AI turns raw thoughts into structured, high-performing multi-channel content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Ideate & Hook',
                desc: 'Capture raw thoughts in the command palette (Cmd+N) or select pre-tested creator templates.',
                icon: Wand2,
                color: 'text-teal-500',
              },
              {
                step: '02',
                title: 'Puter AI Generation',
                desc: 'Generate platform copy, viral hooks, and 5-slide Instagram carousel card outlines in seconds.',
                icon: Sparkles,
                color: 'text-pink-500',
              },
              {
                step: '03',
                title: 'Aspect-Ratio Assets',
                desc: 'Render complementary visual graphics (1:1, 9:16, 16:9) via Puter.js image generation.',
                icon: ImageIcon,
                color: 'text-emerald-500',
              },
              {
                step: '04',
                title: 'Local Sync & Publish',
                desc: 'Save securely in IndexedDB local browser database and copy formatted posts with one tap.',
                icon: Database,
                color: 'text-sky-500',
              },
            ].map((st, i) => {
              const IconComponent = st.icon;
              return (
                <div key={i} className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 relative overflow-hidden group hover:border-teal-500/40 transition-all">
                  <div className="text-3xl font-display font-black text-slate-200 dark:text-slate-800 absolute top-3 right-4">
                    {st.step}
                  </div>
                  <div className={`w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 ${st.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Feature Cards Bento Grid */}
      <section id="features" className="py-20 px-6 bg-slate-100/60 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800">
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
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
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
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
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
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Launch Image Studio →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: Creator Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-200 dark:border-amber-800">
              Creator Proof
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Loved by Content Creators & Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Elena Rostova',
                role: 'Tech Creator & Newsletter Writer',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
                quote: 'The 5-slide Instagram carousel generator changed my workflow completely. I turn my long-form newsletter points into carousel cards in less than 2 minutes.',
                rating: 5,
              },
              {
                name: 'Marcus Chen',
                role: 'SaaS Founder @ FlowMetric',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
                quote: 'Zero API keys required is huge. I opened Drafty AI and started generating X threads and image assets immediately without setting up billing or keys.',
                rating: 5,
              },
              {
                name: 'Sarah Jenkins',
                role: 'Social Media Strategist',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
                quote: 'Having local storage persistence means I never lose my draft iterations even if my browser reloads. The Puter AI image generator with 1:1 and 9:16 aspect ratios is fantastic.',
                rating: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 4: Zero-Cost Tier Comparison Matrix */}
      <section id="matrix" className="py-20 px-6 bg-slate-100/70 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-emerald-500/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              Zero Cost Architecture
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Why Drafty AI is Different
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Comparing standard SaaS tools with Drafty AI’s zero-key, local browser stack.
            </p>
          </div>

          <div className="rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl">
            <div className="grid grid-cols-3 p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div>Feature Capability</div>
              <div className="text-center text-slate-400">Traditional SaaS Apps</div>
              <div className="text-center text-teal-600 dark:text-teal-400 font-extrabold flex items-center justify-center gap-1.5">
                <BrandLeafBadge size="sm" />
                <span>Drafty AI Studio</span>
              </div>
            </div>

            {[
              { f: 'API Key Configuration', trad: 'Mandatory $20/mo key setup', drafty: 'Zero Keys Required (Puter AI)' },
              { f: 'Instagram 5-Slide Carousel', trad: 'Manual slide creation', drafty: '1-Click Puter AI Auto-Breakdown' },
              { f: 'Image Aspect Ratio Support', trad: 'Fixed single ratio', drafty: '1:1, 9:16, 16:9, 4:5, 4:3 Ratios' },
              { f: 'Data Privacy & Storage', trad: 'Stored on 3rd-party servers', drafty: '100% Local Browser Database' },
              { f: 'Offline Capability', trad: 'Fails when offline', drafty: 'Full Local Editing & Fallback' },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 border-b border-slate-100 dark:border-slate-800/60 text-xs items-center">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{row.f}</div>
                <div className="text-center text-slate-400">{row.trad}</div>
                <div className="text-center font-bold text-teal-600 dark:text-teal-400 flex items-center justify-center gap-1">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{row.drafty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 5: FAQ Accordion */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Got questions about Drafty AI and Puter.js? We have answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-sm text-slate-900 dark:text-white cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="py-20 px-6 bg-slate-900 text-white border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="flex justify-center">
            <BrandLeafBadge size="lg" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Ready to streamline your social workflow?
          </h2>
          <p className="text-sm text-slate-300">
            Start writing platform-optimized drafts, generating Instagram carousel slides, and building visual assets right now.
          </p>
          <div>
            <button
              onClick={() => onEnterDashboard('dashboard')}
              id="landing-footer-enter-app-btn"
              className="h-13 px-8 rounded-btn bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm inline-flex items-center gap-2.5 shadow-xl shadow-teal-500/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Enter Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-4">
            <span>Drafty AI Studio v2.5</span>
            <span>•</span>
            <span>Powered by Puter AI</span>
            <span>•</span>
            <span>Local Browser DB</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
