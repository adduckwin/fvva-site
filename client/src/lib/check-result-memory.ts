// Completed results belong to one visit. Layout already gives each browser
// history entry an opaque key; no questionnaire data is written to history.
export function createCheckResultMemory<T>() {
  const entries = new Map<string, T>();

  function key(section: string) {
    if (typeof window === "undefined") return undefined;
    const visit = window.history.state?.fvvaScrollKey;
    return visit ? visit + ":" + window.location.pathname + ":" + section : undefined;
  }

  return {
    read(section: string): T | undefined {
      const id = key(section);
      return id ? entries.get(id) : undefined;
    },
    save(section: string, value: T) {
      const id = key(section);
      if (id) entries.set(id, value);
    },
    clear(section: string) {
      const id = key(section);
      if (id) entries.delete(id);
    },
  };
}
