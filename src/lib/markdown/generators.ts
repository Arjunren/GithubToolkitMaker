import type {
  AlertType,
  ListItem,
  TableInput,
  TaskItem,
} from "@/types/markdown";
import { cleanText, LIMITS, safeUrl } from "@/lib/validation";

const escapeLabel = (value: string) =>
  cleanText(value).replace(/([\\\[\]])/g, "\\$1");
const escapeTitle = (value: string) => cleanText(value).replaceAll('"', '\\"');
const tableCell = (value: string) =>
  cleanText(value, 2_000).replaceAll("|", "\\|").replace(/\r?\n/g, "<br>");

export function generateHeading(text: string, level: number): string {
  const safeLevel = Math.min(6, Math.max(1, Math.trunc(level)));
  return `${"#".repeat(safeLevel)} ${cleanText(text).trim()}`.trim();
}

export function generateFormattedText(
  text: string,
  style: "bold" | "italic" | "bold-italic" | "strike" | "code",
): string {
  const value = cleanText(text);
  const wrappers = {
    bold: ["**", "**"],
    italic: ["_", "_"],
    "bold-italic": ["***", "***"],
    strike: ["~~", "~~"],
    code: ["`", "`"],
  } as const;
  const [before, after] = wrappers[style];
  return `${before}${style === "code" ? value.replaceAll("`", "\\`") : value}${after}`;
}

export function generateLink(
  text: string,
  url: string,
  title?: string,
): string {
  const suffix = title?.trim() ? ` "${escapeTitle(title.trim())}"` : "";
  return `[${escapeLabel(text)}](${safeUrl(url)}${suffix})`;
}

export function generateImage(
  alt: string,
  url: string,
  title?: string,
): string {
  const suffix = title?.trim() ? ` "${escapeTitle(title.trim())}"` : "";
  return `![${escapeLabel(alt)}](${safeUrl(url)}${suffix})`;
}

export function generateTable(input: TableInput): string {
  const count = Math.min(input.headers.length, LIMITS.tableColumns);
  if (count < 1) throw new Error("Add at least one table column.");
  const headers = input.headers.slice(0, count).map(tableCell);
  const divider = input.alignments
    .slice(0, count)
    .map((alignment) =>
      alignment === "center"
        ? ":---:"
        : alignment === "right"
          ? "---:"
          : ":---",
    );
  while (divider.length < count) divider.push(":---");
  const rows = input.rows
    .slice(0, LIMITS.tableRows)
    .map((row) =>
      row
        .slice(0, count)
        .concat(Array(count).fill(""))
        .slice(0, count)
        .map(tableCell),
    );
  return [headers, divider, ...rows]
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");
}

export function generateCodeBlock(language: string, code: string): string {
  const lang = cleanText(language, 40).replace(/[^a-zA-Z0-9_+#.-]/g, "");
  const value = cleanText(code, LIMITS.longText).replace(/\n+$/, "");
  const longest = Math.max(
    0,
    ...Array.from(value.matchAll(/`+/g), (match) => match[0].length),
  );
  const fence = "`".repeat(Math.max(3, longest + 1));
  return `${fence}${lang}\n${value}\n${fence}`;
}

export function generateList(items: ListItem[], ordered = false): string {
  return items
    .slice(0, LIMITS.listItems)
    .map(
      (item, index) =>
        `${"  ".repeat(Math.min(4, Math.max(0, item.depth)))}${ordered ? `${index + 1}.` : "-"} ${cleanText(item.text, 2_000)}`,
    )
    .join("\n");
}

export function generateTaskList(items: TaskItem[]): string {
  return items
    .slice(0, LIMITS.listItems)
    .map(
      (item) =>
        `${"  ".repeat(Math.min(4, Math.max(0, item.depth)))}- [${item.checked ? "x" : " "}] ${cleanText(item.text, 2_000)}`,
    )
    .join("\n");
}

export function generateBlockquote(text: string): string {
  return cleanText(text, LIMITS.longText)
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n");
}

function encodeBadgePart(value: string): string {
  return encodeURIComponent(cleanText(value, 100).trim()).replaceAll(
    "-",
    "%2D",
  );
}

export function generateBadge(
  label: string,
  message: string,
  color = "blue",
  destination?: string,
): string {
  const safeColor = /^(?:[a-z]+|[0-9a-fA-F]{3,8})$/.test(color.trim())
    ? color.trim()
    : "blue";
  const image = `![${escapeLabel(label)}](https://img.shields.io/badge/${encodeBadgePart(label)}-${encodeBadgePart(message)}-${encodeBadgePart(safeColor)})`;
  return destination?.trim() ? `[${image}](${safeUrl(destination)})` : image;
}

export function generateDetails(summary: string, content: string): string {
  const safeSummary = cleanText(summary).replace(/[<>]/g, "");
  return `<details>\n<summary>${safeSummary}</summary>\n\n${cleanText(content, LIMITS.longText)}\n\n</details>`;
}

export function generateAlert(type: AlertType, content: string): string {
  const allowed: AlertType[] = [
    "NOTE",
    "TIP",
    "IMPORTANT",
    "WARNING",
    "CAUTION",
  ];
  const safeType = allowed.includes(type) ? type : "NOTE";
  const body = cleanText(content, LIMITS.longText)
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n");
  return `> [!${safeType}]\n${body}`;
}
