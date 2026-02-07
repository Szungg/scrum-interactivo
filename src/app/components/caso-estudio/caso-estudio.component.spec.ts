import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoEstudioComponent } from './caso-estudio.component';

describe('CasoEstudioComponent', () => {
  let component: CasoEstudioComponent;
  let fixture: ComponentFixture<CasoEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasoEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasoEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
