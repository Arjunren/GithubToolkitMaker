"use client";

import { useState } from "react";
import { Check, Clipboard, Download } from "lucide-react";
import { copyText, downloadMarkdown } from "@/lib/browser";
import { MarkdownPreview } from "@/components/markdown/markdown-preview";
import { Button } from "@/components/ui/button";

export function ResultPanel({
  markdown,
  filename = "markdown.md",
  error,
}: {
  markdown: string;
  filename?: string;
  error?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await copyText(markdown);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  }
  return (
    <section className="result-stack" aria-label="Generated result">
      <div className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Output</span>
            <h2>Generated Markdown</h2>
          </div>
          <div className="button-row">
            <Button onClick={copy} disabled={!markdown || Boolean(error)}>
              {status === "copied" ? (
                <Check size={16} />
              ) : (
                <Clipboard size={16} />
              )}
              {status === "copied"
                ? "Copied"
                : status === "error"
                  ? "Copy failed"
                  : "Copy"}
            </Button>
            <Button
              className="button-secondary"
              onClick={() => downloadMarkdown(markdown, filename)}
              disabled={!markdown || Boolean(error)}
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : (
          <pre className="code-output">
            <code>{markdown || "Your Markdown will appear here."}</code>
          </pre>
        )}
      </div>
      <div className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Preview</span>
            <h2>GitHub-style preview</h2>
          </div>
        </div>
        <MarkdownPreview markdown={error ? "" : markdown} />
      </div>
    </section>
  );
}
