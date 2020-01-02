import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightListPageRoutingModule } from './weight-list-routing.module';

import { WeightListPage } from './weight-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightListPageRoutingModule
  ],
  declarations: [WeightListPage]
})
export class WeightListPageModule {}
