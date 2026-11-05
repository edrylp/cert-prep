import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Search, 
  Eye, 
  EyeOff, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  BookMarked, 
  FileText, 
  Target, 
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../utils/markdownParser';

export default function QuickCheatSheet({ cheatSheetData, examStrategy, onJumpToDomain }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isRecallMode, setIsRecallMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState('lightning'); // 'lightning' | 'facts' | 'strategy'

  const categories = useMemo(() => {
    return ['All', ...Object.keys(SERVICE_CATEGORIES)];
  }, []);

  const items = cheatSheetData?.lightningRound || [];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchQuery = 
        !search ||
        item.keyword.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;

      return matchQuery && matchCategory;
    });
  }, [items, search, selectedCategory]);

  const toggleReveal = (id) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const revealAll = () => {
    setRevealedIds(new Set(items.map(i => i.id)));
  };

  const hideAll = () => {
    setRevealedIds(new Set());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            High-Yield Rapid Memorization
          </span>
          <span className="text-xs text-[#7A7A77] dark:text-[#999999]">
            Source: Final High-Yield Memorization Sheet
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#202020] dark:text-[#F3F3F3] tracking-tight">
          AWS Service Keyword Lightning Round
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#666663] dark:text-[#A0A09D] max-w-3xl">
          Instantly recognize the exam keywords and connect scenario triggers directly to the right AWS service. Use <span className="font-medium text-[#202020] dark:text-[#EAEAEA]">Test Recall Mode</span> to quiz yourself before the exam.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mt-6 border-b border-[#E8E8E6] dark:border-[#2C2C2C] pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('lightning')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
              activeTab === 'lightning'
                ? 'bg-[#2C2C2C] text-white dark:bg-[#EAEAEA] dark:text-[#181818]'
                : 'text-[#666663] hover:text-[#202020] dark:text-[#999999] dark:hover:text-[#FFFFFF]'
            }`}
          >
            <Zap className="w-4 h-4" />
            Service Lightning Round ({items.length})
          </button>

          <button
            onClick={() => setActiveTab('facts')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
              activeTab === 'facts'
                ? 'bg-[#2C2C2C] text-white dark:bg-[#EAEAEA] dark:text-[#181818]'
                : 'text-[#666663] hover:text-[#202020] dark:text-[#999999] dark:hover:text-[#FFFFFF]'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            Numbers & Key Facts ({cheatSheetData?.facts?.length || 13})
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
              activeTab === 'strategy'
                ? 'bg-[#2C2C2C] text-white dark:bg-[#EAEAEA] dark:text-[#181818]'
                : 'text-[#666663] hover:text-[#202020] dark:text-[#999999] dark:hover:text-[#FFFFFF]'
            }`}
          >
            <Target className="w-4 h-4" />
            Exam Strategy & Distractor Elimination
          </button>
        </div>
      </div>

      {/* Tab 1: Service Lightning Round */}
      {activeTab === 'lightning' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white dark:bg-[#1A1A1A] p-3 sm:p-4 rounded-xl border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by keyword (e.g. 'serverless', 'decoupling', 'CDN')..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F7F6F3] dark:bg-[#222222] border border-transparent rounded-lg focus:border-amber-400 dark:focus:border-amber-600 focus:bg-white dark:focus:bg-[#1A1A1A] outline-none transition-all text-[#2C2C2C] dark:text-[#EAEAEA]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#202020]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Test Recall Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setIsRecallMode(!isRecallMode);
                  if (!isRecallMode) hideAll();
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  isRecallMode 
                    ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-300 shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#222222] border-[#E0E0DE] dark:border-[#333333] text-[#555555] dark:text-[#BBBBBB] hover:bg-gray-100'
                }`}
              >
                {isRecallMode ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Recall Mode: <strong>Active</strong></span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Test Recall Mode</span>
                  </>
                )}
              </button>

              {isRecallMode && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={revealAll}
                    title="Reveal All Answers"
                    className="p-2 text-xs rounded-lg border border-[#E0E0DE] dark:border-[#333333] hover:bg-gray-100 dark:hover:bg-[#282828] text-[#555555] dark:text-[#CCCCCC]"
                  >
                    Reveal All
                  </button>
                  <button
                    onClick={hideAll}
                    title="Hide All Answers"
                    className="p-2 text-xs rounded-lg border border-[#E0E0DE] dark:border-[#333333] hover:bg-gray-100 dark:hover:bg-[#282828] text-[#555555] dark:text-[#CCCCCC]"
                  >
                    Hide All
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white dark:bg-[#1E1E1E] text-[#666663] dark:text-[#A0A09D] border border-[#E8E8E6] dark:border-[#2C2C2C] hover:bg-[#F7F6F3] dark:hover:bg-[#252525]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Rapid Table & Mobile Card View */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E8E8E6] dark:border-[#2C2C2C] overflow-hidden shadow-subtle">
            <div className="px-4 py-3 bg-[#F7F6F3] dark:bg-[#202020] border-b border-[#E8E8E6] dark:border-[#2C2C2C] flex items-center justify-between text-xs text-[#7A7A77] dark:text-[#999999]">
              <span className="font-semibold uppercase tracking-wider">
                Showing {filteredItems.length} of {items.length} trigger pairs
              </span>
              {isRecallMode && (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  Click blurred answer or trigger to reveal
                </span>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAFAFA] dark:bg-[#222222] text-xs font-semibold uppercase tracking-wider text-[#555552] dark:text-[#999999] border-b border-[#E8E8E6] dark:border-[#2C2C2C]">
                  <tr>
                    <th className="px-5 py-3 w-7/12">Keyword In Scenario Question</th>
                    <th className="px-5 py-3 w-3/12">Target AWS Service</th>
                    <th className="px-5 py-3 w-2/12 text-right">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFEFED] dark:divide-[#262626]">
                  {filteredItems.map((item) => {
                    const isRevealed = !isRecallMode || revealedIds.has(item.id);

                    return (
                      <tr 
                        key={item.id} 
                        className="hover:bg-[#F9F9F8] dark:hover:bg-[#222222] transition-colors group cursor-pointer"
                        onClick={() => isRecallMode && toggleReveal(item.id)}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500 shrink-0" />
                            <span className="font-medium text-[#2C2C2C] dark:text-[#E8E8E8]">
                              {item.keyword}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          {isRevealed ? (
                            <span className="inline-flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-900/50">
                              {item.service}
                            </span>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleReveal(item.id);
                              }}
                              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xs font-mono select-none"
                            >
                              [Click to reveal answer]
                            </button>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EDEDEB] dark:bg-[#2A2A2A] text-[#666663] dark:text-[#A8A8A8]">
                            {item.category}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (optimized for phones) */}
            <div className="sm:hidden divide-y divide-[#EFEFED] dark:divide-[#262626]">
              {filteredItems.map(item => {
                const isRevealed = !isRecallMode || revealedIds.has(item.id);

                return (
                  <div 
                    key={item.id}
                    onClick={() => isRecallMode && toggleReveal(item.id)}
                    className="p-4 space-y-2 hover:bg-[#F9F9F8] dark:hover:bg-[#222222] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-[#7A7A77]">
                      <span className="font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                        {item.category}
                      </span>
                      {isRecallMode && (
                        <span className="text-amber-600 dark:text-amber-400 text-[11px]">
                          {isRevealed ? 'Revealed' : 'Tap to reveal'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-[#2C2C2C] dark:text-[#E8E8E8]">
                      Trigger: "{item.keyword}"
                    </div>
                    <div>
                      {isRevealed ? (
                        <div className="inline-flex items-center gap-1.5 font-bold text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-md border border-amber-200 dark:border-amber-900/50">
                          {item.service}
                        </div>
                      ) : (
                        <div className="py-1 px-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded text-xs inline-block">
                          ❓ Tap to reveal service
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Numbers & Facts Worth Remembering */}
      {activeTab === 'facts' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Quick Fact Rules:</strong> The AWS CLF-C02 exam often tests precise architectural concepts and responsibility boundaries. Memorize these direct pairs.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(cheatSheetData?.facts || []).map((factItem, idx) => (
              <div 
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-[#E8E8E6] dark:border-[#2C2C2C] bg-white dark:bg-[#1A1A1A] hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-subtle group"
              >
                <div className="flex items-center justify-between text-xs text-[#7A7A77] dark:text-[#999999] mb-1.5">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">Fact #{idx + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-base text-[#202020] dark:text-[#F0F0F0]">
                  {factItem.fact}
                </h3>
                <div className="mt-3 pt-3 border-t border-[#F0F0EE] dark:border-[#282828] flex items-center justify-between">
                  <span className="text-xs text-[#7A7A77] dark:text-[#999999]">Exam Rule:</span>
                  <span className="font-semibold text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-900/50">
                    {factItem.remember}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Exam Strategy & Scenario Solving */}
      {activeTab === 'strategy' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle">
            <h2 className="text-xl sm:text-2xl font-bold text-[#202020] dark:text-[#F3F3F3] mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-500" />
              Scenario Solving: The 3-Step Elimination Framework
            </h2>
            <p className="text-sm sm:text-base text-[#555552] dark:text-[#A0A09D] mb-6">
              When encountering scenario-based questions on the CLF-C02 exam, apply this systematic approach to quickly eliminate wrong distractors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FBFBFA] dark:bg-[#202020] border border-[#EBEBE9] dark:border-[#2E2E2E]">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mb-3">
                  1
                </div>
                <h3 className="font-bold text-sm text-[#202020] dark:text-[#EEEEEE] mb-1">
                  Identify Requirement
                </h3>
                <p className="text-xs text-[#666663] dark:text-[#999999] leading-relaxed">
                  Is it asking for Lowest Cost? Highest Availability? Least Operational Effort? Compliance? Storage?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBFBFA] dark:bg-[#202020] border border-[#EBEBE9] dark:border-[#2E2E2E]">
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-sm flex items-center justify-center mb-3">
                  2
                </div>
                <h3 className="font-bold text-sm text-[#202020] dark:text-[#EEEEEE] mb-1">
                  Identify Trigger Words
                </h3>
                <p className="text-xs text-[#666663] dark:text-[#999999] leading-relaxed">
                  "Without managing servers" → Serverless / Lambda. "Relational database" → RDS. "Spare capacity" → Spot.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBFBFA] dark:bg-[#202020] border border-[#EBEBE9] dark:border-[#2E2E2E]">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-sm flex items-center justify-center mb-3">
                  3
                </div>
                <h3 className="font-bold text-sm text-[#202020] dark:text-[#EEEEEE] mb-1">
                  Eliminate Overkill
                </h3>
                <p className="text-xs text-[#666663] dark:text-[#999999] leading-relaxed">
                  AWS favors the solution that meets the requirement with the least operational overhead, appropriate cost, and managed services.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <strong className="font-semibold block mb-1">Exam Trap Golden Rule:</strong>
              If a question asks for "lowest operational overhead" or "no server management", immediately eliminate options that require provisioning EC2 instances, OS patching, or managing custom software.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

