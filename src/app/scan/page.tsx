"use client";

import { useState } from "react";

interface ScanIssue {
  id: string;
  rule: string;
  severity: "critical" | "major" | "minor";
  wcag: string;
  element: string;
  description: string;
  fix: string;
  aiFix?: string;
}

interface ScanResult {
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

export default function ScanPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<(ScanResult & { issues: (ScanResult["issues"][0] & { aiFix?: string })[] }) | null>(null);
  const [error, setError] = useState("");

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Scan failed");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getSeverityBadge = (severity: string) => {
    const colors: Record<string, string> = {
      critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      major: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      minor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    };
    return colors[severity] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-primary mb-4">
          Accessibility Scanner
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Enter any URL to scan for WCAG 2.1 AA violations. Get AI-generated fix patches
          and bilingual compliance reports.
        </p>
      </div>

      <form onSubmit={handleScan} className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.gc.ca"
            aria-label="URL to scan"
            className="flex-1 px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="scanning inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Scanning...
              </>
            ) : (
              "Scan Now"
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-8 animate-slide-up">
          {/* Score Card */}
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className={`text-6xl font-bold font-display ${getScoreColor(result.score)}`}>
                  {result.score}
                </div>
                <div className="text-sm text-muted mt-1">Accessibility Score</div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-danger">{result.critical}</div>
                  <div className="text-xs text-muted">Critical</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{result.major}</div>
                  <div className="text-xs text-muted">Major</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary-light">{result.minor}</div>
                  <div className="text-xs text-muted">Minor</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted">
              Scanned: {result.url} — {new Date(result.scannedAt).toLocaleString()}
            </div>
          </div>

          {/* Bilingual Parity */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-2xl font-bold text-primary mb-4">
              Bilingual Parity Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary">{result.bilingual.enElements}</div>
                <div className="text-xs text-muted">English Elements</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary">{result.bilingual.frElements}</div>
                <div className="text-xs text-muted">French Elements</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className={`text-2xl font-bold ${result.bilingual.parityScore >= 70 ? "text-success" : "text-danger"}`}>
                  {result.bilingual.parityScore}%
                </div>
                <div className="text-xs text-muted">Parity Score</div>
              </div>
            </div>
            {result.bilingual.missingTranslations.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium text-warning mb-2">Issues Found:</p>
                <ul className="text-sm text-muted list-disc list-inside">
                  {result.bilingual.missingTranslations.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Issues List */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Issues Found ({result.totalIssues})
            </h2>
            <div className="space-y-6">
              {result.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getSeverityBadge(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-muted">WCAG {issue.wcag}</span>
                      <span className="text-xs text-muted">{issue.rule}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{issue.description}</p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 mb-3">
                    <p className="text-xs font-mono text-muted break-all">{issue.element}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                    <p className="text-xs font-medium text-success mb-1">AI-Generated Fix:</p>
                    <p className="text-sm font-mono">{issue.aiFix || issue.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}