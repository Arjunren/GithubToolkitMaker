import type { ReadmeSection, ReadmeTemplate } from "@/types/markdown";

type SectionSeed = Omit<ReadmeSection, "id" | "enabled">;

export const sectionCatalog: SectionSeed[] = [
  {
    type: "title",
    title: "Project Title",
    content: "# Project name\n\nA short, memorable description.",
  },
  {
    type: "description",
    title: "Description",
    content: "## About\n\nExplain what this project does and why it exists.",
  },
  {
    type: "badges",
    title: "Badges",
    content: "![status](https://img.shields.io/badge/status-active-2ea44f)",
  },
  {
    type: "toc",
    title: "Table of Contents",
    content:
      "## Table of contents\n\n- [Features](#features)\n- [Installation](#installation)\n- [Usage](#usage)",
  },
  {
    type: "features",
    title: "Features",
    content:
      "## Features\n\n- Fast and focused\n- Easy to configure\n- Developer friendly",
  },
  {
    type: "stack",
    title: "Tech Stack",
    content: "## Tech stack\n\n- TypeScript\n- Add your framework",
  },
  {
    type: "installation",
    title: "Installation",
    content: "## Installation\n\n```bash\nnpm install\n```",
  },
  {
    type: "usage",
    title: "Usage",
    content: "## Usage\n\n```bash\nnpm run dev\n```",
  },
  {
    type: "configuration",
    title: "Configuration",
    content:
      "## Configuration\n\nDescribe the available configuration options.",
  },
  {
    type: "environment",
    title: "Environment Variables",
    content:
      "## Environment variables\n\nCopy `.env.example` to `.env.local` and set the documented values.",
  },
  {
    type: "api",
    title: "API",
    content:
      "## API reference\n\nDocument public endpoints or exported functions here.",
  },
  {
    type: "screenshots",
    title: "Screenshots",
    content:
      "## Screenshots\n\n![Application screenshot](./docs/screenshot.png)",
  },
  {
    type: "roadmap",
    title: "Roadmap",
    content: "## Roadmap\n\n- [x] Initial release\n- [ ] Community feedback",
  },
  {
    type: "contributing",
    title: "Contributing",
    content:
      "## Contributing\n\nContributions are welcome. Please open an issue before a large change.",
  },
  {
    type: "testing",
    title: "Testing",
    content: "## Testing\n\n```bash\nnpm test\n```",
  },
  {
    type: "deployment",
    title: "Deployment",
    content:
      "## Deployment\n\nBuild and deploy the production output for your platform.",
  },
  {
    type: "faq",
    title: "FAQ",
    content:
      "## FAQ\n\n<details>\n<summary>Where can I get help?</summary>\n\nOpen a GitHub issue with a minimal reproduction.\n\n</details>",
  },
  {
    type: "license",
    title: "License",
    content:
      "## License\n\nDistributed under the MIT License. See `LICENSE` for details.",
  },
  {
    type: "authors",
    title: "Authors",
    content: "## Authors\n\n- [@your-handle](https://github.com/your-handle)",
  },
  {
    type: "acknowledgements",
    title: "Acknowledgements",
    content:
      "## Acknowledgements\n\n- Add projects and people that helped here.",
  },
];

let sequence = 0;
export function createSection(type: string): ReadmeSection {
  const seed =
    sectionCatalog.find((item) => item.type === type) ?? sectionCatalog[1];
  sequence += 1;
  return {
    ...seed,
    id: `${seed.type}-${Date.now()}-${sequence}`,
    enabled: true,
  };
}

function template(
  id: string,
  name: string,
  description: string,
  types: string[],
): ReadmeTemplate {
  return {
    id,
    name,
    description,
    sections: types.map((type, index) => ({
      ...createSection(type),
      id: `${id}-${type}-${index}`,
    })),
  };
}

export const readmeTemplates: ReadmeTemplate[] = [
  template("blank", "Blank README", "Start with a single project title.", [
    "title",
  ]),
  template(
    "node",
    "Node.js Project",
    "A practical Node.js service or package.",
    [
      "title",
      "badges",
      "description",
      "features",
      "installation",
      "usage",
      "environment",
      "testing",
      "license",
    ],
  ),
  template("react", "React Project", "A client-side React application.", [
    "title",
    "badges",
    "description",
    "screenshots",
    "features",
    "stack",
    "installation",
    "usage",
    "testing",
    "deployment",
    "license",
  ]),
  template("next", "Next.js Project", "An App Router web application.", [
    "title",
    "badges",
    "description",
    "features",
    "stack",
    "installation",
    "environment",
    "usage",
    "testing",
    "deployment",
    "license",
  ]),
  template("api", "REST API", "An HTTP API with setup and endpoint docs.", [
    "title",
    "description",
    "toc",
    "features",
    "installation",
    "environment",
    "api",
    "testing",
    "deployment",
    "license",
  ]),
  template("cli", "CLI Tool", "A command-line application.", [
    "title",
    "badges",
    "description",
    "installation",
    "usage",
    "configuration",
    "contributing",
    "license",
  ]),
  template("library", "Open Source Library", "A reusable community package.", [
    "title",
    "badges",
    "description",
    "features",
    "installation",
    "usage",
    "api",
    "roadmap",
    "contributing",
    "testing",
    "license",
    "authors",
  ]),
  template("docker", "Docker Project", "A containerized application.", [
    "title",
    "description",
    "features",
    "installation",
    "configuration",
    "environment",
    "usage",
    "deployment",
    "license",
  ]),
  template(
    "terraform",
    "Terraform Module",
    "Infrastructure module documentation.",
    [
      "title",
      "badges",
      "description",
      "usage",
      "configuration",
      "api",
      "testing",
      "contributing",
      "license",
    ],
  ),
  template("profile", "GitHub Profile README", "A welcoming GitHub profile.", [
    "title",
    "description",
    "stack",
    "authors",
    "acknowledgements",
  ]),
];
