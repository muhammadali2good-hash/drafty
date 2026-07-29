import {
  Draft,
  GeneratedImage,
  GeneratedCopy,
  CommunityLink,
  ContentTemplate,
  UserPreferences,
  PlatformType,
} from '../types';

const DRAFTS_KEY = 'drafty_drafts_v1';
const IMAGES_KEY = 'drafty_images_v1';
const COPIES_KEY = 'drafty_copies_v1';
const COMMUNITIES_KEY = 'drafty_communities_v1';
const TEMPLATES_KEY = 'drafty_templates_v1';
const PREFS_KEY = 'drafty_prefs_v1';

// Real initial state without mock data
const INITIAL_DRAFTS: Draft[] = [];
const INITIAL_IMAGES: GeneratedImage[] = [];
const INITIAL_COMMUNITIES: CommunityLink[] = [];

const INITIAL_TEMPLATES: ContentTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Value Thread Framework',
    description: 'Hook + 5 Key Takeaways + Actionable Tip + Retweet CTA',
    category: 'Twitter Thread',
    platform: 'x',
    tags: ['Growth', 'Thread', 'High CTR'],
    body: `1/ [TRANSFORMATIVE HOOK: How I achieved X in Y timeframe without Z] 👇\n\n2/ [LESSON 1: Counter-intuitive insight]\n\n3/ [LESSON 2: Concrete step-by-step method]\n\n4/ [LESSON 3: Tool or resource used]\n\n5/ [LESSON 4: Common trap to avoid]\n\n6/ Summary: [1-sentence takeaway]\n\nIf you enjoyed this, retweet the first tweet and follow @handle for more!`,
  },
  {
    id: 'tpl-2',
    title: 'Reddit Product Showcase (Non-Spammy)',
    description: 'Authentic builder journey story for tech subreddits',
    category: 'Showcase',
    platform: 'reddit',
    tags: ['Feedback', 'Authentic', 'Storytelling'],
    body: `Title: We spent 3 months building [Product Name] to solve [Problem]. Here is everything we learned along the way.\n\nHey r/[Subreddit]!\n\nLike many of you, we got tired of [Pain point]. We decided to build a simple, local-first tool focusing on [Key Value Prop].\n\nKey features:\n- Feature 1\n- Feature 2\n\nWe would love your honest feedback! What features should we add next?`,
  },
  {
    id: 'tpl-3',
    title: 'Instagram 5-Slide Educational Carousel',
    description: 'Clean slide-by-slide outline for aesthetic design & tips',
    category: 'Educational',
    platform: 'instagram',
    tags: ['Carousel', 'Design', 'Engagement'],
    body: `Slide 1: [Bold Statement / Problem Statement]\nSlide 2: [Mistake 90% of people make]\nSlide 3: [The Simple Solution + Visual Example]\nSlide 4: [3 Action Steps you can take today]\nSlide 5: [Save for later + Drop a comment below!]`,
  },
  {
    id: 'tpl-4',
    title: 'Product Announcement Email',
    description: 'High converting announcement newsletter with clear CTA button',
    category: 'Email Blast',
    platform: 'email',
    tags: ['Launch', 'Conversion', 'Newsletter'],
    subjectLine: 'It is finally here: Meet [Product Name] 🌿',
    body: `Hi {{name}},\n\nWe have been working on something special for the past few weeks, and today it is officially live.\n\nIntroducing [Product Name] — built to help you [Primary Benefit] faster and without clutter.\n\nHere is what is new:\n✨ [Highlight 1]\n⚡ [Highlight 2]\n🛡️ [Highlight 3]\n\n[CLICK HERE TO TRY IT OUT]\n\nLet us know what you think by replying directly to this email!`,
  },
];

const INITIAL_PREFS: UserPreferences = {
  theme: 'light',
  defaultTone: 'High Conversion',
  autoSaveInterval: 5,
  defaultPlatform: 'dashboard',
  puterEnabled: true,
};

// Helper for local storage with events
function getItem<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultVal;
  }
}

function setItem<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('drafty_storage_update'));
  } catch (err) {
    console.error('Storage write error:', err);
  }
}

export const StorageService = {
  // Drafts
  getDrafts(platform?: PlatformType): Draft[] {
    const all = getItem<Draft[]>(DRAFTS_KEY, INITIAL_DRAFTS);
    if (!platform || platform === 'dashboard') return all;
    return all.filter((d) => d.platform === platform);
  },

  getDraftById(id: string): Draft | undefined {
    const all = this.getDrafts();
    return all.find((d) => d.id === id);
  },

  saveDraft(draftData: Partial<Draft> & { id?: string; platform: PlatformType }): Draft {
    const all = this.getDrafts();
    const now = new Date().toISOString();
    
    if (draftData.id) {
      const idx = all.findIndex((d) => d.id === draftData.id);
      if (idx !== -1) {
        const updated: Draft = {
          ...all[idx],
          ...draftData,
          updatedAt: now,
        };
        all[idx] = updated;
        setItem(DRAFTS_KEY, all);
        return updated;
      }
    }

    const newDraft: Draft = {
      id: `draft-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: draftData.title || 'Untitled Draft',
      body: draftData.body || '',
      platform: draftData.platform,
      tags: draftData.tags || [],
      pinned: draftData.pinned ?? false,
      createdAt: now,
      updatedAt: now,
      status: draftData.status || 'draft',
      folder: draftData.folder || 'General',
      media: draftData.media || [],
      threadItems: draftData.threadItems,
      characterCount: (draftData.body || '').length,
      pollOptions: draftData.pollOptions,
      emailSubject: draftData.emailSubject,
      emailPreviewText: draftData.emailPreviewText,
      instagramCarouselSlides: draftData.instagramCarouselSlides,
      redditSubreddit: draftData.redditSubreddit,
      redditPostType: draftData.redditPostType,
      facebookType: draftData.facebookType,
    };

    all.unshift(newDraft);
    setItem(DRAFTS_KEY, all);
    return newDraft;
  },

  deleteDraft(id: string): void {
    const all = this.getDrafts().filter((d) => d.id !== id);
    setItem(DRAFTS_KEY, all);
  },

  togglePinDraft(id: string): void {
    const all = this.getDrafts();
    const idx = all.findIndex((d) => d.id === id);
    if (idx !== -1) {
      all[idx].pinned = !all[idx].pinned;
      all[idx].updatedAt = new Date().toISOString();
      setItem(DRAFTS_KEY, all);
    }
  },

  toggleArchiveDraft(id: string): void {
    const all = this.getDrafts();
    const idx = all.findIndex((d) => d.id === id);
    if (idx !== -1) {
      all[idx].status = all[idx].status === 'archived' ? 'draft' : 'archived';
      all[idx].updatedAt = new Date().toISOString();
      setItem(DRAFTS_KEY, all);
    }
  },

  // Generated Images
  getImages(platform?: PlatformType): GeneratedImage[] {
    const all = getItem<GeneratedImage[]>(IMAGES_KEY, INITIAL_IMAGES);
    if (!platform || platform === 'dashboard') return all;
    return all.filter((img) => img.platform === platform);
  },

  saveImage(imgData: Partial<GeneratedImage> & { prompt: string; url: string; platform: PlatformType }): GeneratedImage {
    const all = this.getImages();
    const newImg: GeneratedImage = {
      id: imgData.id || `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      prompt: imgData.prompt,
      expandedPrompt: imgData.expandedPrompt,
      url: imgData.url,
      date: imgData.date || new Date().toISOString(),
      platform: imgData.platform,
      favourite: imgData.favourite ?? false,
      style: imgData.style || 'Modern Illustration',
      aspectRatio: imgData.aspectRatio || '16:9',
      brandCategory: imgData.brandCategory || 'Technology',
      primaryColor: imgData.primaryColor || '#10b981',
      secondaryColor: imgData.secondaryColor || '#064e3b',
      accentColor: imgData.accentColor || '#14b8a6',
      bgColor: imgData.bgColor || '#040806',
      lighting: imgData.lighting || 'Studio',
      camera: imgData.camera || 'Wide',
      depth: imgData.depth || 'Deep',
      composition: imgData.composition || 'Centered',
      negativePrompt: imgData.negativePrompt || '',
      generationTime: imgData.generationTime || '3.5s',
      fileSize: imgData.fileSize || '1.2 MB',
      mood: imgData.mood || 'Clean & Aesthetic',
      brandColors: imgData.brandColors,
    };
    all.unshift(newImg);
    setItem(IMAGES_KEY, all);
    return newImg;
  },

  deleteImage(id: string): void {
    const all = this.getImages().filter((img) => img.id !== id);
    setItem(IMAGES_KEY, all);
  },

  toggleFavouriteImage(id: string): void {
    const all = this.getImages();
    const idx = all.findIndex((img) => img.id === id);
    if (idx !== -1) {
      all[idx].favourite = !all[idx].favourite;
      setItem(IMAGES_KEY, all);
    }
  },

  // Communities
  getCommunities(platform?: PlatformType): CommunityLink[] {
    const all = getItem<CommunityLink[]>(COMMUNITIES_KEY, INITIAL_COMMUNITIES);
    if (!platform || platform === 'dashboard') return all;
    return all.filter((c) => c.platform === platform);
  },

  saveCommunity(link: Partial<CommunityLink> & { name: string; url: string; platform: PlatformType }): CommunityLink {
    const all = this.getCommunities();
    const newLink: CommunityLink = {
      id: `comm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: link.name,
      url: link.url,
      platform: link.platform,
      category: link.category || 'General',
      notes: link.notes || '',
      subscriberCount: link.subscriberCount || 'Community',
      pinned: link.pinned ?? false,
      favourite: link.favourite ?? false,
      createdAt: new Date().toISOString(),
    };
    all.unshift(newLink);
    setItem(COMMUNITIES_KEY, all);
    return newLink;
  },

  deleteCommunity(id: string): void {
    const all = this.getCommunities().filter((c) => c.id !== id);
    setItem(COMMUNITIES_KEY, all);
  },

  togglePinCommunity(id: string): void {
    const all = this.getCommunities();
    const idx = all.findIndex((c) => c.id === id);
    if (idx !== -1) {
      all[idx].pinned = !all[idx].pinned;
      setItem(COMMUNITIES_KEY, all);
    }
  },

  // Templates
  getTemplates(platform?: PlatformType): ContentTemplate[] {
    const all = getItem<ContentTemplate[]>(TEMPLATES_KEY, INITIAL_TEMPLATES);
    if (!platform || platform === 'dashboard') return all;
    return all.filter((t) => t.platform === platform);
  },

  saveTemplate(tpl: Partial<ContentTemplate> & { title: string; body: string; platform: PlatformType }): ContentTemplate {
    const all = this.getTemplates();
    const newTpl: ContentTemplate = {
      id: `tpl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: tpl.title,
      description: tpl.description || 'Custom user template',
      category: tpl.category || 'Custom',
      platform: tpl.platform,
      body: tpl.body,
      tags: tpl.tags || ['Custom'],
      subjectLine: tpl.subjectLine,
    };
    all.unshift(newTpl);
    setItem(TEMPLATES_KEY, all);
    return newTpl;
  },

  // Preferences
  getPreferences(): UserPreferences {
    return getItem<UserPreferences>(PREFS_KEY, INITIAL_PREFS);
  },

  savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    setItem(PREFS_KEY, updated);
    return updated;
  },

  // Global Backup & Export/Import
  exportWorkspaceJSON(): string {
    const backup = {
      drafts: this.getDrafts(),
      images: this.getImages(),
      communities: this.getCommunities(),
      templates: this.getTemplates(),
      preferences: this.getPreferences(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importWorkspaceJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.drafts) setItem(DRAFTS_KEY, parsed.drafts);
      if (parsed.images) setItem(IMAGES_KEY, parsed.images);
      if (parsed.communities) setItem(COMMUNITIES_KEY, parsed.communities);
      if (parsed.templates) setItem(TEMPLATES_KEY, parsed.templates);
      if (parsed.preferences) setItem(PREFS_KEY, parsed.preferences);
      return true;
    } catch {
      return false;
    }
  },

  clearAllData(): void {
    localStorage.removeItem(DRAFTS_KEY);
    localStorage.removeItem(IMAGES_KEY);
    localStorage.removeItem(COMMUNITIES_KEY);
    localStorage.removeItem(TEMPLATES_KEY);
    localStorage.removeItem(PREFS_KEY);
    window.dispatchEvent(new Event('drafty_storage_update'));
  },

  getStorageSizeInKB(): number {
    let total = 0;
    for (const key of [DRAFTS_KEY, IMAGES_KEY, COMMUNITIES_KEY, TEMPLATES_KEY, PREFS_KEY]) {
      const raw = localStorage.getItem(key);
      if (raw) total += raw.length * 2; // UTF-16 approximate
    }
    return Math.round(total / 1024);
  },
};
