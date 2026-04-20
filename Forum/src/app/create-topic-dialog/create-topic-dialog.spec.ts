import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicDialog } from './create-topic-dialog';

describe('CreateTopicDialog', () => {
  let component: CreateTopicDialog;
  let fixture: ComponentFixture<CreateTopicDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTopicDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTopicDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
