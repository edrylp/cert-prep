import React, { useState, useEffect, useMemo } from 'react';
import reviewerRaw from './content/reviewer.md?raw';
import { parseReviewerMarkdown } from './utils/markdownParser';
import { getStudyProgress, toggleSectionMastery } from './utils/studyProgress';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import DashboardView from './views/DashboardView';
import ReviewerView from './views/ReviewerView';
import QuickCheatSheet from './components/QuickCheatSheet';
import StrategyView from './views/StrategyView';

export default function App() {
  // Parse the markdown once
  const parsedData = useMemo(() => {
    return parseReviewerMarkdown(reviewerRaw);
  }, []);

  // View state
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'reviewer' | 'cheatsheet' | 'strategy'
  const [currentDomainId, setCurrentDomainId] = useState('domain-1');
  const [currentSectionId, setCurrentSectionId] = useState(null);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aws_prep_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aws_prep_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aws_prep_theme', 'light');
    }
  }, [isDarkMode]);

  // Study mastery progress
  const [studyProgress, setStudyProgress] = useState(() => getStudyProgress());

  const handleToggleMastery = (sectionId) => {
    const updated = toggleSectionMastery(sectionId);
    setStudyProgress(updated);
  };

  // Keyboard shortcut listener for Cmd+K / / to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Generic navigation handler
  const handleNavigate = ({ view, domainId, sectionId, topicTitle }) => {
    if (view) setCurrentView(view);
    if (domainId) setCurrentDomainId(domainId);
    if (sectionId) setCurrentSectionId(sectionId);
    else setCurrentSectionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentDomain = parsedData?.domains?.find(d => d.id === currentDomainId);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] text-[#2C2C2C] dark:text-[#E0E0E0] font-sans antialiased flex flex-col">
      {/* Sidebar (Desktop fixed + Mobile slide-over) */}
      <Sidebar
        domains={parsedData?.domains || []}
        currentView={currentView}
        currentDomainId={currentDomainId}
        currentSectionId={currentSectionId}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        studyProgress={studyProgress}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      {/* Main Content Area */}
      <div className="md:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          currentView={currentView}
          currentDomain={currentDomain}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
        />

        {/* View Routing */}
        <main className="flex-1 pb-16">
          {currentView === 'dashboard' && (
            <DashboardView
              domains={parsedData?.domains || []}
              studyProgress={studyProgress}
              onNavigate={handleNavigate}
              scenariosCount={parsedData?.allScenarios?.length || 13}
              lightningCount={parsedData?.cheatSheet?.lightningRound?.length || 50}
            />
          )}

          {currentView === 'reviewer' && (
            <ReviewerView
              domains={parsedData?.domains || []}
              currentDomainId={currentDomainId}
              currentSectionId={currentSectionId}
              onSelectDomain={(domId) => handleNavigate({ view: 'reviewer', domainId: domId })}
              onSelectSection={(secId) => setCurrentSectionId(secId)}
              studyProgress={studyProgress}
              onToggleMastery={handleToggleMastery}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'cheatsheet' && (
            <QuickCheatSheet
              cheatSheetData={parsedData?.cheatSheet}
              examStrategy={parsedData?.examStrategy}
              onJumpToDomain={(domId) => handleNavigate({ view: 'reviewer', domainId: domId })}
            />
          )}

          {currentView === 'strategy' && (
            <StrategyView
              examStrategyContent={parsedData?.examStrategy}
              allScenarios={parsedData?.allScenarios || []}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Cmd+K Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        parsedData={parsedData}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

