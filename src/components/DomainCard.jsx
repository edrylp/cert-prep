import React from 'react';
import { 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  FileText 
} from 'lucide-react';

const iconMap = {
  Cloud,
  ShieldCheck,
  Cpu,
  CreditCard
};

export default function DomainCard({ domain, masteredCount = 0, onSelectDomain }) {
  const IconComponent = iconMap[domain.icon] || BookOpen;
  const totalSections = domain.subsections.length;
  const progressPercent = totalSections > 0 ? Math.round((masteredCount / totalSections) * 100) : 0;

  return (
    <div 
      onClick={() => onSelectDomain(domain.id)}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-[#E8E8E6] dark:border-[#2C2C2C] hover:border-[#D0D0CE] dark:hover:border-[#404040] hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${domain.color} border shadow-xs`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#7A7A77] dark:text-[#999999]">
              Domain {domain.number}
            </span>
          </div>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${domain.badgeColor}`}>
            {domain.weight}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#202020] dark:text-[#F3F3F3] tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {domain.shortTitle}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-[#666663] dark:text-[#A0A09D] leading-relaxed line-clamp-3">
          {domain.description}
        </p>

        {/* Key Focus Highlights */}
        <div className="mt-4 pt-3 border-t border-[#F0F0EE] dark:border-[#282828] space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8A86] dark:text-[#888888]">
            Key Exam Focus:
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {domain.keyFocus?.map((focus, idx) => (
              <span 
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#F5F5F3] dark:bg-[#252525] text-[#555552] dark:text-[#B5B5B2] border border-[#EBEBE9] dark:border-[#303030]"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Progress & CTA */}
      <div className="mt-6 pt-4 border-t border-[#F0F0EE] dark:border-[#282828] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#7A7A77] dark:text-[#999999]">
          <CheckCircle2 className={`w-3.5 h-3.5 ${masteredCount > 0 ? 'text-emerald-500' : 'text-gray-400'}`} />
          <span>{masteredCount} of {totalSections} sections mastered</span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
          Review <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

