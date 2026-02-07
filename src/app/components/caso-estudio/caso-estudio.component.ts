import { Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-caso-estudio',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './caso-estudio.component.html',
  styleUrl: './caso-estudio.component.scss'
})
export class CasoEstudioComponent {
  activeTab = 'equipo';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
