import React from 'react';
import { 
  Menu, 
  Search, 
  Zap, 
  Sun, 
  Moon, 
  ChevronRight, 
  BookOpen, 
  Home, 
  Target 
} from 'lucide-react';

export default function Navbar({
  onToggleMobileSidebar,
  onOpenSearch,
  currentView,
  currentDomain,
  onNavigate,
  isDarkMode,
  onToggleDarkMode
}) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFFFFF]/90 dark:bg-[#181818]/90 backdrop-blur-md border-b border-[#EAEAE8] dark:border-[#2C2C2C]">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        {/* Left: Mobile hamburger & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="p-1.5 -ml-1 text-[#666663] dark:text-[#A0A09D] hover:bg-[#F2F2F0] dark:hover:bg-[#252525] rounded-lg md:hidden transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#7A7A77] dark:text-[#999996] truncate">
            <button
              onClick={() => onNavigate({ view: 'dashboard' })}
              className="hover:text-[#202020] dark:hover:text-[#FFFFFF] transition-colors truncate"
            >
              CLF-C02
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-[#AAAAAA] shrink-0" />

            {currentView === 'dashboard' && (
              <span className="text-[#202020] dark:text-[#FFFFFF] font-semibold truncate">
                Dashboard
              </span>
            )}

            {currentView === 'cheatsheet' && (
              <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 truncate">
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                Cheat Sheet
              </span>
            )}

            {currentView === 'strategy' && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 truncate">
                <Target className="w-3.5 h-3.5" />
                Exam Strategy
              </span>
            )}

            {currentView === 'reviewer' && currentDomain && (
              <span className="text-[#202020] dark:text-[#FFFFFF] font-semibold truncate">
                {currentDomain.shortTitle}
              </span>
            )}
          </nav>
        </div>

        {/* Center/Right: Quick Search Bar & Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F3] dark:bg-[#222222] text-[#666663] dark:text-[#A0A09D] hover:bg-[#EAEAE8] dark:hover:bg-[#2A2A2A] text-xs border border-transparent transition-all"
            title="Search reviewer (Press ⌘K or /)"
          >
            <Search className="w-3.5 h-3.5 text-[#888888]" />
            <span className="hidden sm:inline">Search reviewer...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-[#1A1A1A] border border-[#DCDCDA] dark:border-[#383838] text-[10px] font-mono text-[#888888]">
              ⌘K
            </kbd>
          </button>

          {/* Cheat Sheet Fast Access Button */}
          <button
            onClick={() => onNavigate({ view: 'cheatsheet' })}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'cheatsheet'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-900/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Lightning Round</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-[#666663] dark:text-[#A0A09D] hover:bg-[#F2F2F0] dark:hover:bg-[#252525] transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}

