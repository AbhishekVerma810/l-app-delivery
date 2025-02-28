import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickUpOrderPagePage } from './pick-up-order-page.page';

const routes: Routes = [
  {
    path: '',
    component: PickUpOrderPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickUpOrderPagePageRoutingModule {}
