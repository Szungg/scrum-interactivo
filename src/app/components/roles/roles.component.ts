import { Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  roleState: Record<string, boolean> = {
    po: false,
    sm: false,
    dev: false
  };

  toggleRole(role: string): void {
    this.roleState[role] = !this.roleState[role];
  }

  isOpen(role: string): boolean {
    return !!this.roleState[role];
  }
}
