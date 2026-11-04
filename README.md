# Aegis — AI-Powered Accessibility & Compliance Platform

Automated WCAG 2.1 AA accessibility scanning, bilingual parity checking, and AI-generated fix patches for Canadian federal government digital services.

## Features

- **Automated WCAG Scanning** — Continuous scanning for WCAG 2.1 AA violations
- **Bilingual Parity Checking** — Detects when French versions fall behind English
- **AI-Generated Fix Patches** — Actual code fixes, not just reports
- **Compliance Dashboard** — Deputy-minister-ready status dashboards
- **Audit-Ready Reports** — Auto-generate reports for Treasury Board and Parliament

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Cheerio (HTML parsing)
- OpenAI API (AI fix generation)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```
OPENAI_API_KEY=your_key_here  # Optional — enables AI fix generation
```

Without an API key, Aegis uses built-in fallback fixes.

## Government Procurement Fit

- **AI Source List** — Cognitive automation category
- **SaaS Supply Arrangement** — Protected B level
- **Buy Canadian Policy** — Canadian vendor priority
- **Budget 2025** — $25.2B modernization funding alignment

## License

MIT
