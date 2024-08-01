interface LocalStorage {
  clear: () => void;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export const localStorageMock = ((): LocalStorage => {
  let store: Record<string, string> = {};

  return {
    clear(): void {
      store = {};
    },
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value;
    },
    removeItem(key: string): void {
      delete store[key];
    },
  };
})();
