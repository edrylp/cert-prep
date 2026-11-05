# AWS Certified Cloud Practitioner (CLF-C02) Study Reviewer

A clean, responsive, and modern study dashboard inspired by Notion to prepare for the **AWS Certified Cloud Practitioner (CLF-C02)** exam.

---

## Features

- **Dashboard / Home**:
  - Exam overview with passing score (700/1000) and time limit (90 mins).
  - 4 Domain Cards with official exam weights (24%, 30%, 34%, 12%), descriptions, and key exam focus tags.
  - Overall exam readiness progress bar (persisted in `localStorage`).

- **Reviewer**:
  - Full Markdown rendering with preserved headings, tables, lists, and bold text.
  - Organized by the 4 official CLF-C02 domains.
  - Collapsible section accordions with an **Expand / Collapse All** button.
  - Section mastery tracking ("Mark as Mastered") with progress indicators.
  - Responsive tables with horizontal swipe support for mobile.
  - Notion-style callout blocks for `Exam trap:` and `Trigger words:`.
  - In-domain filter search for quickly finding specific topics.

- **Quick Review / Cheat Sheet**:
  - **Service Keyword Lightning Round** (64+ exam scenario trigger words mapped to AWS services).
  - Category filters: *Compute*, *Storage*, *Database*, *Networking*, *Security*, *Cost*, *AI/ML*, *Integration*, *Developer Tools*.
  - **Test Recall Mode**: Hides/reveals answers so you can quiz yourself before test day.
  - **Key Numbers & Facts**: 14 crucial architectural rules worth memorizing.
  - **Exam Strategy**: 3-step distractor elimination framework for scenario questions.

- **Global Search (`Ctrl+K` or `/`)**:
  - Instant fuzzy search across all 4 domains, subsections, topics, lightning round triggers, and scenarios.
  - Direct 1-click jump to the matching section.

- **Design**:
  - Notion-inspired minimal typography and color palette.
  - Mobile-first responsive drawer sidebar.
  - Dark mode and light mode toggle.

---

## Tech Stack
- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **react-markdown** + **remark-gfm**

---

## Running the App

```bash
# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

