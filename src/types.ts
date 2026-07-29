export type PlatformType =
  | 'dashboard'
  | 'x'
  | 'reddit'
  | 'facebook'
  | 'instagram'
  | 'email'
  | 'general'
  | 'templates'
  | 'settings';

export type DraftStatus = 'draft' | 'review' | 'ready' | 'archived';

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif' | 'pdf' | 'link';
  name: string;
  size?: string;
  prompt?: string;
  aspectRatio?: string;
}

export interface Draft {
  id: string;
  title: string;
  body: string;
  platform: PlatformType;
  tags: string[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  status: DraftStatus;
  folder?: string;
  media: MediaItem[];
  // Platform-specific extras
  threadItems?: string[]; // For X threads
  characterCount?: number;
  pollOptions?: string[]; // For X / Reddit polls
  emailSubject?: string;
  emailPreviewText?: string;
  instagramCarouselSlides?: string[];
  redditSubreddit?: string;
  redditPostType?: 'text' | 'image' | 'link' | 'ama' | 'question' | 'discussion';
  facebookType?: 'post' | 'long' | 'announcement' | 'update' | 'event';
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  expandedPrompt?: string;
  url: string;
  date: string;
  platform: PlatformType;
  favourite: boolean;
  style: string;
  aspectRatio: string;
  brandCategory?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  bgColor?: string;
  lighting?: string;
  camera?: string;
  depth?: string;
  composition?: string;
  negativePrompt?: string;
  generationTime?: string;
  fileSize?: string;
  mood?: string;
  brandColors?: string;
}

export interface GeneratedCopy {
  id: string;
  prompt: string;
  copy: string;
  copyVariants?: string[];
  platform: PlatformType;
  createdAt: string;
  tone?: string;
  goal?: string;
  audience?: string;
  hashtags?: string[];
}

export interface CommunityLink {
  id: string;
  name: string;
  url: string;
  platform: PlatformType;
  category: string;
  notes?: string;
  subscriberCount?: string;
  pinned: boolean;
  favourite: boolean;
  icon?: string;
  createdAt: string;
}

export interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  platform: PlatformType;
  body: string;
  tags: string[];
  subjectLine?: string; // for email
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultTone: string;
  autoSaveInterval: number;
  defaultPlatform: PlatformType;
  puterEnabled: boolean;
}

export interface VersionHistoryItem {
  id: string;
  draftId: string;
  timestamp: string;
  title: string;
  body: string;
  note: string;
}
