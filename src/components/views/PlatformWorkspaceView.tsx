import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Sparkles,
  Image as ImageIcon,
  Bookmark,
  Pin,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ExternalLink,
  Folder,
} from 'lucide-react';
import { Draft, GeneratedImage, CommunityLink, PlatformType, DraftStatus } from '../../types';

interface PlatformWorkspaceViewProps {
  platform: PlatformType;
  drafts: Draft[];
  images: GeneratedImage[];
  communities: CommunityLink[];
  onSelectDraft: (draft: Draft) => void;
  onNewDraft: () => void;
  onOpenAICopy: () => void;
  onOpenAIImage: () => void;
  onTogglePin: (id: string) => void;
  onDeleteDraft: (id: string) => void;
}

const PLATFORM_DETAILS: Record<PlatformType, { title: string; desc: string; quickLabel: string; bgBadge: string }> = {
  dashboard: { title: 'Dashboard', desc: '', quickLabel: 'New Draft', bgBadge: 'bg-emerald-500' },
  x: { title: 'X (Twitter)', desc: 'Draft 280-char tweets, build multi-post threads & community notes.', quickLabel: 'Build Thread / Tweet', bgBadge: 'bg-sky-500' },
  reddit: { title: 'Reddit', desc: 'Craft authentic discussion posts, AMA drafts & store subreddit rules.', quickLabel: 'Draft Reddit Post', bgBadge: 'bg-orange-500' },
  facebook: { title: 'Facebook', desc: 'Long-form storytelling posts, announcements & business update drafts.', quickLabel: 'Draft FB Post', bgBadge: 'bg-blue-600' },
  instagram: { title: 'Instagram', desc: 'Carousel slide breakdowns, reel hooks & hashtag sets.', quickLabel: 'Draft IG Carousel', bgBadge: 'bg-pink-500' },
  email: { title: 'Email', desc: 'Newsletter editions, preheaders & high-CTR subject lines.', quickLabel: 'Draft Newsletter', bgBadge: 'bg-amber-500' },
  general: { title: 'General Drafts', desc: 'Rich markdown scratchpad, ideas, research & copy snippets.', quickLabel: 'New General Draft', bgBadge: 'bg-emerald-600' },
  templates: { title: 'Templates', desc: '', quickLabel: 'New Template', bgBadge: 'bg-purple-500' },
  settings: { title: 'Settings', desc: '', quickLabel: 'Settings', bgBadge: 'bg-slate-500' },
};

