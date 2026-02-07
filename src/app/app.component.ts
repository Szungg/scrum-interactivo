import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KeyboardService } from './shared/services/keyboard.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, MusicPlayerComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly keyboardService: KeyboardService,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.init();
    this.keyboardService.init();
  }
}
