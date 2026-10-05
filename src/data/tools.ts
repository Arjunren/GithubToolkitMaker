export const toolDefinitions = {
  heading: {
    title: "GitHub Markdown Heading Generator",
    description:
      "Create accessible Markdown headings from level one through six.",
  },
  text: {
    title: "Markdown Text Formatting Generator",
    description:
      "Format text as bold, italic, bold italic, strikethrough, or inline code.",
  },
  link: {
    title: "GitHub Markdown Link Generator",
    description:
      "Generate safe Markdown links for web URLs, anchors, and relative files.",
  },
  image: {
    title: "GitHub Markdown Image Generator",
    description:
      "Create Markdown image syntax with useful alt text and optional titles.",
  },
  table: {
    title: "GitHub Markdown Table Generator",
    description:
      "Build editable Markdown tables with row, column, and alignment controls.",
  },
  code: {
    title: "Markdown Code Block Generator",
    description:
      "Create fenced code blocks with syntax highlighting language hints.",
  },
  list: {
    title: "Markdown Unordered List Generator",
    description: "Create clean unordered lists with optional nested items.",
  },
  "ordered-list": {
    title: "Markdown Ordered List Generator",
    description: "Create numbered Markdown lists with optional nested items.",
  },
  "task-list": {
    title: "GitHub Task List Generator",
    description:
      "Build interactive GitHub-style task lists and nested checklists.",
  },
  blockquote: {
    title: "Markdown Blockquote Generator",
    description: "Turn single or multiline text into a Markdown blockquote.",
  },
  badge: {
    title: "GitHub README Badge Generator",
    description: "Build URL-encoded Shields.io-compatible Markdown badges.",
  },
  details: {
    title: "GitHub Collapsible Details Generator",
    description:
      "Create secure, GitHub-supported details and summary sections.",
  },
  alert: {
    title: "GitHub Markdown Alert Generator",
    description: "Create NOTE, TIP, IMPORTANT, WARNING, and CAUTION callouts.",
  },
} as const;
export type ToolSlug = keyof typeof toolDefinitions;
export const toolSlugs = Object.keys(toolDefinitions) as ToolSlug[];
export const isToolSlug = (value: string): value is ToolSlug =>
  value in toolDefinitions;
