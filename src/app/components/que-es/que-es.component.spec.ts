import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueEsComponent } from './que-es.component';

describe('QueEsComponent', () => {
  let component: QueEsComponent;
  let fixture: ComponentFixture<QueEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueEsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
