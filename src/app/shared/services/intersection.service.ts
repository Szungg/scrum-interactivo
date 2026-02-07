import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntersectionService {
  private observer?: IntersectionObserver;
  private callbacks = new WeakMap<Element, () => void>();

  observe(target: Element, onVisible: () => void): void {
    this.ensureObserver();
    this.callbacks.set(target, onVisible);
    this.observer?.observe(target);
  }

  unobserve(target: Element): void {
    this.callbacks.delete(target);
    this.observer?.unobserve(target);
  }

  private ensureObserver(): void {
    if (this.observer) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const callback = this.callbacks.get(entry.target);
          if (callback) {
            callback();
          }
          this.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
  }
}
