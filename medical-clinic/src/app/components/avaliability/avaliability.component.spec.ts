import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliabilityComponent } from './avaliability.component';

describe('AvaliabilityComponent', () => {
  let component: AvaliabilityComponent;
  let fixture: ComponentFixture<AvaliabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
