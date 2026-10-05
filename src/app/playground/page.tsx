import type { Metadata } from "next";
import { Playground } from "@/components/editor/playground";

export const metadata: Metadata = {
  title: "GitHub Markdown Playground",
  description:
    "Write Markdown in a lightweight editor and preview GitHub Flavored Markdown live.",
};
export default function PlaygroundPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">Live workspace</span>
        <h1>Markdown Playground</h1>
        <p>
          Write GitHub Flavored Markdown, inspect the safe preview, and keep
          your draft stored locally.
        </p>
      </header>
      <Playground />
    </div>
  );
}
