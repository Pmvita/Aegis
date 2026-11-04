export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-8">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Built for the Government of Canada
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              Aegis
              <br />
              <span className="text-accent">Accessibility & Compliance</span>
              <br />
              <span className="text-3xl lg:text-4xl font-normal text-muted">
                AI-Powered. Government-Ready.
              </span>
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-10">
              Automated WCAG 2.1 AA scanning, bilingual parity checking, and AI-generated
              fix patches for Canadian federal government digital services. Meet the
              Accessible Canada Act requirements — continuously, not just at audit time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/scan"
                className="px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors text-lg"
              >
                Start Free Scan
              </a>
              <a
                href="/dashboard"
                className="px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-card transition-colors text-lg"
              >
                View Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">
              The Problem
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Canadian federal departments face a compliance crisis. The Accessible Canada
              Act mandates WCAG 2.1 AA. Official Languages Act requires bilingual parity.
              Most departments fail both.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "70%",
                label: "of government websites fail WCAG 2.1 AA",
                detail: "Manual audits are point-in-time and outdated within weeks",
              },
              {
                stat: "30 days",
                label: "legal response deadline for ATIP requests",
                detail: "Backlogs cost departments millions in penalties and public trust",
              },
              {
                stat: "2x",
                label: "effort to maintain bilingual parity",
                detail: "French versions are often outdated or machine-translated",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 bg-background rounded-xl border border-border">
                <div className="text-4xl font-bold font-display text-accent mb-2">{item.stat}</div>
                <div className="font-medium mb-2">{item.label}</div>
                <div className="text-sm text-muted">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">
              What Aegis Does
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automated WCAG Scanning",
                desc: "Continuous scanning for WCAG 2.1 AA violations. Not point-in-time audits — ongoing monitoring with alerts.",
                icon: "🔍",
              },
              {
                title: "Bilingual Parity Checking",
                desc: "Detects when French versions fall behind English. Flags missing translations and content drift.",
                icon: "🌐",
              },
              {
                title: "AI-Generated Fix Patches",
                desc: "Not just reports — actual code fixes. AI generates the patch, you review and apply.",
                icon: "🤖",
              },
              {
                title: "Compliance Dashboard",
                desc: "Deputy-minister-ready dashboards showing compliance status across all department properties.",
                icon: "📊",
              },
              {
                title: "Audit-Ready Reports",
                desc: "Auto-generate compliance reports for Treasury Board, Parliament, and internal audits.",
                icon: "📋",
              },
              {
                title: "Continuous Monitoring",
                desc: "Alerts when new violations appear after deployments. Catch regressions before audits do.",
                icon: "🔔",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-bold text-lg text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-primary mb-4">
            Ready to make your digital services compliant?
          </h2>
          <p className="text-muted mb-8">
            Scan your first URL in 30 seconds. No signup required.
          </p>
          <a
            href="/scan"
            className="inline-block px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors text-lg"
          >
            Start Free Scan
          </a>
        </div>
      </section>
    </div>
  );
}
