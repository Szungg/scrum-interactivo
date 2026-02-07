import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private initialized = false;

  constructor(private readonly router: Router) {}

  init(): void {
    if (this.initialized) return;
    this.initialized = true;
    window.addEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (!event.altKey) return;
    const sectionMap: Record<string, string> = {
      '1': '/inicio',
      '2': '/que-es',
      '3': '/roles',
      '4': '/eventos',
      '5': '/presentacion',
      '6': '/caso-estudio'
    };

    const route = sectionMap[event.key];
    if (!route) return;
    event.preventDefault();
    this.router.navigateByUrl(route);
  };
}
