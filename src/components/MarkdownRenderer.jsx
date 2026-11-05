import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertTriangle, Lightbulb, Info, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function MarkdownRenderer({ content, searchQuery = '' }) {
  if (!content) return null;

  const components = {
    // Notion-like Headings
    h1: ({ node, children, ...props }) => (
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202020] dark:text-[#FFFFFF] mt-8 mb-4 border-b border-[#EAEAE8] dark:border-[#2D2D2D] pb-3" {...props}>
        {children}
      </h1>
    ),
    h2: ({ node, children, ...props }) => (
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202020] dark:text-[#F0F0F0] mt-8 mb-4 flex items-center gap-2 group" {...props}>
        <span className="text-amber-500 text-lg select-none">§</span>
        <span>{children}</span>
      </h2>
    ),
    h3: ({ node, children, ...props }) => {
      const text = extractText(children);
      const isScenario = text.toLowerCase().startsWith('scenario');
      return (
        <h3 className={`text-base sm:text-lg font-bold tracking-tight mt-6 mb-3 flex items-center gap-2 ${
          isScenario 
            ? 'text-amber-800 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/40 px-3.5 py-2 rounded-xl border border-amber-200 dark:border-amber-900/60 shadow-2xs' 
            : 'text-[#2C2C2C] dark:text-[#EAEAEA]'
        }`} {...props}>
          {isScenario && <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
          <span>{children}</span>
        </h3>
      );
    },

    // Notion-style Callout Blockquotes
    blockquote: ({ node, children, ...props }) => {
      const text = extractText(children);
      const isTrap = /trap|warning|danger/i.test(text);
      const isTip = /tip|remember|goal|trigger/i.test(text);

      let borderClass = 'border-amber-200/80 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 text-[#37352F] dark:text-[#E0E0E0]';
      let IconComponent = Lightbulb;
      let iconColor = 'text-amber-600 dark:text-amber-400';

      if (isTrap) {
        borderClass = 'border-red-200 dark:border-red-900/50 bg-red-50/70 dark:bg-red-950/25 text-red-950 dark:text-red-200';
        IconComponent = AlertTriangle;
        iconColor = 'text-red-500';
      } else if (!isTip) {
        borderClass = 'border-[#E3E2E0] dark:border-[#333333] bg-[#F7F6F3] dark:bg-[#1F1F1F] text-[#474540] dark:text-[#C5C5C5]';
        IconComponent = Info;
        iconColor = 'text-blue-500';
      }

      return (
        <div className={`my-4 p-4 rounded-xl border flex items-start gap-3 text-sm leading-relaxed ${borderClass}`}>
          <div className="mt-0.5 shrink-0">
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="flex-1 space-y-1 overflow-hidden [&>p]:m-0">
            {children}
          </div>
        </div>
      );
    },

    // Responsive Notion-style Tables
    table: ({ node, children, ...props }) => (
      <div className="my-5 w-full rounded-xl border border-[#E3E2E0] dark:border-[#2C2C2C] bg-white dark:bg-[#1A1A1A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]" {...props}>
            {children}
          </table>
        </div>
        <div className="sm:hidden px-3 py-1.5 bg-[#FAF9F7] dark:bg-[#202020] border-t border-[#EAEAE8] dark:border-[#282828] text-[10px] text-[#888888] flex items-center justify-between">
          <span>Swipe horizontally to view full table</span>
          <span className="font-mono">↔</span>
        </div>
      </div>
    ),
    thead: ({ node, children, ...props }) => (
      <thead className="bg-[#F7F6F3] dark:bg-[#202020] text-[11px] sm:text-xs uppercase tracking-wider text-[#6B6B67] dark:text-[#9A9A96] font-semibold border-b border-[#E3E2E0] dark:border-[#2C2C2C]" {...props}>
        {children}
      </thead>
    ),
    th: ({ node, children, ...props }) => {
      const text = extractText(children);
      const isKeywordCol = /trigger|keyword|clue|remember/i.test(text);

      return (
        <th className={`px-4 py-3 whitespace-nowrap ${isKeywordCol ? 'text-amber-700 dark:text-amber-400' : ''}`} {...props}>
          {children}
        </th>
      );
    },
    tbody: ({ node, children, ...props }) => (
      <tbody className="divide-y divide-[#EFEFED] dark:divide-[#262626]" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ node, children, ...props }) => (
      <tr className="hover:bg-[#FAFAF9] dark:hover:bg-[#222222] transition-colors" {...props}>
        {children}
      </tr>
    ),
    td: ({ node, children, ...props }) => {
      const text = extractText(children);
      const isExamHighlight = /→|lift-and-shift|least privilege|multi-tenant|serverless|interruptible/i.test(text);

      return (
        <td className="px-4 py-3 align-top text-[#37352F] dark:text-[#D4D4D4] leading-relaxed" {...props}>
          {isExamHighlight ? (
            <span className="font-medium text-[#202020] dark:text-[#F3F3F3]">
              {children}
            </span>
          ) : (
            children
          )}
        </td>
      );
    },

    // Code & Inline Code
    code: ({ node, inline, className, children, ...props }) => {
      return (
        <code className="bg-[#EFEFED] dark:bg-[#2A2A2A] text-[#D9383A] dark:text-[#F87171] font-mono text-xs px-1.5 py-0.5 rounded border border-[#E3E2E0] dark:border-[#383838]" {...props}>
          {children}
        </code>
      );
    },

    // Notion-like Bold highlighting
    strong: ({ node, children, ...props }) => {
      const text = extractText(children);
      const isExamTrap = text.toLowerCase().includes('exam trap');
      const isTrigger = text.toLowerCase().includes('trigger') || text.toLowerCase().includes('keyword');

      if (isExamTrap) {
        return (
          <span className="inline-flex items-center gap-1 font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-900/50">
            <AlertTriangle className="w-3.5 h-3.5" />
            {children}
          </span>
        );
      }

      if (isTrigger) {
        return (
          <span className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
            {children}
          </span>
        );
      }

      return (
        <strong className="font-semibold text-[#1F1F1F] dark:text-[#F0F0F0]" {...props}>
          {children}
        </strong>
      );
    },

    // Lists
    ul: ({ node, children, ...props }) => (
      <ul className="my-3 space-y-2 list-disc pl-5 marker:text-amber-500" {...props}>
        {children}
      </ul>
    ),
    ol: ({ node, children, ...props }) => (
      <ol className="my-3 space-y-2 list-decimal pl-5 marker:text-amber-500" {...props}>
        {children}
      </ol>
    ),
    li: ({ node, children, ...props }) => (
      <li className="text-[#37352F] dark:text-[#D4D4D4] leading-relaxed text-sm sm:text-base pl-1" {...props}>
        {children}
      </li>
    ),

    // Paragraph
    p: ({ node, children, ...props }) => {
      const text = extractText(children);
      if (text.startsWith('Exam trap:')) {
        return (
          <div className="my-3 p-3.5 bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs sm:text-sm text-red-900 dark:text-red-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{children}</div>
          </div>
        );
      }
      if (text.startsWith('Trigger words:')) {
        return (
          <div className="my-3 p-3.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{children}</div>
          </div>
        );
      }
      return (
        <p className="my-2.5 text-[#37352F] dark:text-[#D4D4D4] leading-relaxed text-xs sm:text-sm md:text-base" {...props}>
          {children}
        </p>
      );
    },

    // Horizontal Rule
    hr: ({ node, ...props }) => (
      <hr className="my-8 border-[#EAEAE8] dark:border-[#2C2C2C]" {...props} />
    )
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

function extractText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (children && children.props && children.props.children) {
    return extractText(children.props.children);
  }
  return '';
}
