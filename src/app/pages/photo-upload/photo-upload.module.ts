import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoUploadPageRoutingModule } from './photo-upload-routing.module';

import { PhotoUploadPage } from './photo-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoUploadPageRoutingModule
  ],
  declarations: [PhotoUploadPage]
})
export class PhotoUploadPageModule {}
