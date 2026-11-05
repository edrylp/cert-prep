import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Bookmark, Share2, Sparkles } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

export default function SectionAccordion({
  section,
  isMastered,
  onToggleMastery,
  defaultExpanded = true,
  searchQuery = ''
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div 
      id={section.id} 
      className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white dark:bg-[#1C1C1C] ${
        isMastered 
          ? 'border-emerald-200 dark:border-emerald-900/60 shadow-xs' 
          : 'border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle'
      }`}
    >
      {/* Header bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-white dark:bg-[#1C1C1C] hover:bg-[#FAFAFA] dark:hover:bg-[#222222] cursor-pointer transition-colors select-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          <button 
            type="button" 
            className="p-1 rounded text-[#777774] dark:text-[#999996] hover:bg-[#EFEFED] dark:hover:bg-[#2A2A2A] transition-colors shrink-0"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-[#444444] dark:text-[#CCCCCC]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#444444] dark:text-[#CCCCCC]" />
            )}
          </button>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-[#202020] dark:text-[#F0F0F0] tracking-tight truncate">
              {section.title}
            </h2>
            {section.topics.length > 0 && !isExpanded && (
              <p className="text-xs text-[#7A7A77] dark:text-[#999999] truncate mt-0.5">
                {section.topics.length} topics: {section.topics.slice(0, 3).join(', ')}...
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 ml-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onToggleMastery(section.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isMastered
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-[#F5F5F3] dark:bg-[#252525] text-[#666663] dark:text-[#A0A09D] hover:bg-[#EAEAE8] border border-transparent'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
            <span className="hidden sm:inline">{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      {isExpanded && (
        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#F2F2F0] dark:border-[#282828]">
          <MarkdownRenderer content={section.content} searchQuery={searchQuery} />
        </div>
      )}
    </div>
  );
}

