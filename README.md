# Aegis — AI-Powered Accessibility & Compliance Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?logo=vercel)](https://aegis-seven-theta.vercel.app)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1_AA-16a34a)](https://www.w3.org/TR/WCAG21/)

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

## License

MIT
