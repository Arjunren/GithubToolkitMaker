"use client";

import { useMemo, useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import type {
  AlertType,
  Alignment,
  ListItem,
  TaskItem,
} from "@/types/markdown";
import type { ToolSlug } from "@/data/tools";
import {
  generateAlert,
  generateBadge,
  generateBlockquote,
  generateCodeBlock,
  generateDetails,
  generateFormattedText,
  generateHeading,
  generateImage,
  generateLink,
  generateList,
  generateTable,
  generateTaskList,
} from "@/lib/markdown/generators";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { ResultPanel } from "./result-panel";

const defaults = {
  text: "Installation",
  level: 2,
  style: "bold",
  url: "https://example.com",
  title: "",
  alt: "Architecture",
  language: "typescript",
  code: "const ready = true;",
  label: "build",
  message: "passing",
  color: "brightgreen",
  destination: "",
  summary: "Installation",
  content: "Install the project using:\n\n```bash\nnpm install\n```",
  alert: "NOTE" as AlertType,
};

function BasicTool({
  tool,
}: {
  tool: Exclude<ToolSlug, "table" | "list" | "ordered-list" | "task-list">;
}) {
  const [values, setValues] = useState(defaults);
  const result = useMemo(() => {
    try {
      switch (tool) {
        case "heading":
          return { markdown: generateHeading(values.text, values.level) };
        case "text":
          return {
            markdown: generateFormattedText(
              values.text,
              values.style as "bold",
            ),
          };
        case "link":
          return {
            markdown: generateLink(values.text, values.url, values.title),
          };
        case "image":
          return {
            markdown: generateImage(values.alt, values.url, values.title),
          };
        case "code":
          return { markdown: generateCodeBlock(values.language, values.code) };
        case "blockquote":
          return { markdown: generateBlockquote(values.content) };
        case "badge":
          return {
            markdown: generateBadge(
              values.label,
              values.message,
              values.color,
              values.destination,
            ),
          };
        case "details":
          return { markdown: generateDetails(values.summary, values.content) };
        case "alert":
          return { markdown: generateAlert(values.alert, values.content) };
      }
    } catch (error) {
      return {
        markdown: "",
        error: error instanceof Error ? error.message : "Invalid input.",
      };
    }
  }, [tool, values]);
  const set = (key: keyof typeof defaults, value: string | number) =>
    setValues((current) => ({ ...current, [key]: value }));
  return (
    <div className="tool-layout">
      <section className="panel form-stack">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Configure</span>
            <h2>Options</h2>
          </div>
          <Button
            className="button-secondary"
            onClick={() => setValues(defaults)}
          >
            <RotateCcw size={15} />
            Reset
          </Button>
        </div>
        {tool === "heading" && (
          <>
            <Field label="Heading text">
              <Input
                maxLength={500}
                value={values.text}
                onChange={(event) => set("text", event.target.value)}
              />
            </Field>
            <Field label="Heading level">
              <Select
                value={values.level}
                onChange={(event) => set("level", Number(event.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option value={level} key={level}>
                    H{level}
                  </option>
                ))}
              </Select>
            </Field>
          </>
        )}
        {tool === "text" && (
          <>
            <Field label="Text">
              <Input
                maxLength={500}
                value={values.text}
                onChange={(event) => set("text", event.target.value)}
              />
            </Field>
            <Field label="Style">
              <Select
                value={values.style}
                onChange={(event) => set("style", event.target.value)}
              >
                <option value="bold">Bold</option>
                <option value="italic">Italic</option>
                <option value="bold-italic">Bold + italic</option>
                <option value="strike">Strikethrough</option>
                <option value="code">Inline code</option>
              </Select>
            </Field>
          </>
        )}
        {tool === "link" && (
          <>
            <Field label="Link text">
              <Input
                maxLength={500}
                value={values.text}
                onChange={(event) => set("text", event.target.value)}
              />
            </Field>
            <UrlFields values={values} set={set} />
          </>
        )}
        {tool === "image" && (
          <>
            <Field
              label="Alt text"
              hint="Describe the image for readers using assistive technology."
            >
              <Input
                maxLength={500}
                value={values.alt}
                onChange={(event) => set("alt", event.target.value)}
              />
            </Field>
            <UrlFields values={values} set={set} image />
          </>
        )}
        {tool === "code" && (
          <>
            <Field
              label="Language"
              hint="Choose a common language or type another identifier."
            >
              <Input
                list="languages"
                maxLength={40}
                value={values.language}
                onChange={(event) => set("language", event.target.value)}
              />
              <datalist id="languages">
                <option value="typescript" />
                <option value="javascript" />
                <option value="python" />
                <option value="bash" />
                <option value="json" />
                <option value="css" />
                <option value="html" />
                <option value="go" />
                <option value="rust" />
              </datalist>
            </Field>
            <Field label="Code">
              <Textarea
                maxLength={50000}
                rows={10}
                value={values.code}
                onChange={(event) => set("code", event.target.value)}
              />
            </Field>
          </>
        )}
        {tool === "blockquote" && (
          <Field label="Quote">
            <Textarea
              maxLength={50000}
              rows={8}
              value={values.content}
              onChange={(event) => set("content", event.target.value)}
            />
          </Field>
        )}
        {tool === "badge" && (
          <>
            <Field label="Label">
              <Input
                maxLength={100}
                value={values.label}
                onChange={(event) => set("label", event.target.value)}
              />
            </Field>
            <Field label="Message">
              <Input
                maxLength={100}
                value={values.message}
                onChange={(event) => set("message", event.target.value)}
              />
            </Field>
            <Field
              label="Color"
              hint="Use a named Shields color or 3–8 digit hex value without #."
            >
              <Input
                maxLength={20}
                value={values.color}
                onChange={(event) => set("color", event.target.value)}
              />
            </Field>
            <Field label="Destination URL (optional)">
              <Input
                maxLength={2048}
                value={values.destination}
                onChange={(event) => set("destination", event.target.value)}
              />
            </Field>
          </>
        )}
        {tool === "details" && (
          <>
            <Field label="Summary">
              <Input
                maxLength={500}
                value={values.summary}
                onChange={(event) => set("summary", event.target.value)}
              />
            </Field>
            <Field label="Content">
              <Textarea
                maxLength={50000}
                rows={10}
                value={values.content}
                onChange={(event) => set("content", event.target.value)}
              />
            </Field>
          </>
        )}
        {tool === "alert" && (
          <>
            <Field label="Alert type">
              <Select
                value={values.alert}
                onChange={(event) => set("alert", event.target.value)}
              >
                {["NOTE", "TIP", "IMPORTANT", "WARNING", "CAUTION"].map(
                  (type) => (
                    <option key={type}>{type}</option>
                  ),
                )}
              </Select>
            </Field>
            <Field label="Message">
              <Textarea
                maxLength={50000}
                rows={7}
                value={values.content}
                onChange={(event) => set("content", event.target.value)}
              />
            </Field>
          </>
        )}
      </section>
      <ResultPanel
        markdown={result?.markdown ?? ""}
        error={result?.error}
        filename={`${tool}.md`}
      />
    </div>
  );
}

function UrlFields({
  values,
  set,
  image = false,
}: {
  values: typeof defaults;
  set: (key: keyof typeof defaults, value: string) => void;
  image?: boolean;
}) {
  return (
    <>
      <Field
        label={image ? "Image URL or relative path" : "URL or relative path"}
      >
        <Input
          maxLength={2048}
          value={values.url}
          onChange={(event) => set("url", event.target.value)}
        />
      </Field>
      <Field label="Optional title">
        <Input
          maxLength={500}
          value={values.title}
          onChange={(event) => set("title", event.target.value)}
        />
      </Field>
    </>
  );
}

function TableTool() {
  const initial = {
    headers: ["Name", "Status", "Version"],
    alignments: ["left", "center", "right"] as Alignment[],
    rows: [
      ["API", "Stable", "1.2"],
      ["Frontend", "Beta", "0.9"],
    ],
  };
  const [table, setTable] = useState(initial);
  const markdown = generateTable(table);
  const updateHeader = (index: number, value: string) =>
    setTable((current) => ({
      ...current,
      headers: current.headers.map((cell, cellIndex) =>
        cellIndex === index ? value : cell,
      ),
    }));
  const updateCell = (row: number, column: number, value: string) =>
    setTable((current) => ({
      ...current,
      rows: current.rows.map((cells, rowIndex) =>
        rowIndex === row
          ? cells.map((cell, columnIndex) =>
              columnIndex === column ? value : cell,
            )
          : cells,
      ),
    }));
  const addColumn = () =>
    setTable((current) =>
      current.headers.length >= 20
        ? current
        : {
            headers: [
              ...current.headers,
              `Column ${current.headers.length + 1}`,
            ],
            alignments: [...current.alignments, "left"],
            rows: current.rows.map((row) => [...row, ""]),
          },
    );
  const removeColumn = () =>
    setTable((current) =>
      current.headers.length <= 1
        ? current
        : {
            headers: current.headers.slice(0, -1),
            alignments: current.alignments.slice(0, -1),
            rows: current.rows.map((row) => row.slice(0, -1)),
          },
    );
  return (
    <div className="form-stack">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Visual editor</span>
            <h2>Table cells</h2>
          </div>
          <div className="button-row">
            <Button
              onClick={() =>
                setTable((current) =>
                  current.rows.length >= 50
                    ? current
                    : {
                        ...current,
                        rows: [
                          ...current.rows,
                          Array(current.headers.length).fill(""),
                        ],
                      },
                )
              }
            >
              <Plus size={15} />
              Row
            </Button>
            <Button onClick={addColumn}>
              <Plus size={15} />
              Column
            </Button>
            <Button
              className="button-secondary"
              onClick={() =>
                setTable((current) => ({
                  ...current,
                  rows: current.rows.slice(0, -1),
                }))
              }
            >
              Remove row
            </Button>
            <Button className="button-secondary" onClick={removeColumn}>
              Remove column
            </Button>
            <Button
              className="button-secondary"
              onClick={() => setTable(initial)}
            >
              <RotateCcw size={15} />
              Reset
            </Button>
          </div>
        </div>
        <div className="table-editor">
          <table className="edit-table">
            <thead>
              <tr>
                {table.headers.map((header, index) => (
                  <th key={index}>
                    <Input
                      aria-label={`Header ${index + 1}`}
                      maxLength={2000}
                      value={header}
                      onChange={(event) =>
                        updateHeader(index, event.target.value)
                      }
                    />
                    <Select
                      aria-label={`Column ${index + 1} alignment`}
                      value={table.alignments[index]}
                      onChange={(event) =>
                        setTable((current) => ({
                          ...current,
                          alignments: current.alignments.map(
                            (alignment, alignmentIndex) =>
                              alignmentIndex === index
                                ? (event.target.value as Alignment)
                                : alignment,
                          ),
                        }))
                      }
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </Select>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, columnIndex) => (
                    <td key={columnIndex}>
                      <Input
                        aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`}
                        maxLength={2000}
                        value={cell}
                        onChange={(event) =>
                          updateCell(rowIndex, columnIndex, event.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <ResultPanel markdown={markdown} filename="table.md" />
    </div>
  );
}

function ListTool({ mode }: { mode: "ordered" | "unordered" | "task" }) {
  const makeInitial = (): Array<ListItem | TaskItem> =>
    mode === "task"
      ? [
          { text: "Create project", depth: 0, checked: true },
          { text: "Add documentation", depth: 0, checked: false },
        ]
      : [
          { text: "First item", depth: 0 },
          { text: "Nested item", depth: 1 },
        ];
  const [items, setItems] = useState(makeInitial);
  const markdown =
    mode === "task"
      ? generateTaskList(items as TaskItem[])
      : generateList(items, mode === "ordered");
  return (
    <div className="tool-layout">
      <section className="panel form-stack">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Items</span>
            <h2>List editor</h2>
          </div>
          <Button
            className="button-secondary"
            onClick={() => setItems(makeInitial())}
          >
            <RotateCcw size={15} />
            Reset
          </Button>
        </div>
        {items.map((item, index) => (
          <div className="section-editor" key={index}>
            <div className="button-row">
              {mode === "task" && (
                <label>
                  <input
                    type="checkbox"
                    checked={(item as TaskItem).checked}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) =>
                          itemIndex === index
                            ? { ...entry, checked: event.target.checked }
                            : entry,
                        ),
                      )
                    }
                  />{" "}
                  Done
                </label>
              )}
              <Select
                aria-label={`Indent for item ${index + 1}`}
                value={item.depth}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, itemIndex) =>
                      itemIndex === index
                        ? { ...entry, depth: Number(event.target.value) }
                        : entry,
                    ),
                  )
                }
              >
                {[0, 1, 2, 3, 4].map((depth) => (
                  <option value={depth} key={depth}>
                    Level {depth + 1}
                  </option>
                ))}
              </Select>
              <Button
                className="button-danger"
                aria-label={`Remove item ${index + 1}`}
                onClick={() =>
                  setItems((current) =>
                    current.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                <Trash2 size={15} />
              </Button>
            </div>
            <Input
              aria-label={`Item ${index + 1} text`}
              maxLength={2000}
              value={item.text}
              onChange={(event) =>
                setItems((current) =>
                  current.map((entry, itemIndex) =>
                    itemIndex === index
                      ? { ...entry, text: event.target.value }
                      : entry,
                  ),
                )
              }
            />
          </div>
        ))}
        <Button
          onClick={() =>
            setItems((current) =>
              current.length >= 100
                ? current
                : [
                    ...current,
                    mode === "task"
                      ? { text: "New task", depth: 0, checked: false }
                      : { text: "New item", depth: 0 },
                  ],
            )
          }
        >
          <Plus size={15} />
          Add item
        </Button>
      </section>
      <ResultPanel markdown={markdown} filename={`${mode}-list.md`} />
    </div>
  );
}

export function ToolClient({ tool }: { tool: ToolSlug }) {
  if (tool === "table") return <TableTool />;
  if (tool === "list") return <ListTool mode="unordered" />;
  if (tool === "ordered-list") return <ListTool mode="ordered" />;
  if (tool === "task-list") return <ListTool mode="task" />;
  return <BasicTool tool={tool} />;
}
