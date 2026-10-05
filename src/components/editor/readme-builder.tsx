"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Download,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import type { BuilderState, ReadmeSection } from "@/types/markdown";
import {
  createSection,
  readmeTemplates,
  sectionCatalog,
} from "@/data/templates";
import { buildReadme, isBuilderState } from "@/lib/storage/builder";
import { createStorageAdapter } from "@/lib/storage";
import { copyText, downloadMarkdown } from "@/lib/browser";
import { MarkdownPreview } from "@/components/markdown/markdown-preview";
import { Button } from "@/components/ui/button";
import { Select, Textarea } from "@/components/ui/field";

const fallback: BuilderState = {
  version: 1,
  templateId: "next",
  sections: readmeTemplates.find((item) => item.id === "next")!.sections,
};

export function ReadmeBuilder() {
  const storage = useMemo(
    () => createStorageAdapter("gmt-builder-v1", isBuilderState),
    [],
  );
  const hydrated = useRef(false);
  const [state, setState] = useState<BuilderState>(fallback);
  const [newType, setNewType] = useState("description");
  const [tab, setTab] = useState<"preview" | "raw">("preview");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = storage.load();
      if (saved) setState(saved);
      hydrated.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storage]);
  useEffect(() => {
    if (hydrated.current) storage.save(state);
  }, [state, storage]);
  const markdown = buildReadme(state.sections);
  function loadTemplate(templateId: string) {
    const selected =
      readmeTemplates.find((template) => template.id === templateId) ??
      readmeTemplates[0];
    setState({
      version: 1,
      templateId: selected.id,
      sections: selected.sections.map((section) => ({ ...section })),
    });
  }
  function update(id: string, patch: Partial<ReadmeSection>) {
    setState((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section,
      ),
    }));
  }
  function move(index: number, direction: -1 | 1) {
    setState((current) => {
      const next = [...current.sections];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, sections: next };
    });
  }
  async function copy() {
    try {
      await copyText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <div className="builder-toolbar">
        <label className="field">
          <span className="field-label">README template</span>
          <Select
            value={state.templateId}
            onChange={(event) => loadTemplate(event.target.value)}
          >
            {readmeTemplates.map((template) => (
              <option value={template.id} key={template.id}>
                {template.name} — {template.description}
              </option>
            ))}
          </Select>
        </label>
        <div className="button-row">
          <Button
            className="button-secondary"
            onClick={() => loadTemplate(state.templateId)}
          >
            <RotateCcw size={15} />
            Reset template
          </Button>
        </div>
      </div>
      <div className="builder-layout">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Sections</span>
              <h2>README outline</h2>
            </div>
            <span className="field-hint">Saved locally</span>
          </div>
          <div className="builder-sections">
            {state.sections.map((section, index) => (
              <article className="section-editor" key={section.id}>
                <div className="section-editor-head">
                  <label>
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={(event) =>
                        update(section.id, { enabled: event.target.checked })
                      }
                    />{" "}
                    <strong>{section.title}</strong>
                  </label>
                  <div className="section-actions">
                    <Button
                      className="button-secondary"
                      aria-label={`Move ${section.title} up`}
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <ChevronUp size={15} />
                    </Button>
                    <Button
                      className="button-secondary"
                      aria-label={`Move ${section.title} down`}
                      disabled={index === state.sections.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <ChevronDown size={15} />
                    </Button>
                    <Button
                      className="button-danger"
                      aria-label={`Remove ${section.title}`}
                      onClick={() =>
                        setState((current) => ({
                          ...current,
                          sections: current.sections.filter(
                            (item) => item.id !== section.id,
                          ),
                        }))
                      }
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>
                <label className="sr-only" htmlFor={`section-${section.id}`}>
                  {section.title} Markdown
                </label>
                <Textarea
                  id={`section-${section.id}`}
                  maxLength={50000}
                  rows={6}
                  value={section.content}
                  disabled={!section.enabled}
                  onChange={(event) =>
                    update(section.id, { content: event.target.value })
                  }
                />
              </article>
            ))}
          </div>
          <div className="button-row" style={{ marginTop: 14 }}>
            <Select
              aria-label="Section type to add"
              value={newType}
              onChange={(event) => setNewType(event.target.value)}
            >
              {sectionCatalog.map((section) => (
                <option value={section.type} key={section.type}>
                  {section.title}
                </option>
              ))}
            </Select>
            <Button
              onClick={() =>
                setState((current) =>
                  current.sections.length >= 50
                    ? current
                    : {
                        ...current,
                        sections: [...current.sections, createSection(newType)],
                      },
                )
              }
            >
              <Plus size={15} />
              Add section
            </Button>
          </div>
        </section>
        <section className="panel builder-preview">
          <div className="panel-heading">
            <div className="tabs" role="tablist">
              <button
                role="tab"
                aria-selected={tab === "preview"}
                onClick={() => setTab("preview")}
              >
                Preview
              </button>
              <button
                role="tab"
                aria-selected={tab === "raw"}
                onClick={() => setTab("raw")}
              >
                Raw Markdown
              </button>
            </div>
            <div className="button-row">
              <Button onClick={copy}>
                {copied ? <Check size={15} /> : <Clipboard size={15} />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                className="button-secondary"
                onClick={() => downloadMarkdown(markdown, "README.md")}
              >
                <Download size={15} />
                README.md
              </Button>
            </div>
          </div>
          {tab === "preview" ? (
            <MarkdownPreview markdown={markdown} />
          ) : (
            <pre className="code-output">
              <code>{markdown}</code>
            </pre>
          )}
        </section>
      </div>
    </>
  );
}
