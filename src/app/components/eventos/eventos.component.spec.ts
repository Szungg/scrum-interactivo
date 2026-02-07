import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosComponent } from './eventos.component';

describe('EventosComponent', () => {
  let component: EventosComponent;
  let fixture: ComponentFixture<EventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch tabs when a button is clicked', () => {
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('.tab-btn');
    expect(component.activeTab).toBe('sprint-planning');

    buttons[2].click();
    fixture.detectChanges();

    expect(component.activeTab).toBe('sprint-review');
    expect(buttons[2].classList.contains('active')).toBeTrue();
  });
});
