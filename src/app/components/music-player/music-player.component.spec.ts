import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayerComponent } from './music-player.component';

describe('MusicPlayerComponent', () => {
  let component: MusicPlayerComponent;
  let fixture: ComponentFixture<MusicPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle collapsed state', () => {
    const sidebar: HTMLElement = fixture.nativeElement.querySelector('.music-sidebar');
    expect(component.isCollapsed).toBeFalse();

    component.toggleCollapsed();
    fixture.detectChanges();

    expect(component.isCollapsed).toBeTrue();
    expect(sidebar.classList.contains('is-collapsed')).toBeTrue();
  });

  it('should filter tracks by search text', () => {
    component.tracks = [
      { title: 'Track Uno', src: 'one.mp3', image: 'one.jpg' },
      { title: 'Track Dos', src: 'two.mp3', image: 'two.jpg' }
    ];
    component.onSearch('dos');
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.music-sidebar__item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Track Dos');
  });
});
