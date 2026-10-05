import type { Metadata } from "next";
import { ReadmeBuilder } from "@/components/editor/readme-builder";

export const metadata: Metadata = {
  title: "GitHub README Builder",
  description:
    "Compose a polished README from editable, reusable sections and templates.",
};
export default function BuilderPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">Structured authoring</span>
        <h1>README Builder</h1>
        <p>
          Start from a thoughtful template, arrange the sections you need, and
          export a complete README.md.
        </p>
      </header>
      <ReadmeBuilder />
    </div>
  );
}
