import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, X, Plus, ExternalLink, Pin, Trash2, Star, Search, Folder } from 'lucide-react';
import { CommunityLink, PlatformType } from '../../types';

interface CommunityLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  communities: CommunityLink[];
  defaultPlatform: PlatformType;
  onSaveCommunity: (link: Partial<CommunityLink> & { name: string; url: string; platform: PlatformType }) => void;
  onDeleteCommunity: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const CommunityLibraryModal: React.FC<CommunityLibraryModalProps> = ({
  isOpen,
  onClose,
  communities,
  defaultPlatform,
  onSaveCommunity,
  onDeleteCommunity,
  onTogglePin,
}) => {
  const [platformFilter, setPlatformFilter] = useState<PlatformType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // New item form
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<PlatformType>(defaultPlatform === 'dashboard' ? 'reddit' : defaultPlatform);
  const [category, setCategory] = useState('Indie Hackers');
  const [notes, setNotes] = useState('');
  const [subscriberCount, setSubscriberCount] = useState('50k members');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!name.trim() || !url.trim()) return;
    onSaveCommunity({
      name: name.trim(),
      url: url.trim(),
      platform,
      category,
      notes,
      subscriberCount,
      pinned: true,
      favourite: true,
    });

    setName('');
    setUrl('');
    setNotes('');
    setIsAdding(false);
  };

  const filtered = communities.filter((c) => {
    const matchesPlatform = platformFilter === 'all' || c.platform === platformFilter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
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
          <div className="p-6 border-b border-slate-200/60 dark:border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Community Library Storage
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Store Subreddits, Facebook Groups, X Communities & Email Lists
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="h-9 px-3.5 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Community</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-btn bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Add Form drawer if open */}
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-4"
            >
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                New Community Bookmark
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Community Name (e.g. r/SideProject)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
                <input
                  type="text"
                  placeholder="URL (https://...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PlatformType)}
                  className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs uppercase font-bold text-emerald-600"
                >
                  <option value="reddit">Reddit</option>
                  <option value="facebook">Facebook</option>
                  <option value="x">X (Twitter)</option>
                  <option value="instagram">Instagram</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Category (e.g. Growth, Design)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
                <input
                  type="text"
                  placeholder="Audience size (e.g. 250k members)"
                  value={subscriberCount}
                  onChange={(e) => setSubscriberCount(e.target.value)}
                  className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
                <input
                  type="text"
                  placeholder="Posting rules & notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-9 px-3 rounded-input bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="h-8 px-3 rounded-btn bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="h-8 px-4 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
                >
                  Save Bookmark
                </button>
              </div>
            </motion.div>
          )}

          {/* Filter Bar */}
          <div className="p-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/40 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-[60%]">
              <button
                onClick={() => setPlatformFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  platformFilter === 'all'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                All Platforms
              </button>
              {(['reddit', 'facebook', 'x', 'instagram', 'email'] as PlatformType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    platformFilter === p
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
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
                placeholder="Filter by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 px-2.5 rounded-input bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs"
              />
            </div>
          </div>

          {/* List */}
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-card bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 hover:border-emerald-500/40 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            {item.platform}
                          </span>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onTogglePin(item.id)}
                            className={`p-1 rounded-md text-xs ${item.pinned ? 'text-amber-500' : 'text-slate-400'}`}
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteCommunity(item.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.subscriberCount}</span>
                        <span>•</span>
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">{item.category}</span>
                      </div>

                      {item.notes && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 italic bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 px-3 rounded-btn bg-slate-100 dark:bg-slate-700 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all mt-2"
                    >
                      <span>Visit Community</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Bookmark className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-xs font-semibold">No communities found in this category.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
