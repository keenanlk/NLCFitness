import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoUploadPage } from './photo-upload.page';

describe('PhotoUploadPage', () => {
  let component: PhotoUploadPage;
  let fixture: ComponentFixture<PhotoUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
