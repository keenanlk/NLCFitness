import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightListPage } from './weight-list.page';

const routes: Routes = [
  {
    path: '',
    component: WeightListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightListPageRoutingModule {}
