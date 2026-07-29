import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, X, Download, Star, Check, RefreshCw, Wand2, Palette, Ratio, Trash2, Search, History, Filter } from 'lucide-react';
import { PlatformType, GeneratedImage } from '../../types';
import { generateAIImage } from '../../lib/puterAI';

interface AIImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform: PlatformType;
  onSaveImage: (img: GeneratedImage) => void;
  onDeleteImage?: (id: string) => void;
  onToggleFavouriteImage?: (id: string) => void;
  allImages?: GeneratedImage[];
}

const STYLES = [
  'Minimal Graphic',
  'Modern Illustration',
  'Quote Card',
  'Product Showcase',
  'Advertisement',
  'Infographic',
  'Thumbnail',
  '3D Render',
];

const ASPECT_RATIOS = ['1:1', '4:5', '9:16', '16:9', '3:2', '2:3', '5:4', '21:9'];

export const AIImageGeneratorModal: React.FC<AIImageGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultPlatform,
  onSaveImage,
  onDeleteImage,
  onToggleFavouriteImage,
  allImages = [],
}) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [platform, setPlatform] = useState<PlatformType>(defaultPlatform === 'dashboard' ? 'instagram' : defaultPlatform);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Minimal Graphic');
  const [mood, setMood] = useState('Clean & Aesthetic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [savedImage, setSavedImage] = useState<GeneratedImage | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  // History filters
  const [historySearch, setHistorySearch] = useState('');
  const [historyPlatform, setHistoryPlatform] = useState<PlatformType | 'all'>('all');
  const [historyFavouriteOnly, setHistoryFavouriteOnly] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedUrl(null);
    setSavedImage(null);

    try {
      const result = await generateAIImage({
        prompt,
        style,
        mood,
        aspectRatio,
        platform,
      });

      const url = result.url;
      setGeneratedUrl(url);

      // Auto create object
      const newImgObj: GeneratedImage = {
        id: `img-${Date.now()}`,
        prompt,
        expandedPrompt: result.expandedPrompt,
        url,
        date: new Date().toISOString(),
        platform,
        favourite: isFavourite,
        style,
        aspectRatio,
        mood,
      };

      setSavedImage(newImgObj);
      onSaveImage(newImgObj);
    } catch (err) {
      console.error('Image generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imgUrl?: string) => {
    const targetUrl = imgUrl || generatedUrl;
    if (!targetUrl) return;
    const a = document.createElement('a');
    a.href = targetUrl;
    a.download = `drafty-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDeleteActiveImage = () => {
    if (savedImage && onDeleteImage) {
      onDeleteImage(savedImage.id);
      setGeneratedUrl(null);
      setSavedImage(null);
    }
  };

  const handleUsePromptFromHistory = (img: GeneratedImage) => {
    setPrompt(img.prompt);
    if (img.platform) setPlatform(img.platform);
    if (img.style) setStyle(img.style);
    if (img.aspectRatio) setAspectRatio(img.aspectRatio);
    if (img.mood) setMood(img.mood);
    setGeneratedUrl(img.url);
    setSavedImage(img);
    setActiveTab('generator');
  };

  const filteredHistory = allImages.filter((img) => {
    const matchesSearch = img.prompt.toLowerCase().includes(historySearch.toLowerCase()) || (img.style && img.style.toLowerCase().includes(historySearch.toLowerCase()));
    const matchesPlatform = historyPlatform === 'all' || img.platform === historyPlatform;
    const matchesFavourite = !historyFavouriteOnly || img.favourite;
    return matchesSearch && matchesPlatform && matchesFavourite;
  });

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
          <div className="p-5 border-b border-slate-200/60 dark:border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Drafty AI Image Studio
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Generate & Manage platform visuals via Puter AI • Saved in Local Storage
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-btn border border-slate-200/60 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('generator')}
                  className={`px-3 py-1.5 rounded-input text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'generator'
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generator</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 rounded-input text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'history'
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>History ({allImages.length})</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'generator' ? (
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
                            ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                    Image Prompt <span className="text-teal-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Futuristic glass workspace with soft emerald lighting and clean laptop setup..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-3 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-teal-500 transition-colors resize-none"
                  />

                  {/* Quick Mockup Prompt Presets */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-400 dark:text-emerald-400/60 font-semibold self-center mr-1">
                      Presets:
                    </span>
                    {[
                      { label: 'SaaS Banner', text: 'SaaS Product Dashboard Banner with dark emerald glassmorphic UI elements and sleek metrics', ar: '16:9', st: 'Minimal Graphic' },
                      { label: 'Quote Card', text: 'Minimalist inspiring creator quote card with ambient typography and dark gradient studio background', ar: '1:1', st: 'Quote Card' },
                      { label: 'Infographic', text: 'Step-by-step content creation workflow visual with clean icon nodes and neon emerald accents', ar: '4:5', st: 'Infographic' },
                      { label: 'Product Showcase', text: 'High luxury dark mode mobile application mockup floating in soft studio spotlight', ar: '9:16', st: 'Product Showcase' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setPrompt(preset.text);
                          setAspectRatio(preset.ar);
                          setStyle(preset.st);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-teal-50 dark:hover:bg-emerald-900/60 text-[10px] font-medium border border-slate-200/60 dark:border-emerald-500/30 transition-all cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-teal-500" />
                    Visual Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STYLES.map((st) => (
                      <button
                        key={st}
                        onClick={() => setStyle(st)}
                        className={`h-9 px-2.5 rounded-input text-xs font-medium border text-left truncate transition-all ${
                          style === st
                            ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-500 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Ratio className="w-3.5 h-3.5 text-teal-500" />
                    Aspect Ratio
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ASPECT_RATIOS.map((ar) => (
                      <button
                        key={ar}
                        onClick={() => setAspectRatio(ar)}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all ${
                          aspectRatio === ar
                            ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700'
                        }`}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood / Atmosphere */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase">
                    Mood & Brand Colors
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Warm emerald, golden sunlight, high luxury"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  id="ai-image-generate-submit-btn"
                  className="w-full h-12 rounded-btn bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 cursor-pointer transition-all"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Rendering Visual Asset...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Generate AI Image ({aspectRatio})</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Output Display */}
              <div className="p-6 flex flex-col justify-between space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Rendered Asset Preview
                    </span>

                    {generatedUrl && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (savedImage && onToggleFavouriteImage) {
                              onToggleFavouriteImage(savedImage.id);
                            }
                            setIsFavourite(!isFavourite);
                          }}
                          className={`p-2 rounded-btn border text-xs font-medium transition-colors ${
                            isFavourite
                              ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 border-amber-300'
                              : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300/60 dark:border-slate-700'
                          }`}
                          title={isFavourite ? 'Unfavourite image' : 'Favourite image'}
                        >
                          <Star className={`w-4 h-4 ${isFavourite ? 'fill-amber-500' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleDownload()}
                          className="h-9 px-3 rounded-btn bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
                          title="Download image"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>

                        {savedImage && onDeleteImage && (
                          <button
                            onClick={handleDeleteActiveImage}
                            className="p-2 rounded-btn bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/30 text-xs transition-colors"
                            title="Delete this image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Image Output Display */}
                  {generatedUrl ? (
                    <div className="space-y-3">
                      <div className="relative rounded-card overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md max-h-[380px] bg-slate-900 flex items-center justify-center">
                        <img
                          src={generatedUrl}
                          alt={prompt}
                          className="w-full h-full object-contain max-h-[380px]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/70 backdrop-blur-md p-2 rounded-xl text-white text-[10px] font-medium flex items-center justify-between">
                          <span className="truncate max-w-[70%]">{prompt}</span>
                          <span className="font-mono bg-teal-500 px-2 py-0.5 rounded text-[9px] font-bold">
                            {aspectRatio} • {style}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Saved automatically to {platform.toUpperCase()} image history & media gallery.
                      </p>
                    </div>
                  ) : (
                    <div className="h-72 rounded-card border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-400">
                      <ImageIcon className="w-10 h-10 text-teal-400 opacity-60" />
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Enter prompt & choose aspect ratio
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-xs">
                        Supports Instagram 1:1, Stories 9:16, X Banners 16:9, and Reddit graphics 4:3.
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
                  Uses Puter.js AI txt2img • Stored locally in Chrome DB
                </div>
              </div>
            </div>
          ) : (
            /* History & Gallery Tab */
            <div className="p-6 overflow-y-auto space-y-4 max-h-[75vh]">
              {/* History Search & Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-card bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search image prompts or styles..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Platform Filter */}
                  <select
                    value={historyPlatform}
                    onChange={(e) => setHistoryPlatform(e.target.value as any)}
                    className="h-8 px-2.5 rounded-input bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="all">All Platforms</option>
                    <option value="x">X / Twitter</option>
                    <option value="reddit">Reddit</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="email">Email</option>
                    <option value="general">General</option>
                  </select>

                  {/* Favourite Filter Toggle */}
                  <button
                    onClick={() => setHistoryFavouriteOnly(!historyFavouriteOnly)}
                    className={`h-8 px-3 rounded-input text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      historyFavouriteOnly
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${historyFavouriteOnly ? 'fill-white' : ''}`} />
                    <span>Favourites</span>
                  </button>
                </div>
              </div>

              {/* History Grid */}
              {filteredHistory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredHistory.map((img) => (
                    <motion.div
                      key={img.id}
                      whileHover={{ y: -2 }}
                      className="rounded-card glass-card border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col justify-between group"
                    >
                      <div className="relative aspect-video bg-slate-950 overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.prompt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[9px] font-bold text-teal-300 uppercase tracking-wider">
                          {img.platform} • {img.aspectRatio}
                        </div>

                        {/* Hover Overlay Action Controls */}
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleUsePromptFromHistory(img)}
                            className="p-2 rounded-btn bg-teal-500 hover:bg-teal-400 text-white text-xs font-semibold flex items-center gap-1 shadow-md"
                            title="Load image details into generator"
                          >
                            <Wand2 className="w-3.5 h-3.5" />
                            <span>Use</span>
                          </button>

                          <button
                            onClick={() => handleDownload(img.url)}
                            className="p-2 rounded-btn bg-slate-800 hover:bg-slate-700 text-white text-xs"
                            title="Download image"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          {onToggleFavouriteImage && (
                            <button
                              onClick={() => onToggleFavouriteImage(img.id)}
                              className={`p-2 rounded-btn text-xs ${
                                img.favourite ? 'bg-amber-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                              title={img.favourite ? 'Unfavourite' : 'Favourite'}
                            >
                              <Star className={`w-3.5 h-3.5 ${img.favourite ? 'fill-white' : ''}`} />
                            </button>
                          )}

                          {onDeleteImage && (
                            <button
                              onClick={() => {
                                onDeleteImage(img.id);
                                if (savedImage?.id === img.id) {
                                  setGeneratedUrl(null);
                                  setSavedImage(null);
                                }
                              }}
                              className="p-2 rounded-btn bg-rose-600 hover:bg-rose-500 text-white text-xs transition-colors"
                              title="Delete image permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-3 space-y-1.5 bg-slate-50/50 dark:bg-slate-900/40">
                        <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2 font-medium">
                          {img.prompt}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{img.style}</span>
                          <span>{new Date(img.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-card border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    No generated AI images found in history.
                  </p>
                  <p className="text-xs text-slate-400">
                    Create your first image in the Generator tab!
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
