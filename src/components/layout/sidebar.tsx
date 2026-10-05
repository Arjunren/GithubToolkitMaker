import Link from "next/link";
import {
  ArrowUpRight,
  Braces,
  GitBranch,
  Hammer,
  Home,
  Play,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export const toolGroups = [
  {
    label: "Text",
    links: [
      ["Heading", "/heading"],
      ["Formatting", "/text"],
      ["Blockquote", "/blockquote"],
    ],
  },
  {
    label: "Links & Media",
    links: [
      ["Link", "/link"],
      ["Image", "/image"],
      ["Badge", "/badge"],
    ],
  },
  {
    label: "Structure",
    links: [
      ["Table", "/table"],
      ["Ordered List", "/ordered-list"],
      ["Unordered List", "/list"],
      ["Task List", "/task-list"],
      ["Details", "/details"],
    ],
  },
  { label: "Code", links: [["Code Block", "/code"]] },
  { label: "GitHub", links: [["Alerts", "/alert"]] },
] as const;

function NavContent() {
  return (
    <>
      <nav aria-label="Primary navigation" className="primary-nav">
        <Link href="/">
          <Home size={17} />
          Home
        </Link>
        <Link href="/builder">
          <Hammer size={17} />
          README Builder
        </Link>
        <Link href="/playground">
          <Play size={17} />
          Playground
        </Link>
      </nav>
      <div className="tools-label">
        <Braces size={15} /> Tools
      </div>
      {toolGroups.map((group) => (
        <div className="nav-group" key={group.label}>
          <p>{group.label}</p>
          {group.links.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

function CreatorCredit() {
  return (
    <a
      className="creator-credit"
      href="https://github.com/Arjunren"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        Created by <strong>Arjunren Von</strong>
      </span>
      <ArrowUpRight size={14} />
    </a>
  );
}

export function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <GitBranch size={21} />
          </span>
          <span>
            Markdown
            <br />
            <b>Toolkit</b>
          </span>
        </Link>
        <NavContent />
        <div className="sidebar-footer">
          <ThemeToggle />
          <CreatorCredit />
          <p>
            <Sparkles size={13} /> Local-first. Always free.
          </p>
        </div>
      </aside>
      <header className="mobile-header">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <GitBranch size={19} />
          </span>
          <b>Markdown Toolkit</b>
        </Link>
        <details className="mobile-menu">
          <summary>Menu</summary>
          <div className="mobile-menu-card">
            <NavContent />
            <ThemeToggle />
            <CreatorCredit />
          </div>
        </details>
      </header>
    </>
  );
}
