# GitHub Markdown Toolkit

A free, local-first web application for creating, previewing, and exporting GitHub-compatible Markdown. It includes focused syntax generators, a structured README builder, and a live GFM playground. No account, database, API key, or backend is required.

## Features

- Thirteen focused tools for headings, text, links, images, tables, code blocks, lists, task lists, blockquotes, badges, details, and GitHub alerts
- Visual table editor with row, column, and alignment controls
- README builder with 20 reusable section types and 10 structured templates
- Live GitHub Flavored Markdown preview with tables, task lists, strikethrough, and sanitized HTML details
- Versioned, validated local persistence for README and playground drafts
- Copy and `.md` download actions using browser APIs
- Responsive sidebar/mobile navigation and light/dark modes
- Monochrome cloud-inspired theme with an introductory creator credit for [Arjunren Von](https://github.com/Arjunren)
- Static-first Next.js App Router architecture suitable for Vercel's free plan
- Unit tests for generation, validation, escaping, and storage parsing

## Screenshots

Screenshots can be added under `docs/` after deployment:

- Homepage and tool grid
- Visual table generator
- README builder
- Split-screen playground

## Local development

```bash
git clone https://github.com/Arjunren/github-markdown-toolkit.git
cd github-markdown-toolkit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production verification

```bash
npm run lint
npm test
npm run build
```

## Manual Vercel deployment

1. Push this repository to GitHub.
2. Sign in to Vercel and select **Add New → Project**.
3. Import `Arjunren/github-markdown-toolkit`.
4. Keep the detected framework as **Next.js**.
5. Leave the root directory at the repository root and do not add environment variables.
6. Keep the default install command (`npm install`) and build command (`npm run build`).
7. Select **Deploy**.

The application uses no server-side persistence or paid services. Client-side drafts remain in the visitor's browser.

## Project structure

```text
src/
├── app/                 # App Router pages, metadata, sitemap, and route shells
├── components/
│   ├── editor/          # Generators, builder, playground, and result panels
│   ├── layout/          # Responsive navigation and theme control
│   ├── markdown/        # Sanitized GFM preview
│   └── ui/              # Focused form primitives
├── data/                # Tool metadata and structured README templates
├── lib/
│   ├── markdown/        # Pure, independently tested generators
│   ├── storage/         # Versioned localStorage adapters and validators
│   └── validation/      # Input limits and URL protocol validation
└── types/               # Markdown and builder domain types
```

## Security

- User Markdown is treated as untrusted.
- Raw HTML is parsed only so a small set of useful elements such as `<details>` can work, then sanitized with `rehype-sanitize`.
- Scripts, event handlers, iframes, embeds, and unsafe attributes are removed.
- Rendered links and generated link/image destinations reject dangerous protocols such as `javascript:`, `data:`, and `vbscript:`.
- External preview links use `noopener noreferrer`.
- Persisted data is parsed defensively and checked for schema version, types, counts, and size limits.
- No Markdown is evaluated and no generated code is executed.
- No backend fetches user-controlled URLs, so the application exposes no SSRF surface.

## Contributing

Issues and focused pull requests are welcome. Run the full verification suite before opening a pull request and avoid adding dependencies unless they provide clear product value.

## License

Licensed under the [MIT License](LICENSE).
