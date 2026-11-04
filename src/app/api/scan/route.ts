import { NextRequest, NextResponse } from "next/server";
import { scanHtml } from "@/lib/scanner";
import { generateFix } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Aegis-Scanner/1.0 (Accessibility Compliance Bot)",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const result = scanHtml(html, url);

    // Generate AI fixes for each issue
    const issuesWithFixes = await Promise.all(
      result.issues.map(async (issue) => {
        const aiFix = await generateFix({
          rule: issue.rule,
          wcag: issue.wcag,
          element: issue.element,
          description: issue.description,
        });
        return { ...issue, aiFix };
      })
    );

    return NextResponse.json({
      ...result,
      issues: issuesWithFixes,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Scan failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}