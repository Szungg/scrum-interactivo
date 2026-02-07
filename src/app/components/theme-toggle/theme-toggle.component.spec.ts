import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../shared/services/theme.service';

class MockThemeService {
  readonly themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  readonly theme$ = this.themeSubject.asObservable();
  toggle = jasmine.createSpy('toggle');
}

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: MockThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent]
    }).overrideProvider(ThemeService, {
      useValue: new MockThemeService()
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as unknown as MockThemeService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call theme service on toggle', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(themeService.toggle).toHaveBeenCalled();
  });
});