export const PlatformWorkspaceView: React.FC<PlatformWorkspaceViewProps> = ({
  platform,
  drafts,
  images,
  communities,
  onSelectDraft,
  onNewDraft,
  onOpenAICopy,
  onOpenAIImage,
  onTogglePin,
  onDeleteDraft,
}) => {
  const details = PLATFORM_DETAILS[platform] || PLATFORM_DETAILS.general;
  const [filterStatus, setFilterStatus] = useState<DraftStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredDrafts = drafts.filter((d) => {
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.body.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Platform Header Banner */}
      <div className="p-6 rounded-container glass-panel flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-white ${details.bgBadge}`}>
              {platform} workspace
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Isolated Storage & History
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            {details.title} Draft Studio
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {details.desc}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewDraft}
            id={`platform-${platform}-new-draft-btn`}
            className="h-11 px-4 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{details.quickLabel}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAICopy}
            id={`platform-${platform}-ai-copy-btn`}
            className="h-11 px-3.5 rounded-btn bg-white dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-slate-200/80 dark:border-emerald-500/30 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI Copy</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAIImage}
            id={`platform-${platform}-ai-image-btn`}
            className="h-11 px-3.5 rounded-btn bg-white dark:bg-emerald-950/40 hover:bg-teal-50 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-slate-200/80 dark:border-emerald-500/30 shadow-sm cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-teal-500" />
            <span>AI Image</span>
          </motion.button>
        </div>
      </div>

      {/* Main Grid: Left Drafts (70%) & Right Community / Image sidebar (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Drafts */}
        <div className="lg:col-span-2 space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-card glass-panel border border-slate-200/60 dark:border-emerald-500/20">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['all', 'draft', 'ready', 'review', 'archived'] as (DraftStatus | 'all')[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    filterStatus === st
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200/70 dark:hover:bg-emerald-900/40 border border-transparent dark:border-emerald-800/30'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 dark:text-emerald-400" />
              <input
                type="text"
                placeholder={`Search ${platform.toUpperCase()} drafts...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 px-2.5 rounded-input bg-white dark:bg-emerald-950/50 border border-slate-200/80 dark:border-emerald-500/30 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Drafts Cards List */}
          {filteredDrafts.length > 0 ? (
            <div className="space-y-4">
              {filteredDrafts.map((draft) => (
                <motion.div
                  key={draft.id}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-card glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {draft.status}
                        </span>
                        {draft.folder && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Folder className="w-3 h-3 text-emerald-500" />
                            {draft.folder}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onTogglePin(draft.id)}
                          className={`p-1.5 rounded-md text-xs transition-colors ${
                            draft.pinned ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Pin className={`w-3.5 h-3.5 ${draft.pinned ? 'fill-amber-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => onDeleteDraft(draft.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4
                      onClick={() => onSelectDraft(draft)}
                      className="font-bold text-base text-slate-900 dark:text-white cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      {draft.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                      {draft.body}
                    </p>

                    {/* Email Subject / Reddit Tag Extras */}
                    {draft.emailSubject && (
                      <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-[11px] font-bold text-amber-800 dark:text-amber-300">
                        Subject: {draft.emailSubject}
                      </div>
                    )}
                    {draft.redditSubreddit && (
                      <div className="inline-block px-2 py-0.5 bg-orange-50 dark:bg-orange-950/40 rounded text-[10px] font-bold text-orange-700 dark:text-orange-300">
                        {draft.redditSubreddit}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-500">
                    <span className="text-slate-400">
                      Updated {new Date(draft.updatedAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => onSelectDraft(draft)}
                      className="h-8 px-3 rounded-btn bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Draft</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-card glass-panel border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Layers className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                No {platform.toUpperCase()} drafts found.
              </p>
              <button
                onClick={onNewDraft}
                className="h-9 px-4 rounded-btn bg-emerald-600 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Draft</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Platform AI Image History & Communities */}
        <div className="space-y-6">
          {/* AI Images History for Platform */}
          <div className="p-5 rounded-card glass-panel space-y-4 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-teal-500" />
                {platform.toUpperCase()} AI Images ({images.length})
              </h4>
              <button
                onClick={onOpenAIImage}
                className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                + Generate
              </button>
            </div>

            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 4).map((img) => (
                  <div key={img.id} className="relative rounded-card overflow-hidden border border-slate-200 dark:border-slate-800 aspect-square group">
                    <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-[9px] text-white">
                      <p className="line-clamp-2">{img.prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No AI images generated for {platform} yet.</p>
            )}
          </div>

          {/* Communities Storage for Platform */}
          <div className="p-5 rounded-card glass-panel space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-blue-500" />
              {platform.toUpperCase()} Community Storage ({communities.length})
            </h4>

            {communities.length > 0 ? (
              <div className="space-y-2">
                {communities.map((comm) => (
                  <a
                    key={comm.id}
                    href={comm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-card bg-white dark:bg-emerald-950/40 hover:border-emerald-500 border border-slate-200/60 dark:border-emerald-500/30 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-emerald-200 transition-all"
                  >
                    <div>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">{comm.name}</p>
                      <span className="text-[10px] text-slate-400 dark:text-emerald-300/60">{comm.subscriberCount}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-emerald-400" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No community bookmarks stored for {platform}.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
