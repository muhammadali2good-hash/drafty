import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, X, Download, Star, Check, RefreshCw, Wand2, Palette, Ratio } from 'lucide-react';
import { PlatformType, GeneratedImage } from '../../types';
import { generateAIImage } from '../../lib/puterAI';

interface AIImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform: PlatformType;
  onSaveImage: (img: GeneratedImage) => void;
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
}) => {
  const [platform, setPlatform] = useState<PlatformType>(defaultPlatform === 'dashboard' ? 'instagram' : defaultPlatform);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Minimal Graphic');
  const [mood, setMood] = useState('Clean & Aesthetic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [savedImage, setSavedImage] = useState<GeneratedImage | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedUrl(null);
    setSavedImage(null);

    try {
      const url = await generateAIImage({
        prompt,
        style,
        mood,
        aspectRatio,
        platform,
      });

      setGeneratedUrl(url);

      // Auto create object
      const newImgObj: GeneratedImage = {
        id: `img-${Date.now()}`,
        prompt,
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

  const handleDownload = () => {
    if (!generatedUrl) return;
    const a = document.createElement('a');
    a.href = generatedUrl;
    a.download = `bloome-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="w-full max-w-4xl max-h-[90vh] glass-panel bg-white dark:bg-slate-900 rounded-modal shadow-2xl overflow-hidden flex flex-col border border-slate-200/80 dark:border-slate-800"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Bloome AI Image Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Generate platform visuals via Puter AI • Zero API Keys Required
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

          {/* Main Content */}
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
                        onClick={() => setIsFavourite(!isFavourite)}
                        className={`p-2 rounded-btn border text-xs font-medium transition-colors ${
                          isFavourite
                            ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 border-amber-300'
                            : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300/60 dark:border-slate-700'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isFavourite ? 'fill-amber-500' : ''}`} />
                      </button>

                      <button
                        onClick={handleDownload}
                        className="h-9 px-3 rounded-btn bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
