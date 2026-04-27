import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropdownMenuCoursComponent } from './dropdown-menu-cours.component';

describe('DropdownMenuCoursComponent', () => {
  let component: DropdownMenuCoursComponent;
  let fixture: ComponentFixture<DropdownMenuCoursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMenuCoursComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
