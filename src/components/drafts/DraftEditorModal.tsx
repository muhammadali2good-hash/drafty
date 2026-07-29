import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  Pin,
  Tag as TagIcon,
  Folder,
  Image as ImageIcon,
  Plus,
  Trash2,
  ListPlus,
  Eye,
  FileEdit,
  Sparkles,
  Check,
  Paperclip,
  Clock,
  Send,
  HelpCircle,
  Type,
  FileText,
} from 'lucide-react';
import { Draft, PlatformType, MediaItem, DraftStatus } from '../../types';

interface DraftEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  draft: Draft | null;
  defaultPlatform: PlatformType;
  onSave: (draftData: Partial<Draft> & { platform: PlatformType }) => void;
  onDelete?: (id: string) => void;
}

export const DraftEditorModal: React.FC<DraftEditorModalProps> = ({
  isOpen,
  onClose,
  draft,
  defaultPlatform,
  onSave,
  onDelete,
}) => {
  const [platform, setPlatform] = useState<PlatformType>(
    draft?.platform || (defaultPlatform === 'dashboard' ? 'x' : defaultPlatform)
  );
  const [title, setTitle] = useState(draft?.title || '');
  const [body, setBody] = useState(draft?.body || '');
  const [status, setStatus] = useState<DraftStatus>(draft?.status || 'draft');
  const [pinned, setPinned] = useState(draft?.pinned || false);
  const [folder, setFolder] = useState(draft?.folder || 'General');
  const [tags, setTags] = useState<string[]>(draft?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [media, setMedia] = useState<MediaItem[]>(draft?.media || []);
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  // X Thread builder
  const [threadItems, setThreadItems] = useState<string[]>(
    draft?.threadItems || [draft?.body || '']
  );

  // Instagram Carousel Slides
  const [carouselSlides, setCarouselSlides] = useState<string[]>(
    draft?.instagramCarouselSlides || ['Slide 1: Hook', 'Slide 2: Value Point']
  );

  // Email extras
  const [emailSubject, setEmailSubject] = useState(draft?.emailSubject || '');
  const [emailPreviewText, setEmailPreviewText] = useState(draft?.emailPreviewText || '');

  // Reddit extras
  const [redditSubreddit, setRedditSubreddit] = useState(draft?.redditSubreddit || 'r/SideProject');
  const [redditPostType, setRedditPostType] = useState(draft?.redditPostType || 'discussion');

  // Preview tab
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (draft) {
      setPlatform(draft.platform);
      setTitle(draft.title);
      setBody(draft.body);
      setStatus(draft.status);
      setPinned(draft.pinned);
      setFolder(draft.folder || 'General');
      setTags(draft.tags || []);
      setMedia(draft.media || []);
      setThreadItems(draft.threadItems || [draft.body || '']);
      setCarouselSlides(draft.instagramCarouselSlides || ['Slide 1', 'Slide 2']);
      setEmailSubject(draft.emailSubject || '');
      setEmailPreviewText(draft.emailPreviewText || '');
      setRedditSubreddit(draft.redditSubreddit || 'r/SideProject');
      setRedditPostType(draft.redditPostType || 'discussion');
    } else {
      setPlatform(defaultPlatform === 'dashboard' ? 'x' : defaultPlatform);
      setTitle('');
      setBody('');
      setStatus('draft');
      setPinned(false);
      setFolder('General');
      setTags([]);
      setMedia([]);
      setThreadItems(['']);
      setCarouselSlides(['Slide 1']);
      setEmailSubject('');
      setEmailPreviewText('');
      setRedditSubreddit('r/SideProject');
      setRedditPostType('discussion');
    }
  }, [draft, defaultPlatform, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleAddMediaUrl = () => {
    if (!mediaUrlInput.trim()) return;
    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      url: mediaUrlInput.trim(),
      type: 'image',
      name: `asset_${media.length + 1}.png`,
    };
    setMedia([...media, newItem]);
    setMediaUrlInput('');
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  // Thread items
  const handleAddThreadItem = () => {
    setThreadItems([...threadItems, '']);
  };

  const handleUpdateThreadItem = (index: number, val: string) => {
    const copy = [...threadItems];
    copy[index] = val;
    setThreadItems(copy);
    if (index === 0) setBody(val);
  };

  const handleRemoveThreadItem = (index: number) => {
    if (threadItems.length <= 1) return;
    setThreadItems(threadItems.filter((_, i) => i !== index));
  };

  // Carousel slides
  const handleAddCarouselSlide = () => {
    setCarouselSlides([...carouselSlides, `Slide ${carouselSlides.length + 1}`]);
  };

  const handleUpdateCarouselSlide = (index: number, val: string) => {
    const copy = [...carouselSlides];
    copy[index] = val;
    setCarouselSlides(copy);
  };

  const handleRemoveCarouselSlide = (index: number) => {
    setCarouselSlides(carouselSlides.filter((_, i) => i !== index));
  };

  const handleSaveSubmit = () => {
    const fullBody = platform === 'x' && threadItems.length > 0 ? threadItems.join('\n\n---\n\n') : body;
    onSave({
      id: draft?.id,
      title: title || 'Untitled Draft',
      body: fullBody,
      platform,
      status,
      pinned,
      folder,
      tags,
      media,
      threadItems: platform === 'x' ? threadItems : undefined,
      instagramCarouselSlides: platform === 'instagram' ? carouselSlides : undefined,
      emailSubject: platform === 'email' ? emailSubject : undefined,
      emailPreviewText: platform === 'email' ? emailPreviewText : undefined,
      redditSubreddit: platform === 'reddit' ? redditSubreddit : undefined,
      redditPostType: platform === 'reddit' ? redditPostType : undefined,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  // Real-time word and character count calculations
  const getCombinedContentText = () => {
    if (platform === 'x') {
      return threadItems.join(' ');
    }
    if (platform === 'instagram') {
      return [body, ...carouselSlides].join(' ');
    }
    return body;
  };

  const combinedContentText = getCombinedContentText();
  const charCount = combinedContentText.length;
  const wordCount = combinedContentText.trim() ? combinedContentText.trim().split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const isXOverLimit = platform === 'x' && threadItems.some((item) => item.length > 280);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="w-full max-w-5xl max-h-[92vh] glass-panel bg-white dark:bg-black rounded-modal shadow-2xl overflow-hidden flex flex-col border border-slate-200/80 dark:border-emerald-500/40"
        >
          {/* Top Bar Controls */}
          <div className="px-6 py-4 border-b border-slate-200/60 dark:border-emerald-500/20 flex items-center justify-between bg-slate-50/50 dark:bg-black/90">
            <div className="flex items-center gap-3">
              {/* Platform Selector */}
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
                className="h-9 px-3 rounded-input bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-500/30 focus:outline-none"
              >
                <option value="x">X (Twitter)</option>
                <option value="reddit">Reddit</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="email">Email</option>
                <option value="general">General Drafts</option>
              </select>

              {/* Status Picker */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DraftStatus)}
                className="h-9 px-3 rounded-input bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs border border-slate-200/60 dark:border-slate-700 focus:outline-none"
              >
                <option value="draft">🟡 Draft</option>
                <option value="review">🔵 In Review</option>
                <option value="ready">🟢 Ready</option>
                <option value="archived">⚪ Archived</option>
              </select>

              {/* Pin Toggle */}
              <button
                onClick={() => setPinned(!pinned)}
                className={`p-2 rounded-btn border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  pinned
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200/60 dark:border-slate-700'
                }`}
              >
                <Pin className={`w-3.5 h-3.5 ${pinned ? 'fill-amber-500' : ''}`} />
                <span className="hidden sm:inline">{pinned ? 'Pinned' : 'Pin'}</span>
              </button>
            </div>

            {/* View Tab Switcher & Save Action */}
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-btn border border-slate-200/60 dark:border-slate-700">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-input text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'edit'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-input text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'preview'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              {draft && onDelete && (
                <button
                  onClick={() => {
                    onDelete(draft.id);
                    onClose();
                  }}
                  className="p-2 rounded-btn text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete Draft"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handleSaveSubmit}
                id="draft-editor-save-btn"
                className="h-10 px-4 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saveSuccess ? 'Saved!' : 'Save Draft'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-btn text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-6 overflow-y-auto flex-1 min-h-0 space-y-6">
            {activeTab === 'edit' ? (
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Draft Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-2xl font-display font-bold text-slate-900 dark:text-white placeholder-slate-400 bg-transparent border-none focus:outline-none"
                  />
                </div>

                {/* Platform Specific Header Options */}
                {platform === 'email' && (
                  <div className="p-4 rounded-card bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">
                        Email Subject Line
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Issue #42: Modern Creator Dashboards 🌿"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full h-9 px-3 rounded-input bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">
                        Preview Text (Preheader)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Why local-first software is taking over creator workflows..."
                        value={emailPreviewText}
                        onChange={(e) => setEmailPreviewText(e.target.value)}
                        className="w-full h-9 px-3 rounded-input bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-xs text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>
                )}

                {platform === 'reddit' && (
                  <div className="p-4 rounded-card bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-800/40 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider mb-1">
                        Target Subreddit
                      </label>
                      <input
                        type="text"
                        placeholder="r/SideProject, r/webdev, r/SaaS"
                        value={redditSubreddit}
                        onChange={(e) => setRedditSubreddit(e.target.value)}
                        className="w-full h-9 px-3 rounded-input bg-white dark:bg-slate-800 border border-orange-300 dark:border-orange-700 text-xs font-semibold"
                      />
                    </div>
                    <div className="w-48">
                      <label className="block text-[11px] font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider mb-1">
                        Post Format
                      </label>
                      <select
                        value={redditPostType}
                        onChange={(e) => setRedditPostType(e.target.value as any)}
                        className="w-full h-9 px-2.5 rounded-input bg-white dark:bg-slate-800 border border-orange-300 dark:border-orange-700 text-xs"
                      >
                        <option value="discussion">Discussion</option>
                        <option value="text">Text Post</option>
                        <option value="ama">AMA Draft</option>
                        <option value="question">Question</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Body / Thread Editor for X */}
                {platform === 'x' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <ListPlus className="w-4 h-4 text-sky-500" />
                        X Thread Builder ({threadItems.length} Tweets)
                      </span>
                      <button
                        onClick={handleAddThreadItem}
                        className="h-8 px-3 rounded-btn bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Tweet</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {threadItems.map((item, idx) => {
                        const len = item.length;
                        const isOver = len > 280;
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-card bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 relative"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                {idx + 1}/ Tweet {idx === 0 ? '(Main)' : ''}
                              </span>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                    isOver
                                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                      : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                                  }`}
                                >
                                  {len} / 280
                                </span>
                                {threadItems.length > 1 && (
                                  <button
                                    onClick={() => handleRemoveThreadItem(idx)}
                                    className="p-1 text-slate-400 hover:text-rose-500"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <textarea
                              rows={3}
                              value={item}
                              onChange={(e) => handleUpdateThreadItem(idx, e.target.value)}
                              placeholder={`Tweet ${idx + 1} content...`}
                              className="w-full bg-white dark:bg-slate-900 p-3 rounded-input border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : platform === 'instagram' ? (
                  /* Instagram Carousel & Caption Editor */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Caption & Hook
                      </label>
                      <textarea
                        rows={5}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your Instagram caption & hashtags..."
                        className="w-full p-4 rounded-card bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-pink-500" />
                          Carousel Slide Cards ({carouselSlides.length})
                        </span>
                        <button
                          onClick={handleAddCarouselSlide}
                          className="h-8 px-3 rounded-btn bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Slide</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {carouselSlides.map((slide, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-card bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-pink-600 dark:text-pink-400">
                                Slide #{idx + 1}
                              </span>
                              {carouselSlides.length > 1 && (
                                <button
                                  onClick={() => handleRemoveCarouselSlide(idx)}
                                  className="p-1 text-slate-400 hover:text-rose-500"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            <input
                              type="text"
                              value={slide}
                              onChange={(e) => handleUpdateCarouselSlide(idx, e.target.value)}
                              className="w-full bg-white dark:bg-slate-900 p-2.5 rounded-input border border-slate-200/80 dark:border-slate-800 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Rich Body Editor */
                  <div>
                    <textarea
                      rows={10}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Write your draft using Markdown..."
                      className="w-full p-4 rounded-card bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-sans focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
                    />
                  </div>
                )}

                {/* Media Attachments */}
                <div className="space-y-3 p-4 rounded-card bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4 text-emerald-500" />
                      Media Attachments ({media.length})
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={mediaUrlInput}
                        onChange={(e) => setMediaUrlInput(e.target.value)}
                        className="h-8 px-2.5 rounded-input bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-xs"
                      />
                      <button
                        onClick={handleAddMediaUrl}
                        className="h-8 px-3 rounded-btn bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>

                  {media.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {media.map((item) => (
                        <div key={item.id} className="relative rounded-card overflow-hidden group border border-slate-200 dark:border-slate-700">
                          <img src={item.url} alt={item.name} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
                          <button
                            onClick={() => handleRemoveMedia(item.id)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/70 text-white hover:bg-rose-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags & Folder Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Folder */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-emerald-500" />
                      Folder Collection
                    </label>
                    <input
                      type="text"
                      value={folder}
                      onChange={(e) => setFolder(e.target.value)}
                      placeholder="e.g. Strategy, Product, Personal"
                      className="w-full h-9 px-3 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <TagIcon className="w-3.5 h-3.5 text-emerald-500" />
                      Tags (Press Enter)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tag..."
                        className="w-full h-9 px-3 rounded-input bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                      />
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1"
                            >
                              {t}
                              <button onClick={() => handleRemoveTag(t)}>
                                <X className="w-3 h-3 hover:text-rose-500" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Live Preview Mode */
              <div className="p-6 rounded-card bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500 text-white">
                      {platform} Preview
                    </span>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {title || 'Untitled Draft'}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400">Status: {status}</span>
                </div>

                {/* Render platform simulation card */}
                {platform === 'x' ? (
                  <div className="space-y-3">
                    {threadItems.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-card bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-2 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs">
                            X
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">Drafty Creator</p>
                            <p className="text-[10px] text-slate-400">@drafty_user • Tweet {idx + 1}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 rounded-card bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-3 shadow-sm">
                    {emailSubject && (
                      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-xs font-bold text-amber-800 dark:text-amber-300">
                        Subject: {emailSubject}
                      </div>
                    )}
                    <div className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {body}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer with Real-time Word and Character Count Indicator */}
          <div className="px-6 py-3 border-t border-slate-200/60 dark:border-emerald-500/20 bg-slate-50/90 dark:bg-emerald-950/40 flex flex-wrap items-center justify-between gap-3 text-xs font-medium">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Character Count */}
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-emerald-200 bg-white dark:bg-emerald-900/40 px-3 py-1.5 rounded-input border border-slate-200/80 dark:border-emerald-500/30 shadow-xs">
                <Type className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-slate-500 dark:text-emerald-400/70 text-[11px] font-semibold">Chars:</span>
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{charCount.toLocaleString()}</span>
              </div>

              {/* Word Count */}
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-emerald-200 bg-white dark:bg-emerald-900/40 px-3 py-1.5 rounded-input border border-slate-200/80 dark:border-emerald-500/30 shadow-xs">
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-slate-500 dark:text-emerald-400/70 text-[11px] font-semibold">Words:</span>
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{wordCount.toLocaleString()}</span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-emerald-300/80 text-[11px] pl-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-emerald-400" />
                <span>{wordCount === 0 ? '0 min read' : `~${readingTime} min read`}</span>
              </div>

              {/* Platform specific badges */}
              {platform === 'x' && (
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isXOverLimit
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                  }`}
                >
                  <span>{threadItems.length} {threadItems.length === 1 ? 'Tweet' : 'Thread Tweets'}</span>
                  {isXOverLimit && <span>• Exceeds 280 chars!</span>}
                </div>
              )}

              {platform === 'instagram' && (
                <div className="text-[11px] text-pink-600 dark:text-pink-400 font-semibold bg-pink-50 dark:bg-pink-950/40 px-2.5 py-1 rounded-full border border-pink-200 dark:border-pink-800">
                  {carouselSlides.length} Carousel {carouselSlides.length === 1 ? 'Slide' : 'Slides'}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 dark:text-emerald-400/60 hidden sm:inline">
                Auto-synced to local storage
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
