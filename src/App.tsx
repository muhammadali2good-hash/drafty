import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { AICopyGeneratorModal } from './components/ai/AICopyGeneratorModal';
import { AIImageGeneratorModal } from './components/ai/AIImageGeneratorModal';
import { DraftEditorModal } from './components/drafts/DraftEditorModal';
import { CommunityLibraryModal } from './components/community/CommunityLibraryModal';
import { DashboardHomeView } from './components/views/DashboardHomeView';
import { PlatformWorkspaceView } from './components/views/PlatformWorkspaceView';
import { TemplatesView } from './components/views/TemplatesView';
import { SettingsView } from './components/views/SettingsView';
import { LandingPageView } from './components/views/LandingPageView';
import { StorageService } from './lib/storage';
import { PlatformType, Draft, GeneratedImage, CommunityLink, ContentTemplate, UserPreferences } from './types';

export default function App() {
  const [currentPlatform, setCurrentPlatform] = useState<PlatformType>('landing');
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [communities, setCommunities] = useState<CommunityLink[]>([]);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [prefs, setPrefs] = useState<UserPreferences>(StorageService.getPreferences());
  const [storageKB, setStorageKB] = useState<number>(0);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAICopyOpen, setIsAICopyOpen] = useState(false);
  const [isAIImageOpen, setIsAIImageOpen] = useState(false);
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);
  const [isDraftEditorOpen, setIsDraftEditorOpen] = useState(false);
  const [activeDraft, setActiveDraft] = useState<Draft | null>(null);

  // Synchronize state with StorageService
  const reloadStorage = () => {
    setDrafts(StorageService.getDrafts());
    setImages(StorageService.getImages());
    setCommunities(StorageService.getCommunities());
    setTemplates(StorageService.getTemplates());
    setPrefs(StorageService.getPreferences());
    setStorageKB(StorageService.getStorageSizeInKB());
  };

  useEffect(() => {
    reloadStorage();
    const handleStorageUpdate = () => reloadStorage();
    window.addEventListener('drafty_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('drafty_storage_update', handleStorageUpdate);
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (prefs.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [prefs.theme]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setActiveDraft(null);
        setIsDraftEditorOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Handlers
  const handleToggleTheme = () => {
    const newTheme = prefs.theme === 'dark' ? 'light' : 'dark';
    const updated = StorageService.savePreferences({ theme: newTheme });
    setPrefs(updated);
  };

  const handleOpenNewDraft = () => {
    setActiveDraft(null);
    setIsDraftEditorOpen(true);
  };

  const handleSelectDraft = (draft: Draft) => {
    setActiveDraft(draft);
    setIsDraftEditorOpen(true);
  };

  const handleSaveDraft = (draftData: Partial<Draft> & { platform: PlatformType }) => {
    StorageService.saveDraft(draftData);
    reloadStorage();
  };

  const handleDeleteDraft = (id: string) => {
    StorageService.deleteDraft(id);
    reloadStorage();
  };

  const handleTogglePinDraft = (id: string) => {
    StorageService.togglePinDraft(id);
    reloadStorage();
  };

  const handleSaveImage = (img: GeneratedImage) => {
    StorageService.saveImage(img);
    reloadStorage();
  };

  const handleDeleteImage = (id: string) => {
    StorageService.deleteImage(id);
    reloadStorage();
  };

  const handleToggleFavouriteImage = (id: string) => {
    StorageService.toggleFavouriteImage(id);
    reloadStorage();
  };

  const handleSaveCommunity = (link: Partial<CommunityLink> & { name: string; url: string; platform: PlatformType }) => {
    StorageService.saveCommunity(link);
    reloadStorage();
  };

  const handleDeleteCommunity = (id: string) => {
    StorageService.deleteCommunity(id);
    reloadStorage();
  };

  const handleTogglePinCommunity = (id: string) => {
    StorageService.togglePinCommunity(id);
    reloadStorage();
  };

  const handleApplyTemplate = (tpl: ContentTemplate) => {
    // Open draft editor with template pre-filled
    const newDraftData: Partial<Draft> & { platform: PlatformType } = {
      title: `${tpl.title} (Draft)`,
      body: tpl.body,
      platform: tpl.platform,
      tags: tpl.tags,
      emailSubject: tpl.subjectLine,
      status: 'draft',
    };
    const saved = StorageService.saveDraft(newDraftData);
    reloadStorage();
    setActiveDraft(saved);
    setIsDraftEditorOpen(true);
  };

  const handleSaveNewTemplate = (tpl: Partial<ContentTemplate> & { title: string; body: string; platform: PlatformType }) => {
    StorageService.saveTemplate(tpl);
    reloadStorage();
  };

  const handleResetSampleData = () => {
    StorageService.clearAllData();
    reloadStorage();
  };

  // Compute draft counts per platform
  const draftCounts: Record<PlatformType, number> = {
    landing: 0,
    dashboard: drafts.length,
    x: drafts.filter((d) => d.platform === 'x').length,
    reddit: drafts.filter((d) => d.platform === 'reddit').length,
    facebook: drafts.filter((d) => d.platform === 'facebook').length,
    instagram: drafts.filter((d) => d.platform === 'instagram').length,
    email: drafts.filter((d) => d.platform === 'email').length,
    general: drafts.filter((d) => d.platform === 'general').length,
    templates: templates.length,
    settings: 0,
  };

  // Filtered views items per platform
  const platformDrafts = currentPlatform === 'dashboard' ? drafts : drafts.filter((d) => d.platform === currentPlatform);
  const platformImages = currentPlatform === 'dashboard' ? images : images.filter((img) => img.platform === currentPlatform);
  const platformCommunities = currentPlatform === 'dashboard' ? communities : communities.filter((c) => c.platform === currentPlatform);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-emerald-50 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {currentPlatform === 'landing' ? (
        <LandingPageView
          onEnterDashboard={(p) => setCurrentPlatform(p || 'dashboard')}
          onOpenAICopy={() => setIsAICopyOpen(true)}
          onOpenAIImage={() => setIsAIImageOpen(true)}
          theme={prefs.theme}
          onToggleTheme={handleToggleTheme}
        />
      ) : (
        <>
          {/* Fixed Apple-style Rounded Sidebar */}
          <Sidebar
            currentPlatform={currentPlatform}
            onSelectPlatform={setCurrentPlatform}
            onQuickCreate={handleOpenNewDraft}
            onOpenAICopy={() => setIsAICopyOpen(true)}
            draftCounts={draftCounts}
            storageKB={storageKB}
          />

          {/* Main Workspace Frame */}
          <div className="pl-[310px] pr-6 pt-4 min-h-screen flex flex-col">
            {/* Header */}
            <Header
              currentPlatform={currentPlatform}
              theme={prefs.theme}
              onToggleTheme={handleToggleTheme}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenAICopy={() => setIsAICopyOpen(true)}
              onOpenAIImage={() => setIsAIImageOpen(true)}
              onOpenCommunities={() => setIsCommunitiesOpen(true)}
            />

            {/* Dynamic View Route */}
            <main className="flex-1">
              <AnimatePresence mode="wait">
                {currentPlatform === 'dashboard' && (
                  <DashboardHomeView
                    key="dashboard"
                    drafts={drafts}
                    images={images}
                    communities={communities}
                    onSelectDraft={handleSelectDraft}
                    onSelectPlatform={setCurrentPlatform}
                    onQuickCreate={handleOpenNewDraft}
                    onOpenAICopy={() => setIsAICopyOpen(true)}
                    onOpenAIImage={() => setIsAIImageOpen(true)}
                    onDeleteImage={handleDeleteImage}
                    storageKB={storageKB}
                  />
                )}

                {currentPlatform === 'templates' && (
                  <TemplatesView
                    key="templates"
                    templates={templates}
                    onApplyTemplate={handleApplyTemplate}
                    onSaveNewTemplate={handleSaveNewTemplate}
                  />
                )}

                {currentPlatform === 'settings' && (
                  <SettingsView
                    key="settings"
                    prefs={prefs}
                    onUpdatePrefs={(newPrefs) => {
                      const updated = StorageService.savePreferences(newPrefs);
                      setPrefs(updated);
                    }}
                    storageKB={storageKB}
                    onResetSampleData={handleResetSampleData}
                  />
                )}

                {['x', 'reddit', 'facebook', 'instagram', 'email', 'general'].includes(currentPlatform) && (
                  <PlatformWorkspaceView
                    key={currentPlatform}
                    platform={currentPlatform}
                    drafts={platformDrafts}
                    images={platformImages}
                    communities={platformCommunities}
                    onSelectDraft={handleSelectDraft}
                    onNewDraft={handleOpenNewDraft}
                    onOpenAICopy={() => setIsAICopyOpen(true)}
                    onOpenAIImage={() => setIsAIImageOpen(true)}
                    onTogglePin={handleTogglePinDraft}
                    onDeleteDraft={handleDeleteDraft}
                    onDeleteImage={handleDeleteImage}
                    onToggleFavouriteImage={handleToggleFavouriteImage}
                  />
                )}
              </AnimatePresence>
            </main>
          </div>
        </>
      )}

      {/* Modals & Dialog Overlay Layer */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        drafts={drafts}
        images={images}
        communities={communities}
        templates={templates}
        onSelectDraft={handleSelectDraft}
        onSelectPlatform={setCurrentPlatform}
      />

      <AICopyGeneratorModal
        isOpen={isAICopyOpen}
        onClose={() => setIsAICopyOpen(false)}
        defaultPlatform={currentPlatform}
        onSaveToDrafts={handleSaveDraft}
      />

      <AIImageGeneratorModal
        isOpen={isAIImageOpen}
        onClose={() => setIsAIImageOpen(false)}
        defaultPlatform={currentPlatform}
        onSaveImage={handleSaveImage}
        onDeleteImage={handleDeleteImage}
        onToggleFavouriteImage={handleToggleFavouriteImage}
        allImages={images}
      />

      <DraftEditorModal
        isOpen={isDraftEditorOpen}
        onClose={() => setIsDraftEditorOpen(false)}
        draft={activeDraft}
        defaultPlatform={currentPlatform}
        onSave={handleSaveDraft}
        onDelete={handleDeleteDraft}
      />

      <CommunityLibraryModal
        isOpen={isCommunitiesOpen}
        onClose={() => setIsCommunitiesOpen(false)}
        communities={communities}
        defaultPlatform={currentPlatform}
        onSaveCommunity={handleSaveCommunity}
        onDeleteCommunity={handleDeleteCommunity}
        onTogglePin={handleTogglePinCommunity}
      />

      {/* Floating Liquid Glass Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenNewDraft}
        title="Quick New Draft"
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white rounded-[24px] flex items-center justify-center shadow-[0_12px_30px_rgba(16,185,129,0.35)] cursor-pointer z-40 transition-all"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </motion.button>
    </div>
  );
}
