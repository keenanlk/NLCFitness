import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousWorkoutsPageRoutingModule } from './previous-workouts-routing.module';

import { PreviousWorkoutsPage } from './previous-workouts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousWorkoutsPageRoutingModule
  ],
  declarations: [PreviousWorkoutsPage]
})
export class PreviousWorkoutsPageModule {}
