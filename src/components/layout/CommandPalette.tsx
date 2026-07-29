import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Image as ImageIcon, Bookmark, FileCode, X, ArrowRight } from 'lucide-react';
import { Draft, GeneratedImage, CommunityLink, ContentTemplate, PlatformType } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  drafts: Draft[];
  images: GeneratedImage[];
  communities: CommunityLink[];
  templates: ContentTemplate[];
  onSelectDraft: (draft: Draft) => void;
  onSelectPlatform: (platform: PlatformType) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  drafts,
  images,
  communities,
  templates,
  onSelectDraft,
  onSelectPlatform,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredDrafts = q
    ? drafts.filter((d) => d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q) || d.tags.some((t) => t.toLowerCase().includes(q)))
    : drafts.slice(0, 4);

  const filteredImages = q
    ? images.filter((img) => img.prompt.toLowerCase().includes(q) || img.style.toLowerCase().includes(q))
    : images.slice(0, 3);

  const filteredCommunities = q
    ? communities.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
    : communities.slice(0, 3);

  const filteredTemplates = q
    ? templates.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    : templates.slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-modal border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden glass-panel"
        >
          {/* Input Bar */}
          <div className="p-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-500 ml-2" />
            <input
              type="text"
              autoFocus
              placeholder="Search drafts, AI images, communities, templates..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold"
            >
              ESC
            </button>
          </div>

          {/* Search Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
            {/* Drafts Section */}
            {filteredDrafts.length > 0 && (
              <div>
                <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  Drafts ({filteredDrafts.length})
                </p>
                <div className="space-y-1">
                  {filteredDrafts.map((draft) => (
                    <button
                      key={draft.id}
                      onClick={() => {
                        onSelectDraft(draft);
                        onClose();
                      }}
                      className="w-full p-3 rounded-card hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 text-left flex items-center justify-between group transition-all"
                    >
                      <div className="space-y-0.5 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                            {draft.platform}
                          </span>
                          <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">
                            {draft.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {draft.body}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Generated Images */}
            {filteredImages.length > 0 && (
              <div>
                <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-teal-500" />
                  Generated AI Images
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {filteredImages.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        onSelectPlatform(img.platform);
                        onClose();
                      }}
                      className="relative rounded-card overflow-hidden group cursor-pointer border border-slate-200/60 dark:border-slate-800 aspect-video"
                    >
                      <img src={img.url} alt={img.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                        <p className="text-[10px] font-medium text-white line-clamp-1">{img.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Communities */}
            {filteredCommunities.length > 0 && (
              <div>
                <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-500" />
                  Community Libraries
                </p>
                <div className="space-y-1">
                  {filteredCommunities.map((comm) => (
                    <a
                      key={comm.id}
                      href={comm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-card hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{comm.name}</span>
                        <span className="text-[10px] text-slate-400">({comm.subscriberCount})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-200/60 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        {comm.category}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Templates */}
            {filteredTemplates.length > 0 && (
              <div>
                <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-purple-500" />
                  Templates
                </p>
                <div className="space-y-1">
                  {filteredTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => {
                        onSelectPlatform('templates');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-card hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{tpl.title}</span>
                        <p className="text-[11px] text-slate-500">{tpl.description}</p>
                      </div>
                      <span className="text-[10px] font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                        {tpl.platform}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
