import React from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Pin,
  Image as ImageIcon,
  Sparkles,
  TrendingUp,
  HardDrive,
  Bookmark,
  Plus,
  ArrowRight,
  Clock,
  Zap,
  Tag,
  Share2,
  Folder,
  Layers,
} from 'lucide-react';
import { Draft, GeneratedImage, CommunityLink, PlatformType } from '../../types';

interface DashboardHomeViewProps {
  drafts: Draft[];
  images: GeneratedImage[];
  communities: CommunityLink[];
  onSelectDraft: (draft: Draft) => void;
  onSelectPlatform: (platform: PlatformType) => void;
  onQuickCreate: () => void;
  onOpenAICopy: () => void;
  onOpenAIImage: () => void;
  storageKB: number;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({
  drafts,
  images,
  communities,
  onSelectDraft,
  onSelectPlatform,
  onQuickCreate,
  onOpenAICopy,
  onOpenAIImage,
  storageKB,
}) => {
  const pinnedDrafts = drafts.filter((d) => d.pinned);
  const recentDrafts = drafts.slice(0, 4);
  const favouriteImages = images.filter((img) => img.favourite).slice(0, 4);
  const favouriteCommunities = communities.filter((c) => c.favourite).slice(0, 4);

  // Platform statistics
  const platformStats: Record<string, number> = {
    x: drafts.filter((d) => d.platform === 'x').length,
    reddit: drafts.filter((d) => d.platform === 'reddit').length,
    instagram: drafts.filter((d) => d.platform === 'instagram').length,
    facebook: drafts.filter((d) => d.platform === 'facebook').length,
    email: drafts.filter((d) => d.platform === 'email').length,
    general: drafts.filter((d) => d.platform === 'general').length,
  };

  const totalWords = drafts.reduce((acc, d) => acc + (d.body ? d.body.split(/\s+/).length : 0), 0);

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-container glass-panel p-8 overflow-hidden border border-emerald-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Puter AI Active • Zero Backend • Offline First</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Welcome back to Bloome.
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Your distraction-free AI content workspace. Store ideas, draft platform-specific posts, generate copy variants, and store community resources.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onQuickCreate}
              id="dashboard-hero-new-draft-btn"
              className="h-12 px-5 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Draft</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenAICopy}
              id="dashboard-hero-ai-copy-btn"
              className="h-12 px-5 rounded-btn bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-200 text-sm font-semibold flex items-center gap-2 border border-slate-200/80 dark:border-slate-700 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Generate Copy</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="p-5 rounded-card glass-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Drafts</span>
            <FileText className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            {drafts.length}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            ~{totalWords.toLocaleString()} total words written
          </p>
        </div>

        <div className="p-5 rounded-card glass-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Generated Images</span>
            <ImageIcon className="w-4 h-4 text-teal-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            {images.length}
          </p>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
            {favouriteImages.length} favourited assets
          </p>
        </div>

        <div className="p-5 rounded-card glass-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Communities</span>
            <Bookmark className="w-4 h-4 text-blue-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            {communities.length}
          </p>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            Subreddits, X & FB Groups
          </p>
        </div>

        <div className="p-5 rounded-card glass-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Chrome Storage</span>
            <HardDrive className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            {storageKB} KB
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            Local browser database
          </p>
        </div>
      </div>

      {/* Pinned Drafts Row */}
      {pinnedDrafts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
              Pinned Drafts ({pinnedDrafts.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pinnedDrafts.map((draft) => (
              <motion.div
                key={draft.id}
                whileHover={{ y: -3 }}
                onClick={() => onSelectDraft(draft)}
                className="p-5 rounded-card glass-card cursor-pointer space-y-3 flex flex-col justify-between border-l-4 border-l-amber-500"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {draft.platform}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(draft.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {draft.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {draft.body}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Folder className="w-3 h-3" />
                    {draft.folder || 'General'}
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    Edit <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Platform Workspaces Quick Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-500" />
          Dedicated Platform Workspaces
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'x', name: 'X (Twitter)', count: platformStats.x, bg: 'hover:border-sky-400/60' },
            { id: 'reddit', name: 'Reddit', count: platformStats.reddit, bg: 'hover:border-orange-400/60' },
            { id: 'facebook', name: 'Facebook', count: platformStats.facebook, bg: 'hover:border-blue-400/60' },
            { id: 'instagram', name: 'Instagram', count: platformStats.instagram, bg: 'hover:border-pink-400/60' },
            { id: 'email', name: 'Email', count: platformStats.email, bg: 'hover:border-amber-400/60' },
            { id: 'general', name: 'General', count: platformStats.general, bg: 'hover:border-emerald-400/60' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectPlatform(item.id as PlatformType)}
              className={`p-4 rounded-card glass-card text-left space-y-2 border ${item.bg} cursor-pointer transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200">
                  {item.id}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {item.count}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {item.name} Drafts
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent AI Generated Assets */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-teal-500" />
              Recently Generated AI Assets
            </h3>
            <button
              onClick={onOpenAIImage}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Generate New <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.slice(0, 4).map((img) => (
              <div
                key={img.id}
                onClick={() => onSelectPlatform(img.platform)}
                className="relative rounded-card overflow-hidden group cursor-pointer border border-slate-200/80 dark:border-slate-800 aspect-video glass-card"
              >
                <img src={img.url} alt={img.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-xs font-semibold text-white truncate">{img.prompt}</p>
                  <p className="text-[10px] text-teal-300 font-mono">{img.aspectRatio} • {img.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favourite Communities Box */}
      {favouriteCommunities.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-500" />
            Favourite Community Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favouriteCommunities.map((comm) => (
              <a
                key={comm.id}
                href={comm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-card glass-card flex items-center justify-between hover:border-emerald-500/40 transition-all"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{comm.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{comm.subscriberCount}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{comm.notes}</p>
                </div>
                <Share2 className="w-4 h-4 text-slate-400 hover:text-emerald-500" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
