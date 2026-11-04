// Accessibility scanner engine
// Checks for common WCAG 2.1 AA violations

export interface ScanIssue {
  id: string;
  rule: string;
  severity: "critical" | "major" | "minor";
  wcag: string;
  element: string;
  description: string;
  fix: string;
}

export interface ScanResult {
  url: string;
  scannedAt: string;
  score: number;
  totalIssues: number;
  critical: number;
  major: number;
  minor: number;
  issues: ScanIssue[];
  bilingual: {
    enElements: number;
    frElements: number;
    parityScore: number;
    missingTranslations: string[];
  };
}

export function scanHtml(html: string, url: string): ScanResult {
  const issues: ScanIssue[] = [];
  let issueId = 0;

  // Image alt text check
  const imgRegex = /<img[^>]*>/gi;
  const imgs = html.match(imgRegex) || [];
  imgs.forEach((img) => {
    if (!img.includes("alt=") || img.match(/alt=["']\s*["']/)) {
      issues.push({
        id: `issue-${++issueId}`,
        rule: "image-alt",
        severity: "critical",
        wcag: "1.1.1",
        element: img.substring(0, 120),
        description: "Image missing alt text or has empty alt attribute",
        fix: 'Add descriptive alt attribute: alt="Description of the image content"',
      });
    }
  });

  // Heading hierarchy check
  const headings = html.match(/<h[1-6][^>]*>/gi) || [];
  let lastLevel = 0;
  headings.forEach((h) => {
    const level = parseInt(h.charAt(2));
    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({
        id: `issue-${++issueId}`,
        rule: "heading-order",
        severity: "major",
        wcag: "1.3.1",
        element: h.substring(0, 80),
        description: `Heading level skipped from h${lastLevel} to h${level}`,
        fix: `Use h${lastLevel + 1} instead of h${level} to maintain proper document outline`,
      });
    }
    lastLevel = level;
  });

  // Form label check
  const inputs = html.match(/<input[^>]*>/gi) || [];
  inputs.forEach((input) => {
    if (
      !input.includes("aria-label") &&
      !input.includes("aria-labelledby") &&
      !input.includes("id=")
    ) {
      issues.push({
        id: `issue-${++issueId}`,
        rule: "form-label",
        severity: "critical",
        wcag: "1.3.1",
        element: input.substring(0, 120),
        description: "Form input missing associated label",
        fix: 'Add a <label> element with for attribute matching input id, or add aria-label',
      });
    }
  });

  // Color contrast (basic check for inline styles)
  const lowContrastPatterns = [
    /color:\s*#(?:9|a|b|c|d|e|f)[0-9a-f]{5}/gi,
    /color:\s*gray/gi,
    /color:\s*lightgray/gi,
  ];
  lowContrastPatterns.forEach((pattern) => {
    const matches = html.match(pattern) || [];
    matches.forEach((m) => {
      issues.push({
        id: `issue-${++issueId}`,
        rule: "color-contrast",
        severity: "major",
        wcag: "1.4.3",
        element: m,
        description: "Potential insufficient color contrast (below 4.5:1 ratio)",
        fix: "Increase contrast ratio to at least 4.5:1 for normal text, 3:1 for large text",
      });
    });
  });

  // Link text check
  const links = html.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
  links.forEach((link) => {
    const text = link.replace(/<[^>]*>/g, "").trim();
    if (
      text.toLowerCase() === "click here" ||
      text.toLowerCase() === "read more" ||
      text.toLowerCase() === "learn more" ||
      text === ""
    ) {
      issues.push({
        id: `issue-${++issueId}`,
        rule: "link-name",
        severity: "major",
        wcag: "2.4.4",
        element: link.substring(0, 120),
        description: "Link text is not descriptive or is empty",
        fix: "Use descriptive link text that makes sense out of context",
      });
    }
  });

  // Language attribute check
  if (!html.includes('lang="') && !html.includes("lang='")) {
    issues.push({
      id: `issue-${++issueId}`,
      rule: "html-lang",
      severity: "critical",
      wcag: "3.1.1",
      element: "<html>",
      description: "HTML element missing lang attribute",
      fix: 'Add lang attribute to html element: <html lang="en">',
    });
  }

  // Skip navigation check
  if (!html.includes("skip") && !html.includes("Skip")) {
    issues.push({
      id: `issue-${++issueId}`,
      rule: "skip-link",
      severity: "major",
      wcag: "2.4.1",
      element: "<body>",
      description: "No skip navigation link found",
      fix: 'Add a skip link at the top of the page: <a href="#main-content" class="skip-link">Skip to main content</a>',
    });
  }

  // ARIA role check
  const rolePattern = /role=["'](button|link|navigation|main|banner|contentinfo)["']/gi;
  const roles = html.match(rolePattern) || [];
  if (roles.length === 0 && !html.includes("<nav") && !html.includes("<main")) {
    issues.push({
      id: `issue-${++issueId}`,
      rule: "landmark-regions",
      severity: "minor",
      wcag: "1.3.1",
      element: "<body>",
      description: "No landmark regions (nav, main, header, footer) found",
      fix: "Use semantic HTML elements: <header>, <nav>, <main>, <footer>",
    });
  }

  // Focus indicator check
  if (!html.includes(":focus") && !html.includes("focus-visible") && !html.includes("focus:")) {
    issues.push({
      id: `issue-${++issueId}`,
      rule: "focus-visible",
      severity: "major",
      wcag: "2.4.7",
      element: "CSS",
      description: "No visible focus indicator styles found",
      fix: "Add focus styles: :focus-visible { outline: 2px solid #005fcc; outline-offset: 2px; }",
    });
  }

  // Bilingual parity check
  const enMatches = html.match(/lang=["']en["']/gi) || [];
  const frMatches = html.match(/lang=["']fr["']/gi) || [];
  const enElements = (html.match(/<[^>]*lang=["']en["'][^>]*>/gi) || []).length;
  const frElements = (html.match(/<[^>]*lang=["']fr["'][^>]*>/gi) || []).length;

  const missingTranslations: string[] = [];
  // Check for common English-only patterns
  const englishOnlyTerms = ["Submit", "Cancel", "Search", "Home", "About", "Contact", "Login"];
  englishOnlyTerms.forEach((term) => {
    if (html.includes(term) && !html.includes(term.toLowerCase().replace(/\s/g, "-"))) {
      // Simplified check
    }
  });

  // Check for hreflang
  if (!html.includes('hreflang=') && !html.includes('alternate')) {
    missingTranslations.push("No hreflang/alternate language links found");
  }

  const parityScore = Math.max(0, 100 - missingTranslations.length * 15 - (enElements > 0 && frElements === 0 ? 30 : 0));

  const critical = issues.filter((i) => i.severity === "critical").length;
  const major = issues.filter((i) => i.severity === "major").length;
  const minor = issues.filter((i) => i.severity === "minor").length;

  const score = Math.max(0, 100 - critical * 10 - major * 5 - minor * 2);

  return {
    url,
    scannedAt: new Date().toISOString(),
    score,
    totalIssues: issues.length,
    critical,
    major,
    minor,
    issues,
    bilingual: {
      enElements: enElements || 1,
      frElements,
      parityScore,
      missingTranslations,
    },
  };
}