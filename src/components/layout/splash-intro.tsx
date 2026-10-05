"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";

export function SplashIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 900
      : 3200;
    const timer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <section
      className="splash"
      aria-label="Site introduction"
      aria-live="polite"
    >
      <div className="splash-cloud splash-cloud-one" />
      <div className="splash-cloud splash-cloud-two" />
      <div className="splash-content">
        <span className="splash-mark" aria-hidden="true">
          <GitBranch size={25} />
        </span>
        <p className="splash-kicker">A developer tool by</p>
        <h1>Arjunren Von</h1>
        <a
          href="https://github.com/Arjunren"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/Arjunren <ArrowUpRight size={16} />
        </a>
        <div className="splash-rule" aria-hidden="true" />
        <p className="splash-product">GitHub Markdown Toolkit</p>
        <button type="button" onClick={() => setVisible(false)}>
          Enter toolkit
        </button>
      </div>
    </section>
  );
}
