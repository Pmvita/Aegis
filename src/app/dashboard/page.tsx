"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [sites] = useState([
    { name: "canada.ca/en", score: 72, issues: 23, lastScan: "2 hours ago", status: "warning" },
    { name: "servicecanada.gc.ca", score: 85, issues: 8, lastScan: "1 day ago", status: "good" },
    { name: "immigration.gc.ca", score: 58, issues: 41, lastScan: "3 days ago", status: "critical" },
    { name: "rcmp-grc.gc.ca", score: 91, issues: 3, lastScan: "5 hours ago", status: "good" },
    { name: "veterans.gc.ca", score: 64, issues: 31, lastScan: "1 week ago", status: "warning" },
  ]);

  const getStatusColor = (status: string) => {
    if (status === "good") return "text-success";
    if (status === "warning") return "text-warning";
    return "text-danger";
  };

  const getStatusBg = (status: string) => {
    if (status === "good") return "bg-green-100 dark:bg-green-900/30";
    if (status === "warning") return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const avgScore = Math.round(sites.reduce((a, b) => a + b.score, 0) / sites.length);
  const totalIssues = sites.reduce((a, b) => a + b.issues, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-primary mb-2">
          Compliance Dashboard
        </h1>
        <p className="text-muted">
          Real-time accessibility and bilingual compliance status across department properties
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted mb-1">Average Score</div>
          <div className={`text-3xl font-bold font-display ${avgScore >= 80 ? "text-success" : avgScore >= 60 ? "text-warning" : "text-danger"}`}>
            {avgScore}/100
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted mb-1">Properties Monitored</div>
          <div className="text-3xl font-bold font-display text-primary">{sites.length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted mb-1">Total Open Issues</div>
          <div className="text-3xl font-bold font-display text-danger">{totalIssues}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted mb-1">Compliant Properties</div>
          <div className="text-3xl font-bold font-display text-success">
            {sites.filter((s) => s.score >= 80).length}/{sites.length}
          </div>
        </div>
      </div>

      {/* Sites Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-display text-xl font-bold text-primary">Monitored Properties</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Open Issues</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Last Scan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sites.map((site, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-sm font-medium">{site.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${getStatusColor(site.status)}`}>
                      {site.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{site.issues}</td>
                  <td className="px-6 py-4 text-sm text-muted">{site.lastScan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBg(site.status)} ${getStatusColor(site.status)}`}>
                      {site.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a href="/scan" className="text-sm text-primary hover:underline">
                      Rescan
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Trend */}
      <div className="mt-8 bg-card border border-border rounded-xl p-8">
        <h2 className="font-display text-xl font-bold text-primary mb-4">Compliance Trend</h2>
        <div className="h-48 flex items-end gap-2">
          {[58, 62, 65, 70, 68, 72, 75, 78, 74, 80, 77, 82].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-primary rounded-t"
                style={{ height: `${val}%` }}
              />
              <span className="text-xs text-muted">M{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}