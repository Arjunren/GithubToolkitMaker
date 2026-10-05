export const LIMITS = {
  shortText: 500,
  longText: 50_000,
  tableRows: 50,
  tableColumns: 20,
  listItems: 100,
  builderSections: 50,
} as const;

export function cleanText(
  value: string,
  max: number = LIMITS.shortText,
): string {
  return value.replaceAll("\0", "").slice(0, max);
}

export function isSafeMarkdownUrl(value: string): boolean {
  const url = value.trim();
  if (!url || url.length > 2_048 || /[\u0000-\u001F\u007F]/.test(url))
    return false;
  if (/^(?:javascript|vbscript|data|file):/i.test(url)) return false;
  if (/^(?:https?:|mailto:)/i.test(url)) {
    try {
      const parsed = new URL(url);
      return ["http:", "https:", "mailto:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
  return /^(?:\.{0,2}\/|\/|#|[A-Za-z0-9_-])/.test(url) && !url.includes("\\");
}

export function safeUrl(value: string): string {
  const url = cleanText(value, 2_048).trim();
  if (!isSafeMarkdownUrl(url))
    throw new Error("Enter a valid http(s), mailto, anchor, or relative URL.");
  return url.replaceAll(" ", "%20");
}
