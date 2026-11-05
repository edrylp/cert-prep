import React, { useState } from 'react';
import { 
  Home, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  CreditCard, 
  Zap, 
  Target, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  X,
  Compass,
  Award,
  Sun,
  Moon
} from 'lucide-react';

const domainIcons = {
  1: Cloud,
  2: ShieldCheck,
  3: Cpu,
  4: CreditCard
};

export default function Sidebar({
  domains = [],
  currentView,
  currentDomainId,
  currentSectionId,
  onNavigate,
  onOpenSearch,
  isMobileOpen,
  onCloseMobile,
  studyProgress = {},
  isDarkMode,
  onToggleDarkMode
}) {
  const [expandedDomains, setExpandedDomains] = useState({
    'domain-1': true,
    'domain-2': true,
    'domain-3': true,
    'domain-4': true,
  });

  const toggleDomain = (domainId, e) => {
    e.stopPropagation();
    setExpandedDomains(prev => ({
      ...prev,
      [domainId]: !prev[domainId]
    }));
  };

  // Calculate overall progress
  let totalSections = 0;
  let masteredCount = 0;
  domains.forEach(d => {
    d.subsections.forEach(s => {
      totalSections++;
      if (studyProgress[s.id]) masteredCount++;
    });
  });
  const progressPercent = totalSections > 0 ? Math.round((masteredCount / totalSections) * 100) : 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#FBFBFA] dark:bg-[#181818] border-r border-[#EAEAE8] dark:border-[#2C2C2C] flex flex-col transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Workspace / Exam Header */}
        <div className="p-4 border-b border-[#EAEAE8] dark:border-[#2C2C2C] flex items-center justify-between">
          <div 
            onClick={() => {
              onNavigate({ view: 'dashboard' });
              if (isMobileOpen) onCloseMobile();
            }}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base border border-amber-300/40">
              AWS
            </div>
            <div>
              <h1 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F0F0F0]">
                CLF-C02 Reviewer
              </h1>
              <p className="text-[11px] text-[#7A7A77] dark:text-[#999999]">
                High-Yield Study Guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-md hover:bg-[#EFEFED] dark:hover:bg-[#282828] text-[#777774] dark:text-[#AAAAAA] transition-colors"
              title={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-md hover:bg-[#EFEFED] dark:hover:bg-[#282828] text-[#777774] dark:text-[#AAAAAA] md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search Button in Sidebar */}
        <div className="px-3 pt-3">
          <button
            onClick={() => {
              onOpenSearch();
              if (isMobileOpen) onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#F0F0EE] dark:bg-[#222222] text-[#666663] dark:text-[#A0A09D] hover:bg-[#E8E8E5] dark:hover:bg-[#282828] text-xs transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#888888]" />
              <span>Search reviewer...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1A1A1A] border border-[#DCDCDA] dark:border-[#383838] text-[10px] font-mono text-[#888888]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin">
          {/* Main Views */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate({ view: 'dashboard' });
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-[#EAEAE8] text-[#202020] dark:bg-[#2A2A2A] dark:text-[#FFFFFF]'
                  : 'text-[#555552] dark:text-[#B0B0AE] hover:bg-[#F2F2F0] dark:hover:bg-[#222222]'
              }`}
            >
              <Home className="w-4 h-4 text-[#7A7A77]" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => {
                onNavigate({ view: 'cheatsheet' });
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'cheatsheet'
                  ? 'bg-amber-100/70 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 font-semibold'
                  : 'text-[#555552] dark:text-[#B0B0AE] hover:bg-[#F2F2F0] dark:hover:bg-[#222222]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Cheat Sheet / Lightning</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold">
                50+
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate({ view: 'strategy' });
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'strategy'
                  ? 'bg-[#EAEAE8] text-[#202020] dark:bg-[#2A2A2A] dark:text-[#FFFFFF]'
                  : 'text-[#555552] dark:text-[#B0B0AE] hover:bg-[#F2F2F0] dark:hover:bg-[#222222]'
              }`}
            >
              <Target className="w-4 h-4 text-blue-500" />
              <span>Exam Strategy Framework</span>
            </button>
          </div>

          {/* Exam Domains Section */}
          <div className="pt-2">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8A8A86] dark:text-[#777777]">
              Official Exam Domains
            </div>

            <div className="space-y-1">
              {domains.map(domain => {
                const IconComponent = domainIcons[domain.number] || BookOpen;
                const isSelectedDomain = currentView === 'reviewer' && currentDomainId === domain.id;
                const isExpanded = expandedDomains[domain.id];

                return (
                  <div key={domain.id} className="space-y-0.5">
                    {/* Domain Title Row */}
                    <div
                      onClick={() => {
                        onNavigate({ view: 'reviewer', domainId: domain.id });
                        if (isMobileOpen) onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                        isSelectedDomain
                          ? 'bg-[#EAEAE8] text-[#202020] dark:bg-[#2A2A2A] dark:text-[#FFFFFF]'
                          : 'text-[#444441] dark:text-[#C5C5C2] hover:bg-[#F2F2F0] dark:hover:bg-[#222222]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={(e) => toggleDomain(domain.id, e)}
                          className="p-0.5 text-[#888888] hover:text-[#333333] dark:hover:text-[#FFFFFF]"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <IconComponent className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span className="truncate">{domain.shortTitle}</span>
                      </div>

                      <span className="text-[10px] text-[#7A7A77] dark:text-[#888888] font-mono shrink-0 ml-1">
                        {domain.weight}
                      </span>
                    </div>

                    {/* Subsections List when expanded */}
                    {isExpanded && (
                      <div className="pl-6 pr-1 space-y-0.5 border-l-2 border-[#EAEAE8] dark:border-[#2C2C2C] ml-4 my-1">
                        {domain.subsections.map(sub => {
                          const isSubActive = isSelectedDomain && currentSectionId === sub.id;
                          const isMastered = studyProgress[sub.id];

                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                onNavigate({ view: 'reviewer', domainId: domain.id, sectionId: sub.id });
                                if (isMobileOpen) onCloseMobile();
                              }}
                              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] text-left transition-colors ${
                                isSubActive
                                  ? 'bg-amber-100/60 text-amber-900 font-semibold dark:bg-amber-950/40 dark:text-amber-200'
                                  : 'text-[#666663] dark:text-[#999996] hover:text-[#202020] dark:hover:text-[#E8E8E8] hover:bg-[#EFEFED] dark:hover:bg-[#222222]'
                              }`}
                            >
                              <span className="truncate">{sub.title}</span>
                              {isMastered && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 ml-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Study Progress Footer */}
        <div className="p-3.5 border-t border-[#EAEAE8] dark:border-[#2C2C2C] bg-[#F7F7F5] dark:bg-[#1E1E1E]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-[#444441] dark:text-[#C5C5C2] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Prep Readiness
            </span>
            <span className="font-bold text-[#202020] dark:text-[#FFFFFF]">{progressPercent}%</span>
          </div>

          <div className="w-full bg-[#E5E5E3] dark:bg-[#333333] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[10px] text-[#7A7A77] dark:text-[#888888] mt-1.5">
            {masteredCount} of {totalSections} study sections mastered
          </p>
        </div>
      </aside>
    </>
  );
}

