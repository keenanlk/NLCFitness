import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWeightPageRoutingModule } from './add-weight-routing.module';

import { AddWeightPage } from './add-weight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWeightPageRoutingModule
  ],
  declarations: [AddWeightPage]
})
export class AddWeightPageModule {}
