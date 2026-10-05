import { afterEach, describe, expect, it, vi } from "vitest";
import { createStorageAdapter, isPlaygroundState } from "./index";
import { isBuilderState } from "./builder";

afterEach(() => vi.unstubAllGlobals());

describe("versioned storage validation", () => {
  it("accepts a bounded current playground payload", () => {
    expect(isPlaygroundState({ version: 1, markdown: "# Hello" })).toBe(true);
  });
  it("rejects old and malformed playground payloads", () => {
    expect(isPlaygroundState({ version: 0, markdown: "old" })).toBe(false);
    expect(isPlaygroundState({ version: 1, markdown: 42 })).toBe(false);
  });
  it("rejects malformed builder sections", () => {
    expect(
      isBuilderState({
        version: 1,
        templateId: "blank",
        sections: [{ id: "x" }],
      }),
    ).toBe(false);
  });
  it("returns null for corrupt JSON", () => {
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", { getItem: () => "{broken" });
    const adapter = createStorageAdapter("test", isPlaygroundState);
    expect(adapter.load()).toBeNull();
  });
});
