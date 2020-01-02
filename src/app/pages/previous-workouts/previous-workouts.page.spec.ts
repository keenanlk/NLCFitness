import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousWorkoutsPage } from './previous-workouts.page';

describe('PreviousWorkoutsPage', () => {
  let component: PreviousWorkoutsPage;
  let fixture: ComponentFixture<PreviousWorkoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousWorkoutsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousWorkoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
