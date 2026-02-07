import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly themeSubject = new BehaviorSubject<Theme>('light');
  readonly theme$ = this.themeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  init(): void {
    const stored = this.safeGetItem(this.storageKey) as Theme | null;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const initial = stored ?? (prefersDark ? 'dark' : 'light');
    this.applyTheme(initial);
  }

  toggle(): void {
    this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  private applyTheme(theme: Theme): void {
    this.document.body.classList.toggle('theme-dark', theme === 'dark');
    this.safeSetItem(this.storageKey, theme);
    this.themeSubject.next(theme);
  }

  private safeGetItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeSetItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  }
}
