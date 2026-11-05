import React, { useState } from 'react';
import { 
  Target, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ChevronRight,
  ShieldAlert,
  Zap
} from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function StrategyView({ examStrategyContent, allScenarios = [], onNavigate }) {
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');
  const [revealedScenarios, setRevealedScenarios] = useState(new Set());

  const toggleScenario = (id) => {
    setRevealedScenarios(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredScenarios = allScenarios.filter(sc => {
    if (selectedDomainFilter === 'All') return true;
    return `domain-${sc.domainNumber}` === selectedDomainFilter;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            Official Exam Blueprint
          </span>
          <span className="text-xs text-[#7A7A77] dark:text-[#999996]">
            Eliminate Distractors & Save Time
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1F1F1F] dark:text-[#FFFFFF] tracking-tight">
          Exam Strategy: How to Answer Scenario Questions
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5A57] dark:text-[#A0A09D] max-w-3xl">
          AWS Certified Cloud Practitioner scenario questions follow predictable patterns. Apply this 3-step decision framework to pinpoint the correct AWS service without second-guessing.
        </p>
      </div>

      {/* The 3-Step Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold text-base flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-900/50">
              1
            </div>
            <h3 className="font-bold text-base text-[#1F1F1F] dark:text-[#FFFFFF] mb-2">
              Identify the Requirement
            </h3>
            <p className="text-xs text-[#666663] dark:text-[#A0A09D] leading-relaxed mb-4">
              Determine the core objective the question is solving:
            </p>
            <ul className="text-xs text-[#444441] dark:text-[#CCCCCC] space-y-1.5">
              <li className="flex items-center gap-2">• Lowest cost vs. Highest availability</li>
              <li className="flex items-center gap-2">• Least operational effort / overhead</li>
              <li className="flex items-center gap-2">• Security, audit & compliance</li>
              <li className="flex items-center gap-2">• Migration or Global content delivery</li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 font-bold text-base flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-900/50">
              2
            </div>
            <h3 className="font-bold text-base text-[#1F1F1F] dark:text-[#FFFFFF] mb-2">
              Identify the Trigger Words
            </h3>
            <p className="text-xs text-[#666663] dark:text-[#A0A09D] leading-relaxed mb-4">
              AWS scenario questions embed keyword anchors that directly map to services:
            </p>
            <ul className="text-xs text-[#444441] dark:text-[#CCCCCC] space-y-1.5 font-mono">
              <li>• "Without managing servers" → <strong className="text-amber-600 dark:text-amber-400 font-sans">Serverless / Lambda</strong></li>
              <li>• "Relational database" → <strong className="text-amber-600 dark:text-amber-400 font-sans">RDS</strong></li>
              <li>• "Spare capacity, interruptible" → <strong className="text-amber-600 dark:text-amber-400 font-sans">Spot</strong></li>
              <li>• "API activity / audit" → <strong className="text-amber-600 dark:text-amber-400 font-sans">CloudTrail</strong></li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 font-bold text-base flex items-center justify-center mb-4 border border-emerald-200 dark:border-emerald-900/50">
              3
            </div>
            <h3 className="font-bold text-base text-[#1F1F1F] dark:text-[#FFFFFF] mb-2">
              Eliminate Overkill Solutions
            </h3>
            <p className="text-xs text-[#666663] dark:text-[#A0A09D] leading-relaxed mb-4">
              Eliminate solutions that do more work than necessary:
            </p>
            <ul className="text-xs text-[#444441] dark:text-[#CCCCCC] space-y-1.5">
              <li className="flex items-center gap-2">• Eliminate EC2 if a managed service solves it</li>
              <li className="flex items-center gap-2">• Eliminate custom code if AWS tool exists</li>
              <li className="flex items-center gap-2">• Choose the answer with least maintenance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trap Warning Callout */}
      <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3.5">
        <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-bold">Golden Examination Rule:</strong> AWS exam questions favor the solution that meets the requirements with the <em>least operational overhead, appropriate cost, and managed service</em>. If a question asks for minimum maintenance, never choose to build and patch your own server when a managed AWS service is listed.
        </div>
      </div>

      {/* Real Scenario Breakdowns from Reviewer */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F1F1F] dark:text-[#FFFFFF] tracking-tight">
              Curated Exam Scenarios from Reviewer
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A77] dark:text-[#999996]">
              Practice applying the 3-step framework to real scenarios across all 4 domains
            </p>
          </div>

          {/* Domain Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'domain-1', 'domain-2', 'domain-3', 'domain-4'].map(dKey => {
              const label = dKey === 'All' ? 'All Domains' : `Domain ${dKey.replace('domain-', '')}`;
              return (
                <button
                  key={dKey}
                  onClick={() => setSelectedDomainFilter(dKey)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedDomainFilter === dKey
                      ? 'bg-[#202020] text-white dark:bg-[#FFFFFF] dark:text-[#181818]'
                      : 'bg-white dark:bg-[#202020] text-[#666663] dark:text-[#999996] border border-[#E8E8E6] dark:border-[#2C2C2C] hover:bg-[#F2F2F0]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scenarios List */}
        <div className="space-y-4">
          {filteredScenarios.map((sc, idx) => {
            const isRevealed = revealedScenarios.has(sc.id);

            return (
              <div 
                key={sc.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] shadow-subtle space-y-4 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40">
                    Domain {sc.domainNumber}: {sc.domainTitle}
                  </span>

                  <button
                    onClick={() => onNavigate({ view: 'reviewer', domainId: `domain-${sc.domainNumber}` })}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    View in Domain Reviewer <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-[#1F1F1F] dark:text-[#F3F3F3]">
                  {sc.title}
                </h3>

                <div className="pt-2 border-t border-[#F0F0EE] dark:border-[#282828]">
                  <MarkdownRenderer content={sc.body} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

