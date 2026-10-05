import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Braces,
  Code2,
  Copy,
  Download,
  Link2,
  ListChecks,
  LockKeyhole,
  PanelsTopLeft,
  Table2,
  TextCursorInput,
} from "lucide-react";

const tools = [
  {
    title: "Table Generator",
    href: "/table",
    description: "Build aligned, GitHub-ready tables in a visual grid.",
    icon: Table2,
  },
  {
    title: "Badge Generator",
    href: "/badge",
    description: "Create clean Shields.io badge Markdown safely.",
    icon: BadgeCheck,
  },
  {
    title: "Code Block Generator",
    href: "/code",
    description: "Wrap snippets in language-aware fenced blocks.",
    icon: Code2,
  },
  {
    title: "Link Generator",
    href: "/link",
    description: "Create validated links, including relative paths.",
    icon: Link2,
  },
  {
    title: "Details Generator",
    href: "/details",
    description: "Make tidy, collapsible documentation sections.",
    icon: PanelsTopLeft,
  },
  {
    title: "Task List Generator",
    href: "/task-list",
    description: "Plan work with editable, nested checklists.",
    icon: ListChecks,
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="hero">
        <span className="eyebrow">
          <Braces size={14} /> Developer documentation, simplified
        </span>
        <h1>GitHub Markdown Toolkit</h1>
        <p>
          Build better README files and GitHub Markdown without memorizing
          syntax. Everything runs locally, right in your browser.
        </p>
        <div className="button-row">
          <Link className="hero-link" href="/builder">
            Build a README <ArrowRight size={17} />
          </Link>
          <Link className="hero-link secondary" href="/playground">
            Open Playground
          </Link>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Popular tools</span>
          <h2>Pick one job. Get clean Markdown.</h2>
          <p>Focused generators for the syntax you use most.</p>
        </div>
        <div className="card-grid">
          {tools.map(({ title, href, description, icon: Icon }) => (
            <Link className="tool-card" href={href} key={href}>
              <div>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Built for trust</span>
          <h2>Your Markdown stays yours.</h2>
        </div>
        <div className="trust-grid">
          <div className="trust-item">
            <LockKeyhole />
            <h3>No account</h3>
            <p>Open a tool and start writing. No sign-up gate.</p>
          </div>
          <div className="trust-item">
            <TextCursorInput />
            <h3>Works locally</h3>
            <p>Your drafts persist only in this browser.</p>
          </div>
          <div className="trust-item">
            <Copy />
            <h3>Copy instantly</h3>
            <p>Move generated Markdown into any repository.</p>
          </div>
          <div className="trust-item">
            <Download />
            <h3>Download files</h3>
            <p>Export README.md or focused Markdown snippets.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
