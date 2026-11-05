import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Hash, Zap, BookOpen, HelpCircle, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, parsedData, onNavigate }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !parsedData) return null;

  // Build searchable index items
  const results = [];
  const cleanQuery = query.toLowerCase().trim();

  if (cleanQuery.length > 0) {
    // 1. Search in Lightning Round trigger keywords
    if (parsedData.cheatSheet?.lightningRound) {
      parsedData.cheatSheet.lightningRound.forEach(item => {
        if (
          item.keyword.toLowerCase().includes(cleanQuery) ||
          item.service.toLowerCase().includes(cleanQuery) ||
          item.category.toLowerCase().includes(cleanQuery)
        ) {
          results.push({
            type: 'lightning',
            icon: Zap,
            category: 'Cheat Sheet / Lightning Round',
            title: item.service,
            subtitle: `Trigger: "${item.keyword}"`,
            tag: item.category,
            action: () => {
              onNavigate({ view: 'cheatsheet', search: item.service });
              onClose();
            }
          });
        }
      });
    }

    // 2. Search in Domain Subsections & Topics
    parsedData.domains.forEach(domain => {
      domain.subsections.forEach(sub => {
        // Match in sub-title
        if (sub.title.toLowerCase().includes(cleanQuery)) {
          results.push({
            type: 'section',
            icon: BookOpen,
            category: domain.shortTitle,
            title: sub.title,
            subtitle: `${domain.title} (${domain.weight})`,
            tag: `Domain ${domain.number}`,
            action: () => {
              onNavigate({ view: 'reviewer', domainId: domain.id, sectionId: sub.id });
              onClose();
            }
          });
        }

        // Match in H3 topics
        sub.topics.forEach(topic => {
          if (topic.toLowerCase().includes(cleanQuery)) {
            results.push({
              type: 'topic',
              icon: Hash,
              category: domain.shortTitle,
              title: topic,
              subtitle: `Under ${sub.title}`,
              tag: `Domain ${domain.number}`,
              action: () => {
                onNavigate({ view: 'reviewer', domainId: domain.id, sectionId: sub.id, topicTitle: topic });
                onClose();
              }
            });
          }
        });

        // Match in content text preview
        if (sub.content && sub.content.toLowerCase().includes(cleanQuery)) {
          // If not already matched by topic or title, show preview snippet
          const lower = sub.content.toLowerCase();
          const matchPos = lower.indexOf(cleanQuery);
          const start = Math.max(0, matchPos - 35);
          const snippet = sub.content.substring(start, matchPos + 55).replace(/[#*|`]/g, ' ').trim();

          const alreadyAdded = results.some(r => r.title === sub.title);
          if (!alreadyAdded) {
            results.push({
              type: 'text',
              icon: Hash,
              category: domain.shortTitle,
              title: sub.title,
              subtitle: `...${snippet}...`,
              tag: `Domain ${domain.number}`,
              action: () => {
                onNavigate({ view: 'reviewer', domainId: domain.id, sectionId: sub.id });
                onClose();
              }
            });
          }
        }
      });
    });

    // 3. Search in Scenarios
    if (parsedData.allScenarios) {
      parsedData.allScenarios.forEach(sc => {
        if (sc.title.toLowerCase().includes(cleanQuery) || sc.body.toLowerCase().includes(cleanQuery)) {
          results.push({
            type: 'scenario',
            icon: HelpCircle,
            category: `Domain ${sc.domainNumber} Scenario`,
            title: sc.title,
            subtitle: sc.domainTitle,
            tag: 'Exam Scenario',
            action: () => {
              onNavigate({ view: 'reviewer', domainId: `domain-${sc.domainNumber}` });
              onClose();
            }
          });
        }
      });
    }
  }

  const displayedResults = results.slice(0, 15);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#1C1C1C] rounded-2xl shadow-2xl border border-[#E5E5E5] dark:border-[#333333] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#EBEBEB] dark:border-[#2C2C2C]">
          <Search className="w-5 h-5 text-[#888888] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search keywords, AWS services, scenarios, trigger words..."
            className="w-full bg-transparent text-sm sm:text-base outline-none text-[#2C2C2C] dark:text-[#E8E8E8] placeholder:text-[#999999]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#888888] hover:text-[#333333] dark:hover:text-[#FFFFFF] rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-[#888888] bg-[#F2F2F2] dark:bg-[#282828] border border-[#E0E0E0] dark:border-[#3A3A3A] rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {query.trim() === '' && (
          <div className="p-4 sm:p-5">
            <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2.5">
              Popular CLF-C02 Exam Triggers
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Shared Responsibility',
                'Well-Architected Framework',
                'Least Privilege',
                'Spot Instances',
                'Shield vs WAF',
                'CloudTrail vs CloudWatch',
                'S3 vs EBS vs EFS',
                '6 Rs of migration',
                'Pricing Calculator',
                'Trusted Advisor'
              ].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F5F5] dark:bg-[#262626] text-[#4F4F4F] dark:text-[#CCCCCC] hover:bg-amber-50 hover:text-amber-800 dark:hover:bg-amber-950/40 dark:hover:text-amber-300 transition-colors border border-transparent hover:border-amber-200 dark:hover:border-amber-900/50"
                >
                  {term}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#EFEFEF] dark:border-[#282828] text-xs text-[#888888] flex items-center justify-between">
              <span>ProTip: Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-[11px]">/</kbd> anytime to search</span>
              <span>Single source: CLF-C02 High-Yield Reviewer</span>
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() !== '' && (
          <div className="overflow-y-auto p-2 divide-y divide-[#F2F2F2] dark:divide-[#262626]">
            {displayedResults.length === 0 ? (
              <div className="p-8 text-center text-[#888888]">
                <p className="text-sm">No exam content matching "{query}"</p>
                <p className="text-xs mt-1 text-[#AAAAAA]">Try searching for service names like "S3", "Lambda", or concepts like "CapEx"</p>
              </div>
            ) : (
              displayedResults.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={item.action}
                    className="w-full text-left p-3 rounded-xl hover:bg-[#F7F7F6] dark:hover:bg-[#252525] transition-colors flex items-center justify-between group gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#F0F0EE] dark:bg-[#2B2B2B] text-[#555555] dark:text-[#BBBBBB] group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/30 transition-colors shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-[#2C2C2C] dark:text-[#E8E8E8] truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#EDEDEB] dark:bg-[#2C2C2C] text-[#666666] dark:text-[#AAAAAA] shrink-0">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#7A7A77] dark:text-[#999999] truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#333333] dark:group-hover:text-[#FFFFFF] shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </button>
                );
              })
            )}
          </div>
        )}

        {displayedResults.length > 0 && (
          <div className="px-4 py-2 bg-[#FAFAFA] dark:bg-[#171717] border-t border-[#EBEBEB] dark:border-[#2C2C2C] text-xs text-[#888888] flex justify-between items-center">
            <span>Showing top {displayedResults.length} matches</span>
            <span>Click any result to jump directly</span>
          </div>
        )}
      </div>
    </div>
  );
}

