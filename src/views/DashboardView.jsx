import React from 'react';
import { 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  CreditCard, 
  Zap, 
  Target, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import DomainCard from '../components/DomainCard';

export default function DashboardView({
  domains = [],
  studyProgress = {},
  onNavigate,
  scenariosCount = 13,
  lightningCount = 50
}) {
  // Calculate total mastery
  let totalSections = 0;
  let masteredSections = 0;
  domains.forEach(d => {
    d.subsections.forEach(s => {
      totalSections++;
      if (studyProgress[s.id]) masteredSections++;
    });
  });
  const overallPercentage = totalSections > 0 ? Math.round((masteredSections / totalSections) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Hero Welcome Notion-style Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#E8E8E6] dark:border-[#2C2C2C] p-6 sm:p-10 shadow-subtle">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-300/40">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              AWS Certified Cloud Practitioner (CLF-C02)
            </span>
            <span className="text-xs text-[#7A7A77] dark:text-[#999996]">
              65 Questions • 90 Mins • Passing Score: 700 / 1000
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F1F1F] dark:text-[#FFFFFF] leading-[1.15]">
            High-Yield Exam Reviewer & Quick Study Hub
          </h1>

          <p className="text-sm sm:text-base text-[#5A5A57] dark:text-[#A0A09D] leading-relaxed">
            Your comprehensive, dynamic study companion parsed directly from <code className="text-xs bg-[#EFEFED] dark:bg-[#282828] text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded font-mono">AWS_CLF-C02_High-Yield_Reviewer.md</code>. Master core concepts, distinguish easily confused services, eliminate distractors, and nail scenario-based questions.
          </p>

          {/* Quick Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate({ view: 'reviewer', domainId: 'domain-1' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Start Domain 1 Review
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onNavigate({ view: 'cheatsheet' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F4F2] dark:bg-[#262626] hover:bg-[#EAEAE8] dark:hover:bg-[#303030] text-[#2C2C2C] dark:text-[#EDEDED] font-semibold text-xs sm:text-sm border border-[#E0E0DE] dark:border-[#383838] transition-all"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              Lightning Cheat Sheet ({lightningCount}+)
            </button>

            <button
              onClick={() => onNavigate({ view: 'strategy' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F4F2] dark:bg-[#262626] hover:bg-[#EAEAE8] dark:hover:bg-[#303030] text-[#2C2C2C] dark:text-[#EDEDED] font-semibold text-xs sm:text-sm border border-[#E0E0DE] dark:border-[#383838] transition-all"
            >
              <Target className="w-4 h-4 text-blue-500" />
              Scenario Strategy
            </button>
          </div>
        </div>

        {/* Progress Snapshot Banner */}
        <div className="mt-8 pt-6 border-t border-[#EAEAE8] dark:border-[#2C2C2C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
              {overallPercentage}%
            </div>
            <div>
              <p className="text-xs font-bold text-[#202020] dark:text-[#FFFFFF]">
                Overall Review Progress
              </p>
              <p className="text-xs text-[#7A7A77] dark:text-[#999996]">
                {masteredSections} of {totalSections} study sections marked as mastered
              </p>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-[#EAEAE8] dark:bg-[#303030] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* The 4 Exam Domains Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202020] dark:text-[#F3F3F3] tracking-tight">
              Exam Domains
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A77] dark:text-[#999996]">
              Structured according to the official CLF-C02 exam blueprint weights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {domains.map(domain => {
            const masteredInDomain = domain.subsections.filter(s => studyProgress[s.id]).length;
            return (
              <DomainCard
                key={domain.id}
                domain={domain}
                masteredCount={masteredInDomain}
                onSelectDomain={(domainId) => onNavigate({ view: 'reviewer', domainId })}
              />
            );
          })}
        </div>
      </div>

      {/* Quick Tools & Memorization Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div 
          onClick={() => onNavigate({ view: 'cheatsheet' })}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/20 border border-amber-200 dark:border-amber-900/50 hover:border-amber-300 dark:hover:border-amber-700 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Rapid Drill
            </span>
          </div>
          <h3 className="font-bold text-base text-[#202020] dark:text-[#FFFFFF] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Keyword Lightning Round
          </h3>
          <p className="text-xs text-[#666663] dark:text-[#999996] mt-1.5 leading-relaxed">
            Scan 50+ exam trigger phrases paired directly with their target AWS services, complete with a Test Recall Mode.
          </p>
        </div>

        <div 
          onClick={() => onNavigate({ view: 'cheatsheet' })}
          className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent dark:from-blue-950/20 border border-blue-200 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Quick Facts
            </span>
          </div>
          <h3 className="font-bold text-base text-[#202020] dark:text-[#FFFFFF] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Key Numbers & Rules
          </h3>
          <p className="text-xs text-[#666663] dark:text-[#999996] mt-1.5 leading-relaxed">
            Directly memorize the 6 Well-Architected Pillars, Security OF vs IN the cloud, root account safety, and pricing rules.
          </p>
        </div>

        <div 
          onClick={() => onNavigate({ view: 'strategy' })}
          className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Strategy
            </span>
          </div>
          <h3 className="font-bold text-base text-[#202020] dark:text-[#FFFFFF] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Scenario Elimination
          </h3>
          <p className="text-xs text-[#666663] dark:text-[#999996] mt-1.5 leading-relaxed">
            Learn the 3-step question breakdown method to filter out distractors and identify the lowest-overhead managed service.
          </p>
        </div>
      </div>
    </div>
  );
}

