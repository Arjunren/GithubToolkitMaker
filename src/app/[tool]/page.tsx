import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolClient } from "@/components/editor/tool-client";
import { isToolSlug, toolDefinitions, toolSlugs } from "@/data/tools";

export function generateStaticParams() {
  return toolSlugs.map((tool) => ({ tool }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  if (!isToolSlug(tool)) return {};
  return {
    title: toolDefinitions[tool].title,
    description: toolDefinitions[tool].description,
  };
}
export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  if (!isToolSlug(tool)) notFound();
  const definition = toolDefinitions[tool];
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">Markdown tool</span>
        <h1>{definition.title}</h1>
        <p>{definition.description}</p>
      </header>
      <ToolClient tool={tool} />
    </div>
  );
}
