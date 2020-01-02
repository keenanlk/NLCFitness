import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousWorkoutsPage } from './previous-workouts.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousWorkoutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousWorkoutsPageRoutingModule {}
