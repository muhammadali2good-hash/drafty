import {
  Draft,
  GeneratedImage,
  GeneratedCopy,
  CommunityLink,
  ContentTemplate,
  UserPreferences,
  PlatformType,
} from '../types';

const DRAFTS_KEY = 'bloome_drafts_v1';
const IMAGES_KEY = 'bloome_images_v1';
const COPIES_KEY = 'bloome_copies_v1';
const COMMUNITIES_KEY = 'bloome_communities_v1';
const TEMPLATES_KEY = 'bloome_templates_v1';
const PREFS_KEY = 'bloome_prefs_v1';

// Pre-seeded initial data for creator workspace
const INITIAL_DRAFTS: Draft[] = [
  {
    id: 'draft-x-1',
    title: '🚀 10 Lessons from Scaling an AI Product to 50k Users',
    body: `1/ Building AI products isn't about raw prompt length—it's about reducing latency and micro-friction. Here are 10 non-obvious lessons from scaling to 50k MAU in 3 months 👇\n\n2/ UX beat raw accuracy 9 times out of 10. Users prefer a fast 90% accurate model over a 15-second wait for 98% accuracy.\n\n3/ Local-first data caching is your competitive moat. Keep user drafts and generated outputs cached right in browser memory for instant feel.`,
    platform: 'x',
    tags: ['BuildingInPublic', 'SaaS', 'AI'],
    pinned: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    status: 'ready',
    folder: 'Tech Thoughts',
    media: [
      {
        id: 'm1',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        type: 'image',
        name: 'architecture_diagram.jpg',
        size: '1.2 MB',
      },
    ],
    threadItems: [
      "1/ Building AI products isn't about raw prompt length—it's about reducing latency and micro-friction. Here are 10 non-obvious lessons from scaling to 50k MAU in 3 months 👇",
      '2/ UX beat raw accuracy 9 times out of 10. Users prefer a fast 90% accurate model over a 15-second wait for 98% accuracy.',
      '3/ Local-first data caching is your competitive moat. Keep user drafts and generated outputs cached right in browser memory for instant feel.',
      '4/ If you found this useful, retweet the first tweet and follow for more weekly deep dives!',
    ],
    characterCount: 612,
  },
  {
    id: 'draft-x-2',
    title: 'Poll: What is your primary bottleneck in content production?',
    body: 'Creator poll on weekly content bottlenecks.',
    platform: 'x',
    tags: ['CreatorEconomy', 'Poll'],
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'draft',
    pollOptions: ['Generating Image Assets', 'Writing Engaging Hooks', 'Platform Formatting', 'Consistency & Distribution'],
    characterCount: 140,
    media: [],
  },
  {
    id: 'draft-reddit-1',
    title: 'How we redesigned our creative workspace for deep focus and zero clutter (Detailed Walkthrough)',
    body: `Hey r/SideProject and r/webdev!

Over the past 6 months, our team was frustrated by traditional dashboard bloat—heavy sidebars, dense data tables, and cluttered widgets that killed creative momentum.

We took inspiration from Apple's minimalist desktop design language:
- **Generous Spacing:** 24-32px section gaps so every module breathes.
- **Liquid Glass Containers:** Soft 22-28px rounded corners with backdrop blur instead of harsh lines.
- **Isolated Platform Context:** Each social network (X, Reddit, Instagram, FB, Email) gets its own dedicated, clean workspace.

Here is what we learned about local browser databases and zero-backend AI generation...`,
    platform: 'reddit',
    tags: ['UIUX', 'WebDev', 'Showcase'],
    pinned: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'ready',
    redditSubreddit: 'r/SideProject',
    redditPostType: 'discussion',
    media: [
      {
        id: 'm2',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        type: 'image',
        name: 'dashboard_preview.png',
        size: '2.4 MB',
      },
    ],
  },
  {
    id: 'draft-ig-1',
    title: '✨ 5 Aesthetic Design Rules for 2026 Content Creators',
    body: `Stop overcrowding your visuals! 🎨 Here are the 5 minimalist design rules every creator needs to know:

Slide 1: High Contrast Neutrals + Vibrant Accent
Slide 2: 24px+ Generous Corner Radii
Slide 3: One Clear Focal Point Per Graphic
Slide 4: Optical Padding & Negative Space
Slide 5: Micro-Animations over Flashy Effects

Save this reel for your next visual draft! 📌 #DesignTips #ContentCreator #AestheticUI #VisualBranding`,
    platform: 'instagram',
    tags: ['VisualDesign', 'Carousel', 'Aesthetic'],
    pinned: true,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'ready',
    folder: 'Visual Guides',
    instagramCarouselSlides: [
      'Slide 1: High Contrast Neutrals + Vibrant Emerald Accent',
      'Slide 2: 24px+ Generous Corner Radii for Apple-level Software Feel',
      'Slide 3: One Clear Focal Point Per Graphic with 1:1 Aspect Ratio',
      'Slide 4: Optical Padding & Generous Whitespace (No Cramped Cards)',
      'Slide 5: Micro-Animations & Soft Scaling for 120fps Feel',
    ],
    media: [
      {
        id: 'm3',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        type: 'image',
        name: 'carousel_cover.jpg',
        size: '1.8 MB',
      },
    ],
  },
  {
    id: 'draft-fb-1',
    title: '📢 Big Announcement: Introducing Our Local-First Creative OS',
    body: `We are thrilled to announce our major release! 🎉

For creators who value speed, privacy, and zero distraction, we've built a dedicated Content Draft Workspace. 

No monthly API subscriptions required, no clunky backend databases. Everything stays locked inside your browser's private local database.

Check out the full showcase and join our early creator round! 👇`,
    platform: 'facebook',
    tags: ['ProductLaunch', 'Announcement'],
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    status: 'draft',
    facebookType: 'announcement',
    media: [],
  },
  {
    id: 'draft-email-1',
    title: 'Issue #42: The Art of Asynchronous Creation & Calm Dashboards',
    body: `Hi Creator,

In this edition of The Asynchronous Mind, we explore why modern creator tools are moving away from noisy notifications and towards calm, private draft spaces.

### Highlights:
1. Why local-first software feels 10x faster.
2. The psychology of isolated platform workspaces (writing for Reddit vs writing for Email).
3. How to build reusable copy templates that don't sound like AI slop.

Read the full edition below.`,
    platform: 'email',
    tags: ['Newsletter', 'WeeklyDigest'],
    pinned: true,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'ready',
    emailSubject: 'The Art of Asynchronous Creation & Calm Dashboards 🌿',
    emailPreviewText: 'Why modern creator tools are moving away from noisy dashboards towards private, local-first workspaces.',
    media: [],
  },
  {
    id: 'draft-gen-1',
    title: '💡 Brainstorm: Future Feature Roadmap & Copy Snippets',
    body: `# Content OS Ideas & Research Notes

- [x] Implement liquid glass card styling with 22-28px radius
- [x] Puter.js browser AI integration for copy & image generation
- [ ] Add SVG banner export module
- [ ] Expand template tags with custom collections

### Quick Copy Snippet:
"Where minimalist engineering meets distraction-free content creation."`,
    platform: 'general',
    tags: ['Roadmap', 'Ideas', 'Notes'],
    pinned: true,
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    status: 'draft',
    folder: 'Product Strategy',
    media: [],
  },
];

const INITIAL_IMAGES: GeneratedImage[] = [
  {
    id: 'img-1',
    prompt: 'A sleek modern minimal glass studio with lush green plants, warm golden soft light, photorealistic 8k',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    date: new Date(Date.now() - 3600000 * 6).toISOString(),
    platform: 'instagram',
    favourite: true,
    style: 'Minimal Graphic',
    aspectRatio: '1:1',
    mood: 'Calm & Professional',
  },
  {
    id: 'img-2',
    prompt: 'Futuristic abstract liquid glass composition with soft emerald gradients and smooth lighting, 3D render',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    date: new Date(Date.now() - 3600000 * 14).toISOString(),
    platform: 'x',
    favourite: true,
    style: 'Modern Illustration',
    aspectRatio: '16:9',
    mood: 'Vibrant & Technological',
  },
  {
    id: 'img-3',
    prompt: 'Clean workspace aesthetic setup with laptop, notebook, coffee cup and soft sunlight shadow',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    date: new Date(Date.now() - 3600000 * 22).toISOString(),
    platform: 'email',
    favourite: false,
    style: 'Product Showcase',
    aspectRatio: '16:9',
    mood: 'Productive & Warm',
  },
];

const INITIAL_COMMUNITIES: CommunityLink[] = [
  {
    id: 'comm-1',
    name: 'r/SideProject',
    url: 'https://reddit.com/r/SideProject',
    platform: 'reddit',
    category: 'Indie Hacking',
    notes: 'Great community for feedback on early UI/UX and launch announcements. Best posting time: Tuesdays 8 AM EST.',
    subscriberCount: '240k members',
    pinned: true,
    favourite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'comm-2',
    name: 'r/webdev',
    url: 'https://reddit.com/r/webdev',
    platform: 'reddit',
    category: 'Engineering',
    notes: 'Strict rules on self-promotion. Use Showoff Saturday thread for showcase posts.',
    subscriberCount: '2.1M members',
    pinned: false,
    favourite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'comm-3',
    name: 'Tech Creator Circle',
    url: 'https://x.com/i/communities/1234567',
    platform: 'x',
    category: 'X Communities',
    notes: 'High engagement on short-form threads and product building lessons.',
    subscriberCount: '15.4k members',
    pinned: true,
    favourite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'comm-4',
    name: 'SaaS Launchpad Group',
    url: 'https://facebook.com/groups/saaslaunch',
    platform: 'facebook',
    category: 'Facebook Groups',
    notes: 'Active founder audience interested in growth hacks and copy strategies.',
    subscriberCount: '45k members',
    pinned: false,
    favourite: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'comm-5',
    name: 'UI/UX Designers & Creators',
    url: 'https://instagram.com/designers_hub',
    platform: 'instagram',
    category: 'Instagram Pages',
    notes: 'Tag for carousel reshapes and design highlights.',
    subscriberCount: '180k followers',
    pinned: true,
    favourite: true,
    createdAt: new Date().toISOString(),
  },
];

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
    window.dispatchEvent(new Event('bloome_storage_update'));
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
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      prompt: imgData.prompt,
      url: imgData.url,
      date: new Date().toISOString(),
      platform: imgData.platform,
      favourite: imgData.favourite ?? false,
      style: imgData.style || 'Modern Illustration',
      aspectRatio: imgData.aspectRatio || '16:9',
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
    window.dispatchEvent(new Event('bloome_storage_update'));
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
