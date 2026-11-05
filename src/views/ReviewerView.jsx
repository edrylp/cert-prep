import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  CreditCard, 
  Search, 
  CheckCircle2, 
  ChevronsUpDown, 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  Bookmark, 
  SlidersHorizontal,
  Layers,
  ChevronDown,
  List
} from 'lucide-react';
import SectionAccordion from '../components/SectionAccordion';

const domainIcons = {
  1: Cloud,
  2: ShieldCheck,
  3: Cpu,
  4: CreditCard
};

export default function ReviewerView({
  domains = [],
  currentDomainId,
  currentSectionId,
  onSelectDomain,
  onSelectSection,
  studyProgress = {},
  onToggleMastery,
  onNavigate
}) {
  const [inDomainSearch, setInDomainSearch] = useState('');
  const [expandAll, setExpandAll] = useState(true);
  const [expandKey, setExpandKey] = useState(0); // force re-render on expand/collapse all
  const [showTocMobile, setShowTocMobile] = useState(false);

  // Find current domain or default to domain-1
  const currentDomain = domains.find(d => d.id === currentDomainId) || domains[0];

  // Auto-scroll to currentSectionId if provided
  useEffect(() => {
    if (currentSectionId) {
      setTimeout(() => {
        const el = document.getElementById(currentSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentDomainId, currentSectionId]);

  if (!currentDomain) return null;

  const IconComponent = domainIcons[currentDomain.number] || Cloud;

  // Filter sections if searching inside domain
  const filteredSubsections = currentDomain.subsections.filter(sub => {
    if (!inDomainSearch.trim()) return true;
    const q = inDomainSearch.toLowerCase();
    const titleMatch = sub.title.toLowerCase().includes(q);
    const contentMatch = sub.content.toLowerCase().includes(q);
    const topicsMatch = sub.topics.some(t => t.toLowerCase().includes(q));
    return titleMatch || contentMatch || topicsMatch;
  });

  // Domain navigation next/prev
  const currentDomainIndex = domains.findIndex(d => d.id === currentDomain.id);
  const prevDomain = currentDomainIndex > 0 ? domains[currentDomainIndex - 1] : null;
  const nextDomain = currentDomainIndex < domains.length - 1 ? domains[currentDomainIndex + 1] : null;

  const masteredCount = currentDomain.subsections.filter(s => studyProgress[s.id]).length;
  const totalInDomain = currentDomain.subsections.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Domain Switcher Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8E8E6] dark:border-[#2C2C2C]">
        {domains.map(d => {
          const isActive = d.id === currentDomain.id;
          const DomainIcon = domainIcons[d.number] || Cloud;
          const isDomainComplete = d.subsections.every(s => studyProgress[s.id]);

          return (
            <button
              key={d.id}
              onClick={() => {
                onSelectDomain(d.id);
                setInDomainSearch('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#202020] text-white dark:bg-[#FFFFFF] dark:text-[#181818] shadow-sm'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#666663] dark:text-[#A0A09D] hover:bg-[#F0F0EE] dark:hover:bg-[#282828] border border-[#E8E8E6] dark:border-[#2C2C2C]'
              }`}
            >
              <DomainIcon className="w-4 h-4" />
              <span>Domain {d.number}: {d.shortTitle}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                isActive 
                  ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                {d.weight}
              </span>
              {isDomainComplete && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Domain Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Official CLF-C02 Blueprint
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${currentDomain.badgeColor}`}>
                {currentDomain.weight} of Examination
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] dark:text-[#FFFFFF] tracking-tight">
              {currentDomain.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#555552] dark:text-[#A0A09D] leading-relaxed">
              {currentDomain.description}
            </p>

            {/* Key Focus Tags */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {currentDomain.keyFocus?.map((f, i) => (
                <span 
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#F5F5F3] dark:bg-[#252525] text-[#444441] dark:text-[#C5C5C2] border border-[#EBEBE9] dark:border-[#333333]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Domain Progress Meter */}
          <div className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#202020] border border-[#EAEAE8] dark:border-[#2C2C2C] shrink-0 sm:w-56 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#555552] dark:text-[#A0A09D]">Domain Mastery</span>
              <span className="font-bold text-[#1F1F1F] dark:text-[#FFFFFF]">
                {masteredCount} / {totalInDomain}
              </span>
            </div>
            <div className="w-full bg-[#E5E5E3] dark:bg-[#333333] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(masteredCount / totalInDomain) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[#7A7A77] dark:text-[#888888]">
              {masteredCount === totalInDomain ? '🎉 Domain fully mastered!' : 'Mark sections as mastered as you review'}
            </p>
          </div>
        </div>

        {/* Quick In-Page Table of Contents Pills */}
        <div className="mt-6 pt-4 border-t border-[#F0F0EE] dark:border-[#282828]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#7A7A77] dark:text-[#999996] uppercase tracking-wider flex items-center gap-1.5">
              <List className="w-3.5 h-3.5" />
              Jump to Section:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentDomain.subsections.map((sub, idx) => {
              const isMastered = studyProgress[sub.id];
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    const el = document.getElementById(sub.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 ${
                    isMastered
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-[#F7F7F5] dark:bg-[#222222] border-[#E8E8E6] dark:border-[#303030] text-[#555552] dark:text-[#B5B5B2] hover:border-amber-400'
                  }`}
                >
                  {isMastered && <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  <span>{sub.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviewer Toolbar: Search inside domain & Expand/Collapse All */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search within this domain */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inDomainSearch}
            onChange={(e) => setInDomainSearch(e.target.value)}
            placeholder={`Filter inside ${currentDomain.shortTitle}...`}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] rounded-xl outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors text-[#2C2C2C] dark:text-[#EAEAEA]"
          />
          {inDomainSearch && (
            <button
              onClick={() => setInDomainSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#202020]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Expand / Collapse All Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setExpandAll(!expandAll);
              setExpandKey(prev => prev + 1);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] text-[#555552] dark:text-[#B5B5B2] hover:bg-[#F7F7F5] dark:hover:bg-[#252525] transition-colors"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            <span>{expandAll ? 'Collapse All Sections' : 'Expand All Sections'}</span>
          </button>
        </div>
      </div>

      {/* Subsections Accordions */}
      <div className="space-y-5" key={expandKey}>
        {filteredSubsections.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E8E8E6] dark:border-[#2C2C2C] text-[#7A7A77]">
            <p className="text-sm font-semibold">No topics matching "{inDomainSearch}" in {currentDomain.shortTitle}</p>
            <button
              onClick={() => setInDomainSearch('')}
              className="mt-2 text-xs text-amber-600 dark:text-amber-400 hover:underline"
            >
              Reset search filter
            </button>
          </div>
        ) : (
          filteredSubsections.map((sub, idx) => (
            <SectionAccordion
              key={sub.id}
              section={sub}
              isMastered={!!studyProgress[sub.id]}
              onToggleMastery={onToggleMastery}
              defaultExpanded={expandAll}
              searchQuery={inDomainSearch}
            />
          ))
        )}
      </div>

      {/* Domain Navigation Footer */}
      <div className="pt-6 border-t border-[#E8E8E6] dark:border-[#2C2C2C] flex items-center justify-between gap-4">
        {prevDomain ? (
          <button
            onClick={() => {
              onSelectDomain(prevDomain.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8E8E6] dark:border-[#2C2C2C] bg-white dark:bg-[#1A1A1A] text-[#2C2C2C] dark:text-[#E8E8E8] text-xs sm:text-sm font-semibold hover:bg-[#F7F7F5] dark:hover:bg-[#252525] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous:</span>
            <span>{prevDomain.shortTitle}</span>
          </button>
        ) : (
          <div />
        )}

        {nextDomain ? (
          <button
            onClick={() => {
              onSelectDomain(nextDomain.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <span className="hidden sm:inline">Next:</span>
            <span>{nextDomain.shortTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              onNavigate({ view: 'cheatsheet' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Go to Lightning Cheat Sheet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

