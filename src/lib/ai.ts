// AI-powered fix generation using OpenAI API

export async function generateFix(issue: {
  rule: string;
  wcag: string;
  element: string;
  description: string;
}): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return generateFallbackFix(issue);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an accessibility expert. Given a WCAG violation, provide a concise, actionable code fix. Return only the fixed code snippet or specific instruction, no explanation.",
          },
          {
            role: "user",
            content: `WCAG ${issue.wcag} violation: ${issue.description}\nElement: ${issue.element}\nRule: ${issue.rule}\nProvide the fix:`,
          },
        ],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      return generateFallbackFix(issue);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateFallbackFix(issue);
  } catch {
    return generateFallbackFix(issue);
  }
}

function generateFallbackFix(issue: { rule: string; description: string }): string {
  const fixes: Record<string, string> = {
    "image-alt": 'Add alt attribute: <img src="..." alt="Descriptive text about the image" />',
    "heading-order": "Restructure headings to follow sequential order (h1 → h2 → h3)",
    "form-label": 'Add label: <label for="input-id">Label text</label><input id="input-id" />',
    "color-contrast": "Update CSS: color: #1e293b; (ensures 4.5:1 contrast on white background)",
    "link-name": 'Replace "Click here" with descriptive text: <a href="...">View program details</a>',
    "html-lang": 'Add to <html> tag: lang="en" (or lang="fr" for French)',
    "skip-link": 'Add before main nav: <a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>',
    "landmark-regions": "Replace <div> wrappers with semantic elements: <header>, <nav>, <main>, <footer>",
    "focus-visible": "Add CSS: *:focus-visible { outline: 2px solid #1e3a5f; outline-offset: 2px; }",
  };
  return fixes[issue.rule] || "Review and fix according to WCAG 2.1 guidelines";
}

export async function generateBilingualFix(content: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "Provide French translation equivalent. Ensure meaning, tone, and legal accuracy are preserved. Use proper Canadian French (fr-CA).";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a Canadian government bilingual content specialist. Translate English government content to proper Canadian French (fr-CA). Preserve legal accuracy, formal tone, and government terminology.",
          },
          {
            role: "user",
            content: `Translate to Canadian French (fr-CA): "${content}"`,
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      return "Provide French translation equivalent. Ensure meaning, tone, and legal accuracy are preserved.";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Provide French translation equivalent.";
  } catch {
    return "Provide French translation equivalent. Ensure meaning, tone, and legal accuracy are preserved.";
  }
}