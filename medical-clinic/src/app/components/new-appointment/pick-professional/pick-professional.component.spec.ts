import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickProfessionalComponent } from './pick-professional.component';

describe('PickProfessionalComponent', () => {
  let component: PickProfessionalComponent;
  let fixture: ComponentFixture<PickProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
