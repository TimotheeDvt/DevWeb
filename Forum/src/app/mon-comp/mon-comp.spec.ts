import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonComp } from './mon-comp';

describe('MonComp', () => {
  let component: MonComp;
  let fixture: ComponentFixture<MonComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonComp],
    }).compileComponents();

    fixture = TestBed.createComponent(MonComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
