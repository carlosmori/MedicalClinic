import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickSpecialtyComponent } from './pick-specialty.component';

describe('PickSpecialtyComponent', () => {
  let component: PickSpecialtyComponent;
  let fixture: ComponentFixture<PickSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickSpecialtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
