import { browser } from '$app/env';
import recitersData from '#lib/data/reciters.json';

type Reciter = (typeof recitersData.reciters)[number];

const THEME_KEY = 'theme';
const RECITER_KEY = 'selectedReciter';
const RECITER_NAME_KEY = 'selectedReciterName';
const DEFAULT_THEME = 'light';
const DEFAULT_RECITER_ID = recitersData.reciters[0]?.id ?? '';

class AppState {
  theme = $state(DEFAULT_THEME);
  reciterId = $state(DEFAULT_RECITER_ID);

  private initialized = false;

  get reciter(): Reciter | undefined {
    return recitersData.reciters.find(
      (reciter) => reciter.id === this.reciterId
    );
  }

  get reciterName(): string {
    return this.reciter?.reciter ?? '';
  }

  init() {
    if (!browser || this.initialized) return;

    this.theme = localStorage.getItem(THEME_KEY) ?? DEFAULT_THEME;

    const savedId = localStorage.getItem(RECITER_KEY);
    if (
      savedId &&
      recitersData.reciters.some((reciter) => reciter.id === savedId)
    ) {
      this.reciterId = savedId;
    } else {
      const savedName = localStorage.getItem(RECITER_NAME_KEY);
      const matchingReciter = recitersData.reciters.find(
        (reciter) => reciter.reciter === savedName
      );
      if (matchingReciter) this.reciterId = matchingReciter.id;
    }

    this.initialized = true;
    this.applyTheme();
  }

  setTheme(theme: string) {
    this.theme = theme;
    if (browser) localStorage.setItem(THEME_KEY, theme);
    this.applyTheme();
  }

  setReciterById(id: string) {
    this.reciterId = id;
    if (!browser) return;

    localStorage.setItem(RECITER_KEY, id);
    localStorage.setItem(RECITER_NAME_KEY, this.reciterName);
  }

  setReciterByName(name: string) {
    const matchingReciter = recitersData.reciters.find(
      (reciter) => reciter.reciter === name
    );
    if (matchingReciter) this.setReciterById(matchingReciter.id);
  }

  private applyTheme() {
    if (!browser) return;

    const root = document.documentElement;
    for (const className of [...root.classList]) {
      if (className.startsWith('theme-')) root.classList.remove(className);
    }
    root.classList.add(`theme-${this.theme}`);
  }
}

export const app = new AppState();
