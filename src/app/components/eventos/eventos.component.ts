import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent {
  activeTab = 'sprint-planning';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
