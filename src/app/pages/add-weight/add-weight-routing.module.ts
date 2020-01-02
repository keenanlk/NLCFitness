import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWeightPage } from './add-weight.page';

const routes: Routes = [
  {
    path: '',
    component: AddWeightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWeightPageRoutingModule {}
