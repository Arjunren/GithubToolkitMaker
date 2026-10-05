import type { BuilderState, ReadmeSection } from "@/types/markdown";
import { LIMITS } from "@/lib/validation";

function isSection(value: unknown): value is ReadmeSection {
  if (!value || typeof value !== "object") return false;
  const section = value as Record<string, unknown>;
  return (
    typeof section.id === "string" &&
    section.id.length <= 200 &&
    typeof section.type === "string" &&
    typeof section.title === "string" &&
    section.title.length <= 500 &&
    typeof section.content === "string" &&
    section.content.length <= LIMITS.longText &&
    typeof section.enabled === "boolean"
  );
}

export function isBuilderState(value: unknown): value is BuilderState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  return (
    state.version === 1 &&
    typeof state.templateId === "string" &&
    Array.isArray(state.sections) &&
    state.sections.length <= LIMITS.builderSections &&
    state.sections.every(isSection)
  );
}

export function buildReadme(sections: ReadmeSection[]): string {
  return sections
    .filter((section) => section.enabled)
    .map((section) => section.content.trim())
    .filter(Boolean)
    .join("\n\n");
}
