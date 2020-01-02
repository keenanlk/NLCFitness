import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWeightPage } from './add-weight.page';

describe('AddWeightPage', () => {
  let component: AddWeightPage;
  let fixture: ComponentFixture<AddWeightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
