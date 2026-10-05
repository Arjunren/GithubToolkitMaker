"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Clipboard, Download, Trash2 } from "lucide-react";
import { copyText, downloadMarkdown } from "@/lib/browser";
import { createStorageAdapter, isPlaygroundState } from "@/lib/storage";
import { MarkdownPreview } from "@/components/markdown/markdown-preview";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/field";

const starter = `# Markdown playground

Write **GitHub Flavored Markdown** on the left.

| Feature | Ready |
| :--- | :---: |
| Tables | ✅ |
| Task lists | ✅ |

- [x] Live preview
- [ ] Ship something great
`;

export function Playground() {
  const storage = useMemo(
    () => createStorageAdapter("gmt-playground-v1", isPlaygroundState),
    [],
  );
  const hydrated = useRef(false);
  const [markdown, setMarkdown] = useState(starter);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = storage.load();
      if (saved) setMarkdown(saved.markdown);
      hydrated.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storage]);
  useEffect(() => {
    if (hydrated.current) storage.save({ version: 1, markdown });
  }, [markdown, storage]);
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
      <div className="panel-heading">
        <p className="field-hint" role="status">
          Saved automatically in this browser.
        </p>
        <div className="button-row">
          <Button onClick={copy}>
            {copied ? <Check size={16} /> : <Clipboard size={16} />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            className="button-secondary"
            onClick={() => downloadMarkdown(markdown, "playground.md")}
          >
            <Download size={16} />
            Download
          </Button>
          <Button
            className="button-danger"
            onClick={() => {
              setMarkdown("");
              storage.clear();
            }}
          >
            <Trash2 size={16} />
            Clear
          </Button>
        </div>
      </div>
      <section className="split-pane">
        <div className="split-side">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Editor</span>
              <h2>Markdown</h2>
            </div>
          </div>
          <label className="sr-only" htmlFor="playground-editor">
            Markdown editor
          </label>
          <Textarea
            id="playground-editor"
            maxLength={50000}
            value={markdown}
            onChange={(event) => setMarkdown(event.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="split-side">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Preview</span>
              <h2>GitHub-style output</h2>
            </div>
          </div>
          <MarkdownPreview markdown={markdown} />
        </div>
      </section>
    </>
  );
}
