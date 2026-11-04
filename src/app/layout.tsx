import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis — AI-Powered Accessibility & Compliance for Government",
  description:
    "Automated WCAG 2.1 AA accessibility scanning, bilingual parity checking, and AI-generated fix patches for Canadian federal government digital services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
                Skip to main content
              </a>
              <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-display">A</span>
                </div>
                <span className="font-display font-bold text-xl text-primary">Aegis</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/scan" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                  Scanner
                </Link>
                <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link
                  href="/scan"
                  className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition-colors"
                >
                  Start Scan
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main id="main-content">{children}</main>
        <footer className="border-t border-border mt-24 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted">
            <p>Aegis — AI-Powered Accessibility & Compliance for Canadian Government Digital Services</p>
            <p className="mt-1">Built for the Government of Canada procurement ecosystem</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
