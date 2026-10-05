import { describe, expect, it } from "vitest";
import {
  generateAlert,
  generateBadge,
  generateDetails,
  generateHeading,
  generateImage,
  generateLink,
  generateTable,
  generateTaskList,
} from "./generators";

describe("Markdown generators", () => {
  it("generates and clamps headings", () => {
    expect(generateHeading("Install", 2)).toBe("## Install");
    expect(generateHeading("Deep", 99)).toBe("###### Deep");
  });
  it("generates links and accepts relative paths", () => {
    expect(generateLink("Setup", "./docs/setup.md", "Read next")).toBe(
      '[Setup](./docs/setup.md "Read next")',
    );
  });
  it("rejects dangerous links", () => {
    expect(() => generateLink("bad", "javascript:alert(1)")).toThrow(/valid/);
  });
  it("generates images with escaped alt text", () => {
    expect(generateImage("A [diagram]", "./diagram.png")).toBe(
      "![A \\[diagram\\]](./diagram.png)",
    );
  });
  it("generates aligned tables and escapes pipes", () => {
    expect(
      generateTable({
        headers: ["Name", "Value"],
        alignments: ["left", "right"],
        rows: [["A | B", "1"]],
      }),
    ).toBe("| Name | Value |\n| :--- | ---: |\n| A \\| B | 1 |");
  });
  it("generates task lists", () => {
    expect(
      generateTaskList([
        { text: "Ship", depth: 0, checked: true },
        { text: "Docs", depth: 1, checked: false },
      ]),
    ).toBe("- [x] Ship\n  - [ ] Docs");
  });
  it("URL-encodes badge parts", () => {
    expect(generateBadge("build status", "all-good", "brightgreen")).toContain(
      "build%20status-all%2Dgood-brightgreen",
    );
  });
  it("generates details while removing summary tags", () => {
    expect(generateDetails("<Install>", "npm install")).toContain(
      "<summary>Install</summary>",
    );
  });
  it("generates GitHub alerts", () => {
    expect(generateAlert("WARNING", "Take care\nSecond line")).toBe(
      "> [!WARNING]\n> Take care\n> Second line",
    );
  });
});
