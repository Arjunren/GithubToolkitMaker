export interface StorageAdapter<T> {
  load(): T | null;
  save(value: T): void;
  clear(): void;
}

export function createStorageAdapter<T>(
  key: string,
  validate: (value: unknown) => value is T,
): StorageAdapter<T> {
  return {
    load() {
      if (typeof window === "undefined") return null;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        return validate(parsed) ? parsed : null;
      } catch {
        return null;
      }
    },
    save(value) {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* storage may be unavailable */
      }
    },
    clear() {
      if (typeof window !== "undefined") localStorage.removeItem(key);
    },
  };
}

export interface PlaygroundState {
  version: 1;
  markdown: string;
}

export function isPlaygroundState(value: unknown): value is PlaygroundState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  return (
    state.version === 1 &&
    typeof state.markdown === "string" &&
    state.markdown.length <= 50_000
  );
}
